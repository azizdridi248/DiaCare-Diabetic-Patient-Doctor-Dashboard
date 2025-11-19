import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Users, Activity, Stethoscope, TrendingUp } from 'lucide-react';
import { dummyPatients } from '@/utils/dummyData';

const DoctorDashboard = () => {
  const { user, signOut } = useAuth();
  const totalPatients = dummyPatients.length;
  const avgGlucose = Math.round(dummyPatients.reduce((sum, p) => sum + (p.recentGlucose || 0), 0) / dummyPatients.length);
  const highRiskCount = dummyPatients.filter(p => (p.recentGlucose || 0) > 140).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-card/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-md">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">DiabetesCare</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Dr. <span className="font-semibold text-foreground">{user?.name}</span>
            </span>
            <Button variant="outline" size="sm" onClick={signOut} className="hover-scale">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-up">
          <h2 className="text-4xl font-bold text-foreground mb-2">Doctor Dashboard</h2>
          <p className="text-lg text-muted-foreground">Monitor and manage your patients</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="relative overflow-hidden border-2 hover-lift animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-bold text-foreground">{totalPatients}</div>
                <span className="text-lg text-muted-foreground">active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Active patients under care</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover-lift animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                <Activity className="w-5 h-5 text-secondary" />
                Average Glucose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-bold text-foreground">{avgGlucose}</div>
                <span className="text-lg text-muted-foreground">mg/dL</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Across all patients</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover-lift sm:col-span-2 lg:col-span-1 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warning/20 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                <TrendingUp className="w-5 h-5 text-warning" />
                High Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-bold text-foreground">{highRiskCount}</div>
                <span className="text-lg text-muted-foreground">patients</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 shadow-lg animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-2xl">Patient List</CardTitle>
            <CardDescription className="text-base">Click on a patient to view their profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="hidden md:block">
              <div className="rounded-xl border-2 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-bold">Name</TableHead>
                      <TableHead className="font-bold">Age</TableHead>
                      <TableHead className="font-bold">Email</TableHead>
                      <TableHead className="font-bold">Recent Glucose</TableHead>
                      <TableHead className="font-bold text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyPatients.map((patient, index) => (
                      <TableRow key={patient.id} className="hover:bg-muted/30 transition-colors" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                        <TableCell className="font-semibold">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell className="text-muted-foreground">{patient.email}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                            patient.recentGlucose && patient.recentGlucose > 140 
                              ? 'bg-warning/10 text-warning' 
                              : 'bg-success/10 text-success'
                          }`}>
                            <Activity className="w-3 h-3" />
                            {patient.recentGlucose} mg/dL
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/doctor/patient/${patient.id}`}>
                            <Button variant="default" size="sm" className="hover-scale">
                              View Profile
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="md:hidden space-y-4">
              {dummyPatients.map((patient, index) => (
                <Card key={patient.id} className="border-2 hover-lift animate-fade-up" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>Age: {patient.age} • {patient.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Recent Glucose</p>
                        <p className={`text-lg font-bold ${
                          patient.recentGlucose && patient.recentGlucose > 140 ? 'text-warning' : 'text-success'
                        }`}>
                          {patient.recentGlucose} mg/dL
                        </p>
                      </div>
                      <Link to={`/doctor/patient/${patient.id}`}>
                        <Button variant="default" size="sm" className="hover-scale">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DoctorDashboard;
