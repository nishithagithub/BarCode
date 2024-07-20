// src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import databaseService from '../services/database';

const Home: React.FC = () => {
  const [barcodes, setBarcodes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBarcodes();
  }, []);

  const fetchBarcodes = async () => {
    try {
      const storedBarcodes = await databaseService.getBarcodes();
      setBarcodes(storedBarcodes || []);
    } catch (error) {
      setError('Failed to fetch barcodes');
    }
  };

  const handleScan = async () => {
    try {
      const data = await BarcodeScanner.scan();
      if (!data.cancelled) {
        await databaseService.saveBarcode(data.text);
        fetchBarcodes();
      }
    } catch (error) {
      console.error('Barcode scanning failed:', error);
      setError('Barcode scanning failed');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barcode Scanner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <div>{error}</div>}
        <IonButton onClick={handleScan}>Scan Barcode</IonButton>
        <IonList>
          {barcodes.map((barcode, index) => (
            <IonItem key={index}>
              <IonLabel>{barcode.code}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
