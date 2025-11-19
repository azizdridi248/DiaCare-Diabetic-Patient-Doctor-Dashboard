export type UserRole = 'patient' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
}

export interface Patient extends User {
  role: 'patient';
  age: number;
  doctorId?: string;
  recentGlucose?: number;
}

export interface GlucoseReading {
  id: string;
  value: number;
  date: Date;
  patientId: string;
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  time: string;
  patientId: string;
}

export interface DoctorNote {
  id: string;
  patientId: string;
  content: string;
  date: Date;
}
