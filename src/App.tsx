import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PatientDashboard from "./pages/patient/Dashboard";
import Statistics from "./pages/patient/Statistics";
import Medications from "./pages/patient/Medications";
import MyDoctor from "./pages/patient/MyDoctor";
import DoctorDashboard from "./pages/doctor/Dashboard";
import PatientProfile from "./pages/doctor/PatientProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              <Route path="/patient/dashboard" element={
                <ProtectedRoute allowedRole="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/patient/statistics" element={
                <ProtectedRoute allowedRole="patient">
                  <Statistics />
                </ProtectedRoute>
              } />
              <Route path="/patient/medications" element={
                <ProtectedRoute allowedRole="patient">
                  <Medications />
                </ProtectedRoute>
              } />
              <Route path="/patient/doctor" element={
                <ProtectedRoute allowedRole="patient">
                  <MyDoctor />
                </ProtectedRoute>
              } />
              
              <Route path="/doctor/dashboard" element={
                <ProtectedRoute allowedRole="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/doctor/patient/:patientId" element={
                <ProtectedRoute allowedRole="doctor">
                  <PatientProfile />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
