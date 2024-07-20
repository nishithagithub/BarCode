// src/components/BarcodeScanner.tsx

import React, { useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScanner: React.FC<{ onScan: (data: string) => void }> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (videoRef.current) {
      // Optional chaining and default parameter to handle the undefined issue
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          onScan(result.getText());
        }
        if (err) {
          console.error(err);
        }
      }).catch(err => {
        console.error('Error initializing the barcode reader:', err);
      });
    }

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return <video ref={videoRef} style={{ width: '100%' }} />;
};

export default BarcodeScanner;
