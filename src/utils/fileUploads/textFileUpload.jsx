import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';
import CourseMaterialsFiles from '../../models/course_materials_files';

const TextFileUploader = async (textFileToSave, textFileName, courseMaterial, setUploadStatus, setTextFileToSave, fileCreationType, setShowNamePrompt) => {
  const textBlob = new Blob([textFileToSave], { type: 'text/plain' });

  const formData = new FormData();
  formData.append('text_content_file', textBlob);
  formData.append('courseMaterialId', courseMaterial.courseMaterialId); 
  formData.append('fileName', textFileName);
  formData.append('fileCreationType', CourseMaterialsFiles.fileTypeToEng(fileCreationType)); 

  try {
    const response = await axios.post(getApiUrl('/Save/TextFile/For/CourseMaterial/'), 
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },

        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadStatus(`Uploading text: ${percentCompleted}%`);
        },
    });

    if (response.status === 200) {
      console.log('Text file uploaded successfully:', response.data);
      setUploadStatus(`Text file "${textFileName}" uploaded successfully!`);
      setShowNamePrompt(null);
    }
  } catch (error) {
    console.error('Error uploading text file:', error);
    setUploadStatus(`Failed to upload text file: ${error.response?.data?.message || error.message}`);
  }
};

export default TextFileUploader;