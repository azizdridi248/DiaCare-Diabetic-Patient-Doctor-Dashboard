import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Mail, Calendar, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dummyPatients, generateGlucoseReadings } from '@/utils/dummyData';

const PatientProfile = () => {
  const { patientId } = useParams();
  const { doctorNotes, updateDoctorNote } = useData();
  const [note, setNote] = useState('');

  const patient = dummyPatients.find((p) => p.id === patientId);
  const patientReadings = generateGlucoseReadings(patientId || '');

  useEffect(() => {
    if (patientId && doctorNotes[patientId]) {
      setNote(doctorNotes[patientId]);
    }
  }, [patientId, doctorNotes]);

  const handleSaveNote = () => {
    if (patientId) {
      updateDoctorNote(patientId, note);
    }
  };

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const chartData = patientReadings.slice(-14).map((reading) => ({
    date: new Date(reading.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: reading.value,
  }));

  const average = Math.round(patientReadings.reduce((sum, r) => sum + r.value, 0) / patientReadings.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/doctor/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">Patient Profile</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-center text-2xl">{patient.name}</CardTitle>
                <CardDescription className="text-center">Patient Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Age</p>
                    <p className="text-sm text-muted-foreground">{patient.age} years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{patient.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Recent Glucose</p>
                    <p className="text-sm text-muted-foreground">{patient.recentGlucose} mg/dL</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Average Glucose</p>
                    <p className="text-sm text-muted-foreground">{average} mg/dL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Glucose Statistics - Last 14 Days</CardTitle>
                <CardDescription>Patient's glucose level trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        className="text-xs"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doctor's Notes</CardTitle>
                <CardDescription>Add notes about the patient's condition and treatment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your notes here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <Button onClick={handleSaveNote}>Save Notes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientProfile;
