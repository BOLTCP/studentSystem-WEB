import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url'; 
import { Document, Page, pdfjs } from 'react-pdf';
import RemoveFileFromMaterial from './removeFileFromMaterial';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import '../../component/teacher/courseManagement/course_materials_management.css';
import CourseMaterialsFiles from '../../models/course_materials_files';

const SMALL_FILE_THRESHOLD_BYTES = 1 * 1024 * 1024; // 1 MB

const IndividualFileDisplay = ({ file, setUpdate }) => {

  const [displayedContent, setDisplayedContent] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [showContent, setShowContent] = useState(false);
  
  //Removing file from Material
  const [removeMessage, setRemoveMessage] = useState(null);
  const [removeError, setRemoveError] = useState(null);

  useEffect(() => {
    let fileUrl = null;
    let isMounted = true; 

    const fetchAndRenderFile = async () => {
      if (!showContent) { 
          setLoadingFile(false);
          return;
      }

      setLoadingFile(true);
      setFileError(null);
      setDisplayedContent(null);

      try {
        const response = await axios.get(getApiUrl(`/Fetch/Files/Of/CourseMaterial/From/SysDir/${file.materialsFilesId}`),
        { 
          responseType: 'blob',
        });   

        const fileBlob = response.data;
        fileUrl = URL.createObjectURL(fileBlob);

        if (!isMounted) return; 
        if (file.mimeType.startsWith('image/')) {
          setDisplayedContent(
            <img src={fileUrl} alt={file.fileName} style={{ maxWidth: '100%', maxHeight: '400px', border: '1px solid #ddd' }} />
          );
        } else if (file.mimeType.startsWith('video/')) {
          setDisplayedContent(
            <video src={fileUrl} controls style={{ maxWidth: '100%', maxHeight: '400px' }} />
          );
        } else if (file.mimeType.startsWith('audio/')) {
          setDisplayedContent(<audio src={fileUrl} controls />);
        } else if (file.mimeType === 'application/pdf') {
          setDisplayedContent(
            <iframe src={fileUrl} style={{ width: '100%', height: '600px', border: 'none' }} title={file.fileName} />
          );
        } else if (file.mimeType.startsWith('text/')) {
          const textContent = await fileBlob.text();
          setDisplayedContent(
            <textarea
              readOnly
              value={textContent}
              rows="10"
              cols="50"
              style={{ width: '100%', height: '150px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px solid #ddd' }}
            />
          );
        } else if (file.mimeType === 'application/pdf') { 
            const pdfUrl = URL.createObjectURL(fileBlob);
            setDisplayedContent(
                <div style={{ maxWidth: '100%', overflow: 'auto', border: '1px solid #ddd' }}>
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => console.log(`Loaded PDF with ${numPages} pages`)}
                        onLoadError={console.error}
                    >
                        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
                    </Document>
                </div>
            );
        } else if (file.mimeType === 'application/msword' || file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          //fileName
          //baseURL
          //publicFileURL
          const publicFileUrl = getApiUrl(`/Fetch/Files/Of/CourseMaterial/From/SysDir/${file.fileName}`);
          const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(publicFileUrl)}&embedded=true`;
          setDisplayedContent(
            <iframe
              src={viewerUrl}
              style={{ width: '100%', height: '500px', border: 'none' }}
              title={file.fileName}
              allowFullScreen
              webkitallowfullscreen="true" 
            >
              Your browser does not support iframes.
            </iframe>
          );
        } else {
          setDisplayedContent(
            <p>
              Cannot display <strong>{file.fileName}</strong> ({file.mimeType}) directly.
              <br />
              <a href={fileUrl} download={file.fileName}>
                Click here to download
              </a> instead.
            </p>
          );
        }

      } catch (err) {
        if (isMounted) { 
          console.error(`Error fetching/displaying file ${file.fileName}:`, err);
          setFileError(`Failed to load content for "${file.fileName}".`);
        }
      } finally {
        if (isMounted) { 
          setLoadingFile(false);
        }
      }
    };

    if (file.fileSize <= SMALL_FILE_THRESHOLD_BYTES && !showContent) {
        setShowContent(true); 
    }

    fetchAndRenderFile();

    return () => {
      isMounted = false;
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [file.savedFileName, file.mimeType, file.fileName, file.fileSize, showContent]);

  const handleManualViewClick = () => {
      if (!showContent) {
          setShowContent(true); 
      }
  };

  const handlefileDownload = (file) => {
    console.log(file);
    const fileDownloadUrl = getApiUrl(`/Fetch/Files/Of/CourseMaterial/From/SysDir/${file.materialsFilesId}`);
    const link = document.createElement('a');
    link.href = fileDownloadUrl;
    link.setAttribute('download', file.fileName); 
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  };

  const showAttribution = (attributionComment, attrLink) => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.textContent = attributionComment + attrLink;
      el.classList.remove("hidden");
      el.classList.add("visible");
    }
  }
  const hideAttribution = () => {
    const el = document.getElementById("hover-attribution");
    if (el) {
      el.classList.remove("visible");
      el.classList.add("hidden");
    }
  }


  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
       {removeMessage &&
          <div className={`material-add-overlay ${removeMessage && 'visible'}`}>
            <div className="add-modal">
              <div>
                <p>
                  {removeMessage.fileName ? `${removeMessage.fileName} файлыг устгах уу?` : removeMessage }
                </p>
              </div>
              <div style={{ justifySelf: 'center', display: 'flex', flexDirection: 'row', gap: '5rem' }}>
                <button style={{ backgroundColor: 'blue', color: 'white' }} 
                        onClick={() => {setRemoveMessage(null), setUpdate(false)}}
                >
                  Буцах
                </button>
                {removeMessage.fileName && 
                  (
                    <button style={{ backgroundColor: 'red', color: 'white' }} 
                      onClick={() => {RemoveFileFromMaterial(file, setRemoveMessage, setUpdate)}}
                    >
                      Устгах
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        }
      <div className='course-file-name-and-options'>
        <h5>
          {file.fileName} ({ (file.fileSize / (1024 * 1024)).toFixed(2) } MB)
        </h5>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginRight: '2.5rem', }}>
          {!loadingFile && !fileError && (
            <button onClick={() => {setRemoveMessage(file)}} 
              style={{ height: '35px', width: '35px', display: 'flex', flexDirection: 'column', 
                    alignItems: 'center', justifyContent: 'center' }}
            >
              <img src='src/assets/close.png' style={{ height: '14px' }}/>
            </button>
          )}
          {!loadingFile && !fileError && (
            <button onClick={() => {handlefileDownload(file)}} 
              style={{ height: '35px', width: '35px', display: 'flex', flexDirection: 'column', 
                    alignItems: 'center', justifyContent: 'center' }}
            >
              <img  onMouseEnter={() => showAttribution(
                    "Download icons created by Uniconlabs - Flaticon",
                    " https://www.flaticon.com/free-icon/download_3031707?term=download&page=1&position=21&origin=search&related_id=3031707"
                    )} 
                    onMouseLeave={() => hideAttribution()}
                    src='src/assets/download.png' style={{ height: '14px' }}/>
            </button>
          )}
        </div>
      </div>
      {file.fileSize > SMALL_FILE_THRESHOLD_BYTES && !showContent && (
        <div>
          <p>This file is large and requires manual viewing.</p>
          <button onClick={handleManualViewClick} disabled={loadingFile}>
            {loadingFile ? 'Loading Large File...' : 'View Large File Content'}
          </button>
        </div>
      )}

      {showContent ? (
        <>
          {loadingFile && <p>Loading content...</p>}
          {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
          {displayedContent}
        </>
      ) : null}

      <div id="hover-attribution" className="hover-attribution hidden">
      </div>

    </div>
  );
};

export default IndividualFileDisplay;