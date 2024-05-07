// src/AudioUploader.js
import React, { useState, useEffect } from 'react';
import TranscodeButton from './TranscodeButton';
import "./Audioupload.css"

const AudioUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcodingStatus, setTranscodingStatus] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const testServer = async () => {
      try {
        const response = await fetch("http://localhost:8080/test", { method: 'GET', mode: 'no-cors' });
        if (!response) {
          console.log("Server is not responding",response.status);
          console.log(response);
        } else {
          console.log("Server working");
        }
      } catch (error) {
        console.error("Error checking server:", error);
      }
    };
    testServer();
  }, [])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDownloadUrl(null);
  };

  const handleTranscode = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/convert', {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) {
        throw new Error('Failed to transcode audio');
      }
      console.log("file converted successfully"); 
      const defaultFilename = 'converted_audio.mp3';
      const filename = response.headers.get('Content-Disposition')?.split('filename=')[1]|| defaultFilename;
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      setDownloadUrl({ url, filename });
      setTranscodingStatus('Audio transcoded successfully!');
    } catch (error) {
      setTranscodingStatus(`Error transcoding audio: ${error.message}`);
      console.error(error)
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const { url, filename } = downloadUrl;
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container">
      <label>WAV Transcoder Frontend</label>
      <br />
      <div className="form-group">
        <label htmlFor="file">Select WAV file:</label>
        <input type="file" id="file" accept=".wav" onChange={handleFileChange} />
      </div>
      <br />
      {transcodingStatus && <p>{transcodingStatus}</p>}
      <br />
      <TranscodeButton 
        onConvertClick={handleTranscode} 
        onDownloadClick={handleDownload} 
        disabled={!selectedFile} />
    </div>
  );
};

export default AudioUploader;
