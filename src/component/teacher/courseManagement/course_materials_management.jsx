import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { useDropzone } from 'react-dropzone';
import getApiUrl from '../../../../api/get_Api_Url';
import axios from 'axios';

import CourseMaterial from '../../../models/course_material';
import CourseMaterialsFiles from '../../../models/course_materials_files';
import IndividualFileDisplay from '../../../utils/fileUploads/individualFileDisplay';
import fileUpload from '../../../utils/fileUploads/fileUpload';
import CourseManagement from '../../../models/course_management';
import './course_materials_management.css';
import formatBytes from '../../../utils/fomatBytes';

//FILE UPLOADER Utils
import TextFileUploader from '../../../utils/fileUploads/textFileUpload';

export const CourseMaterialManagement = ({courseManagement, courseMaterial, onClose}) => {
  const [courseMaterialFiles, setCourseMaterialFiles] = useState([]);
  const [fileCreationType, setFileCreationType] = useState(CourseMaterialsFiles.availableFilesData[0].title);

  //TEXT FILE CREATION AND SAVE SYSTEM DIR
  const [textFileToSave, setTextFileToSave] = useState('');
  const [textNullException, setTextNullException] = useState(null);
  const [showNamePropmt, setShowNamePrompt] = useState(false);
  const [textFileName, setTextFileName] = useState(`${courseManagement.courseName} ${courseMaterial.week} -р долоо хоног текст файл`);
  const textareaRef = useRef(null);
  const [update, setUpdate] = useState(false);
  //TEXT FILE CREATION AND SAVE SYSTEM DIR

  //FILE UPLOAD
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesToSend, setSelectedFilesToSend] = useState([]);
  const [showUploadWindow, setShowUploadWindow] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(-1);
  //FILE UPLOAD

  useEffect(() => {
    const fetchFilesOfCourseMaterial = async () => {
      try {
        const response = await axios.post(getApiUrl('/Fetch/Files/Of/CourseMaterial/'), 
          {
            courseMaterial: CourseMaterial.toJson(courseMaterial),
          },
          {
            headers: { 'Content-type': 'application/json' },
            timeout: 300000,
          });
        if (response.status === 200) {
          const courseMaterialFiles = response.data.courseMaterialFiles;
          setCourseMaterialFiles(courseMaterialFiles.map((file) => CourseMaterialsFiles.fromJsonCourseMaterialsFiles(file)));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchFilesOfCourseMaterial();
  }, [update]);

  console.log(update);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setUploadStatus(''); 
    setUploadProgress(0); 

    if (fileRejections.length > 0) {
      const messages = fileRejections.map(({ file, errors }) =>
        `${file.name}: ${errors.map(e => e.message).join(', ')}`
      ).join('\n');
      setUploadStatus(`Some files were rejected:\n${messages}`);
    }

    setSelectedFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        isUploading: false,
        uploadComplete: false,
        error: null,
      }))
    ]);

    setSelectedFilesToSend(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        isUploading: false,
        uploadComplete: false,
        error: null,
      }))
    ]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 100 * 1024 * 1024,
  });

  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20px',
    paddingBottom: '10px',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
    margin: '1rem',
  };

  const focusedStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const style = React.useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [isFocused, isDragAccept, isDragReject]);

  const removeFile = (fileToRemove) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview); 
  };

  const filesList = () => {
    return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', tableLayout: 'fixed' }}> 
        <thead>
          <tr>
            <th style={{ width: '5%' }}>№</th>
            <th style={{ width: '15%' }}>Зураг</th>
            <th style={{ width: '60%' }}>Нэр</th> 
            <th style={{ width: '20%' }}>Хэмжээ</th>
          </tr>
        </thead>
        <tbody>
          {
          selectedFiles.map((file, index) => (
            <tr key={file.name + file.size + file.lastModified}>
              <td>{index + 1}</td>
              <td>
                {file.type.startsWith('image/') ? (
                  <img
                    src={file.preview}
                    style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    alt="preview"
                    onLoad={() => URL.revokeObjectURL(file.preview)} 
                  />
                ) : (
                  <span style={{ fontSize: '50px', lineHeight: '1', display: 'inline-block', textAlign: 'center', color: '#ccc' }}>📄</span>
                )}
              </td>
              <td style={{ 
                wordBreak: 'break-all',   
                overflowWrap: 'break-word' 
              }}>
                {file.name}
              </td>
              <td>{formatBytes(file.size)}</td>
            </tr>
          ))
          }
          </tbody>
        </table>  
      </div>
    );
  };
 
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [textFileToSave]);

  useEffect(() => {
    
  })

  const handleNullException = () => {
    setTextNullException(true); 
    setTimeout(() => {
      setTextNullException(false);
    }, [1000]);
  };

  return (
    <>
      <div className={`course-material-management-overlay ${courseMaterial && 'visible'}`}>
        <div className='front-stage'>

          {showNamePropmt &&
            <div className={`material-add-overlay ${showNamePropmt && 'visible'}`}>
              <div className="add-modal">
                <input placeholder='Файлын нэрийг оруулна уу.' className='text-file-name' value={textFileName} onChange={(e) => {setTextFileName(e.target.value)}} />
                <div>
                </div>
                <div className='button-group'>
                  <button style={{ backgroundColor: 'blue' }} onClick={() => {setShowNamePrompt(null)}}>Буцах</button>
                  <button style={{ color: 'white', backgroundColor: '#14b82e' }} onClick={() => {TextFileUploader(textFileToSave, textFileName, courseMaterial, setUploadStatus, setTextFileToSave, fileCreationType, setShowNamePrompt)}}>Хадгалах</button>
                </div>
              </div>
            </div>
          }

          {showUploadWindow &&
            <div className={`material-add-overlay ${showUploadWindow && 'visible'}`}>
              <div className="add-modal">
                {uploadingIndex}
                {uploadStatus}
                {uploadProgress}
                <div>
                </div>
                <div className='button-group'>
                  <button style={{ backgroundColor: 'blue' }} onClick={() => {setSelectedFiles([]), setShowUploadWindow(null), setUpdate(false)}}>Буцах</button>
                </div>
              </div>
            </div>
          }

          <div className='dnd-field'>

            {/* DND File Creation Target Strip / CourseMaterial Object Strip */}
            
            <div className='course-material-view'>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.25rem', }}>
                Материалын нэр: {courseManagement.courseName} {courseMaterial.title}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Хичээлийн долоо хоног: {parseInt(courseMaterial.week)} 
              </div>
              <div className='course-materials-files'>
                {courseMaterialFiles.length > 0 
                  ?
                  <div>
                    {courseMaterialFiles.map((file) => (
                      <IndividualFileDisplay key={file.materialsFilesId} file={file} setUpdate={setUpdate} />
                    ))}
                  </div> 
                  :
                  <div style={{ 
                          height: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column'
                  }}>
                    Хичээлийн материа одоогоор хоосон байна!
                  </div>
                }
              </div>
            </div>

            <div className='course-file-creation-view'>

              <select style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '1rem' }} 
                      value={fileCreationType} onChange={(e) => {setFileCreationType(e.target.value)}}>
                {CourseMaterialsFiles.availableFilesData.map((fileType) => 
                  <option key={fileType.id}>
                    {fileType.title}
                  </option>
                )}
              </select>
              
              {
              fileCreationType === 'Бусад файлууд' 
              ?
              (
              <div className='course-materials-files'>
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <div>
                    <div>Файлуудыг зөөн байршуулж сонгох зурваст оруулна уу.</div>
                    <div style={{ fontSize: '12px' }}>(e.g., DOCX, PDF, Videos, Images. Файл тус бүрийн дээд хэмжээ 100MB.)</div>
                    <div style={{ marginTop: '10px', fontSize: '18px' }}>Сонгосон файлууд ({selectedFiles.length}):</div>
                    <div style={{ marginBottom: '10px' }}>Нийт хэмжээ: {(Math.round(parseInt(selectedFiles.reduce((totalSize, file) => (totalSize + file.size), 0)) / 1024))} KB</div>
                  </div>
                </div>
                {selectedFiles.length > 0 && (
                  <div style={{ marginTop: '10px', width: '100%' }}>
                    <div>{filesList()}</div>
                    <button
                      onClick={() => {setShowUploadWindow(true), fileUpload(selectedFilesToSend, setSelectedFilesToSend, setUploadingIndex, setUploadStatus, setUploadProgress, courseMaterial, setUpdate)}}
                      disabled={selectedFiles.length === 0 || selectedFiles.some(f => f.isUploading)}
                      style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {selectedFiles.some(f => f.isUploading) ? 'Хадгалж байна...' : `Файлуудыг хадгалах ${selectedFiles.length} Files`}
                    </button>
                  </div>
                )}
              </div>
              )
              :
              fileCreationType === 'Текстэн файл' 
              ?
              (
              <div className='course-materials-files' style={{ justifyContent: 'end' }}>
                <div style={{ margin: '1rem' }}>
                  <textarea
                    ref={textareaRef} 
                    className={`text-input-area ${textNullException && 'textNullException'}`}
                    value={textFileToSave}
                    onChange={(e) => {
                      setTextFileToSave(e.target.value);
                    }}
                    placeholder="Энд текстээ оруулна уу..."
                  />
                  <button onClick={() => {textFileToSave.length > 0 ? setShowNamePrompt(true) : handleNullException()}}>Файлыг хадгалах</button>
                </div>
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <div>
                    <div>Файлуудыг зөөн байршуулж сонгох зурваст оруулна уу.</div>
                    <div style={{ fontSize: '12px' }}>(e.g., DOCX, PDF, Videos, Images. Файл тус бүрийн дээд хэмжээ 100MB.)</div>
                    <div style={{ marginTop: '10px', fontSize: '18px' }}>Сонгосон файлууд ({selectedFiles.length}):</div>
                    <div style={{ marginBottom: '10px' }}>Нийт хэмжээ: {(Math.round(parseInt(selectedFiles.reduce((totalSize, file) => (totalSize + file.size), 0)) / 1024))} KB</div>
                  </div>
                </div>
                {selectedFiles.length > 0 && (
                <div style={{ marginTop: '10px', width: '100%' }}>
                    <div>{filesList()}</div>
                    <button
                      onClick={() => {setShowUploadWindow(true), fileUpload(selectedFilesToSend, setSelectedFilesToSend, setUploadingIndex, setUploadStatus, setUploadProgress, courseMaterial, setUpdate)}}
                      disabled={selectedFiles.length === 0 || selectedFiles.some(f => f.isUploading)}
                      style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {selectedFiles.some(f => f.isUploading) ? 'Хадгалж байна...' : `Файлуудыг хадгалах ${selectedFiles.length} Files`}
                    </button>
                  </div>
                )}
              </div>
              )
              :
              null
              }
            </div>
          </div>
            
          
          <button style={{ width: 'min-content', alignSelf: 'center' }} onClick={() => {onClose()}}>
            <h3>
              Буцах
            </h3>
          </button>
        </div>
      </div>
    </>
  );

};

export default CourseMaterialManagement;
CourseMaterialManagement.Proptypes = {
  courseManagement: PropTypes.instanceOf(CourseManagement).isRequired,
  courseMaterial: PropTypes.instanceOf(CourseMaterial).isRequired,
  visibility: PropTypes.bool
};
