import { Patient, GlucoseReading, Medication } from '@/types';

export const dummyPatients: Patient[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'patient', age: 45, doctorId: 'doc1', recentGlucose: 120 },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'patient', age: 52, doctorId: 'doc1', recentGlucose: 135 },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'patient', age: 38, doctorId: 'doc1', recentGlucose: 110 },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'patient', age: 61, doctorId: 'doc1', recentGlucose: 145 },
];

export const generateGlucoseReadings = (patientId: string): GlucoseReading[] => {
  const readings: GlucoseReading[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    readings.push({
      id: `reading-${patientId}-${i}`,
      value: Math.floor(Math.random() * 60) + 90, // 90-150 range
      date: date,
      patientId: patientId,
    });
  }
  
  return readings;
};

export const dummyMedications: Medication[] = [
  { id: '1', name: 'Metformin', dose: '500mg', time: '08:00 AM', patientId: '1' },
  { id: '2', name: 'Insulin', dose: '10 units', time: '07:00 AM', patientId: '1' },
  { id: '3', name: 'Glipizide', dose: '5mg', time: '12:00 PM', patientId: '1' },
  { id: '4', name: 'Aspirin', dose: '75mg', time: '08:00 PM', patientId: '1' },
];
