import React from 'react';
import "./Transcodebtn.css"

const TranscodeButton = ({ onConvertClick, onDownloadClick, disabled }) => {
  return (
    <div className="bbt">
        <button id="convert-btn" onClick={onConvertClick} disabled={disabled}>Convert</button>
        <br/><br/>
        <button id="download" onClick={onDownloadClick}>Download</button>
    </div>
  );
};

export default TranscodeButton;
