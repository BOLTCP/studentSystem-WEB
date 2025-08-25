import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import getApiUrl from '../../../api/get_Api_Url';

const fileUpload = async (selectedFilesToSend, setSelectedFilesToSend, setUploadingIndex, setUploadStatus, setUploadProgress, courseMaterial, setUpdate) => {
  console.log('her');
  if (selectedFilesToSend.length === 0) {
    setUploadStatus('No files selected for upload.');
    return;
  }
  
  setUploadStatus('Starting batch upload...');
  setUploadProgress(0);

  for (let i = 0; i < selectedFilesToSend.length; i++) {
    const file = selectedFilesToSend[i];
    if (file.uploadComplete || file.isUploading) continue; 

    setSelectedFilesToSend(prevFiles => prevFiles.map((f, idx) =>
      idx === i ? { ...f, isUploading: true, error: null } : f
    ));
    setUploadingIndex(i);

    const formData = new FormData();
    formData.append('courseFile', file); 
    formData.append('courseMaterialId', courseMaterial.courseMaterialId);
    formData.append('fileName', file.name); 

    try { 
      const response = await axios.post(getApiUrl('/Save/FileUpload/For/CourseMaterial/'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted); 
        },
      });

      setSelectedFilesToSend(prevFiles => prevFiles.map((f, idx) =>
        idx === i ? { ...f, isUploading: false, uploadComplete: true } : f
      ));

    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      setSelectedFilesToSend(prevFiles => prevFiles.map((f, idx) =>
        idx === i ? { ...f, isUploading: false, error: error.response?.data?.message || error.message } : f
      ));
      setUploadStatus(`Upload failed for ${file.name}: ${error.response?.data?.message || error.message}`);
      break; 
    }
  }
  setUpdate(true);
  setUploadingIndex(-1); 
  const allCompleted = selectedFilesToSend.every(f => f.uploadComplete);
  if (allCompleted) {
    setUploadStatus('All selected files uploaded successfully!');
  } else {
    setUploadStatus('Batch upload finished. Check individual file statuses for errors.');
  }
};
 
export default fileUpload;