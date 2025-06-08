import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { FileUploaderRegular, OutputFileEntry } from '@uploadcare/react-uploader';
import * as LR from "@uploadcare/blocks";
import '@uploadcare/react-uploader/core.css';
import { FileEntry } from '@/types';
interface IFileUploaderProps{
    fileEntry: FileEntry,
    onChange: (fileEntry: FileEntry) => void;

}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({fileEntry, onChange}) => {
    
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
  const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null);
  
  useEffect(() => {
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail){
        setUploadedFiles([...e.detail]);
      }
    };

    ctxProviderRef.current?.addEventListener("data-output",handleUploadEvent) => {
      return () => {

      }
    };

  })//use effect


  return(
        <div>
      {/* <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         classNameUploader="uc-dark"
         pubkey="37dce447f5afa3cf8d02"
      /> */}
      <lr-config ctx-name="my-uploader" pubkey="37dce447f5afa3cf8d02" />
      <lr-file-uploader-regular ctx-name="my-uploader" css-src={bloc} />
    </div>
    );
};

export default FileUploader;