import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GlucoseReading, Medication, DoctorNote } from '@/types';
import { dummyMedications, generateGlucoseReadings } from '@/utils/dummyData';

interface DataContextType {
  glucoseReadings: GlucoseReading[];
  medications: Medication[];
  doctorNotes: Record<string, string>;
  addGlucoseReading: (value: number, date: Date) => void;
  addMedication: (name: string, dose: string, time: string) => void;
  updateDoctorNote: (patientId: string, note: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>(
    generateGlucoseReadings('current-user')
  );
  const [medications, setMedications] = useState<Medication[]>(dummyMedications);
  const [doctorNotes, setDoctorNotes] = useState<Record<string, string>>({});

  const addGlucoseReading = (value: number, date: Date) => {
    const newReading: GlucoseReading = {
      id: Math.random().toString(36).substr(2, 9),
      value,
      date,
      patientId: 'current-user',
    };
    setGlucoseReadings([...glucoseReadings, newReading]);
  };

  const addMedication = (name: string, dose: string, time: string) => {
    const newMedication: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      dose,
      time,
      patientId: 'current-user',
    };
    setMedications([...medications, newMedication]);
  };

  const updateDoctorNote = (patientId: string, note: string) => {
    setDoctorNotes({ ...doctorNotes, [patientId]: note });
  };

  return (
    <DataContext.Provider value={{ glucoseReadings, medications, doctorNotes, addGlucoseReading, addMedication, updateDoctorNote }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
