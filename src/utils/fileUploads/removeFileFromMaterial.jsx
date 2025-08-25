import React, { useState } from "react"
import getApiUrl from "../../../api/get_Api_Url"
import axios from "axios";

const RemoveFileFromMaterial = async (file, setRemoveMessage, setUpdate) => {

  try {

    const response = await axios.post(getApiUrl('/Remove/File/From/CourseMaterials/'), 
      {
        fileToRemove: file,
      },
      {
        headers: {'Content-Type': 'application/json'},
        timeout: 30000,
      });
    
    if (response.status === 200) {
      setUpdate(true);
      setRemoveMessage(`${file.fileName} файлыг амжилттай устаглаа.`);
    } else {
      setRemoveMessage('Алдаа гарла, дахин оролдоно уу.');
    }

  } catch (error) {
    console.log(error);
  }

}
export default RemoveFileFromMaterial