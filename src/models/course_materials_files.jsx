import React from "react";

class CourseMaterialsFiles {
  constructor ({
    materialsFilesId,
    filesType,
    availableFrom,
    availableUntil,
    attempts,
    status,
    openDate,
    closeDate,
    createdAt,
    courseMaterialId,
    fileOrder,
    sharedFile,
    mimeType,
    fileName,
    fileSize,
    filePath,
  }) {
    this.materialsFilesId = materialsFilesId;
    this.filesType = filesType;
    this.availableFrom = availableFrom;
    this.availableUntil = availableUntil;
    this.attempts = attempts;
    this.status = status;
    this.openDate = openDate;
    this.closeDate = closeDate;
    this.createdAt = createdAt;
    this.courseMaterialId = courseMaterialId;
    this.fileOrder = fileOrder;
    this.sharedFile = sharedFile;
    this.mimeType = mimeType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.filePath = filePath;
  }

  static fromJsonCourseMaterialsFiles(json) {
    return new CourseMaterialsFiles({
      materialsFilesId: json.materials_files_id,
      filesType: json.files_type,
      availableFrom: json.available_from,
      availableUntil: json.available_until,
      attempts: json.attempts,
      status: json.status,
      openDate: json.open_date,
      closeDate: json.close_date,
      createdAt: json.created_at,
      courseMaterialId: json.courseMaterialId,
      fileOrder: json.file_order,
      sharedFile: json.material_order,
      mimeType: json.mime_type === 'textPlain' ? 'text/plain' :
                json.mime_type === 'imageJpeg' ? 'image/jpeg' :
                json.mime_type === 'videoMp4' ? 'video/mp4' :
                json.mime_type === 'applicationPdf' ? 'application/pdf' :
                'application/msword',
      fileName: json.file_name,
      fileSize: json.file_size,
      filePath: json.file_path,
    });
  }

  static toJson(CourseMaterialsFiles) {
    return {
      materials_files_id: CourseMaterialsFiles.materialsFilesId,
      files_type: CourseMaterialsFiles.filesType,
      available_from: CourseMaterialsFiles.availableFrom,
      available_until: CourseMaterialsFiles.availableUntil,
      attempts: CourseMaterialsFiles.attempts,
      status: CourseMaterialsFiles.status,
      open_date: CourseMaterialsFiles.openDate,
      close_date: CourseMaterialsFiles.closeDate,
      created_at: CourseMaterialsFiles.createdAt,
      courseMaterialId: CourseMaterialsFiles.courseMaterialId,
      file_order: CourseMaterialsFiles.fileOrder,
      material_order: CourseMaterialsFiles.sharedFile,
      mime_type: CourseMaterialsFiles.mimeType,
      file_name: CourseMaterialsFiles.fileName,
      file_size: CourseMaterialsFiles.fileSize,
      file_path: CourseMaterialsFiles.filePath,
    }
  }

  static availableFilesData = [
    { id: 'mat-0', title: 'Текстэн файл', type: 'TextFile' },
    { id: 'mat-1', title: 'Даалгаврын файл', type: 'SubmissionFiles' },
    { id: 'mat-2', title: 'Видео бичлэг', type: 'Vidoes' },
    { id: 'mat-3', title: 'Хэлэлцүүлэг', type: 'Discussions' },
    { id: 'mat-4', title: 'Онооны журам', type: 'Rubricks' },
    { id: 'mat-5', title: 'Сэтгэгдэл', type: 'Comments' },
    { id: 'mat-6', title: 'Бусад файлууд', type: 'OtherFiles' },
  ];

  static fileTypeToEng(string) {
    return string === 'Текстэн файл' ? 'TextFile' 
         : string === 'Даалгаврын файл' ? 'SubmissionFiles' 
         : string === 'Видео бичлэг' ? 'Vidoes' 
         : string === 'Хэлэлцүүлэг' ? 'Discussions' 
         : string === 'Онооны журам' ? 'Rubricks' 
         : string === 'Сэтгэгдэл' ? 'Comments'
         : 'OtherFiles';
  }

}
export default CourseMaterialsFiles;