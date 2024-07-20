// src/App.tsx

import React, { useEffect } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const App: React.FC = () => {
  const startScan = async () => {
    try {
      // Check if the permission to use the camera was granted
      await BarcodeScanner.checkPermission({ force: true });

      // Make the background of the webview transparent
      // and the webview itself transparent
      BarcodeScanner.hideBackground();

      // Start the scan and wait for a result
      const result = await BarcodeScanner.startScan();

      // If the user cancels the scan, the result will be empty
      if (result.hasContent) {
        console.log('Barcode data:', result.content);
      } else {
        console.log('No barcode found');
      }

      // Stop the scan
      BarcodeScanner.stopScan();
    } catch (error) {
      console.error('Error during barcode scan:', error);
    }
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <button onClick={startScan}>Start Scan</button>
    </div>
  );
};

export default App;
