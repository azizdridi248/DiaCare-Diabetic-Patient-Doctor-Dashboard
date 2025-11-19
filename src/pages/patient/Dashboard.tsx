import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Pill, Clock, BarChart3, Calendar, UserRound, LogOut, TrendingUp } from 'lucide-react';

const PatientDashboard = () => {
  const { user, signOut } = useAuth();
  const { glucoseReadings, medications } = useData();

  const todayGlucose = glucoseReadings[glucoseReadings.length - 1]?.value || 0;
  const nextMedication = medications[0];
  const averageGlucose = Math.round(glucoseReadings.reduce((sum, r) => sum + r.value, 0) / glucoseReadings.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-card/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">DiabetesCare</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, <span className="font-semibold text-foreground">{user?.name}</span></span>
            <Button variant="outline" size="sm" onClick={signOut} className="hover-scale">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-up">
          <h2 className="text-4xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-lg text-muted-foreground">Monitor your health and manage your diabetes</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="relative overflow-hidden border-2 hover-lift animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                <Activity className="w-5 h-5 text-primary" />
                Today's Glucose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-bold text-foreground">{todayGlucose}</div>
                <span className="text-lg text-muted-foreground">mg/dL</span>
              </div>
              <div className={`flex items-center gap-1 mt-2 text-sm ${todayGlucose > 140 ? 'text-warning' : 'text-success'}`}>
                <TrendingUp className="w-4 h-4" />
                <span>{todayGlucose > 140 ? 'Above target' : 'Normal range'}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover-lift animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                <Pill className="w-5 h-5 text-secondary" />
                Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-bold text-foreground">{medications.length}</div>
                <span className="text-lg text-muted-foreground">active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Active prescriptions</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 hover-lift sm:col-span-2 lg:col-span-1 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full -mr-16 -mt-16" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-muted-foreground">
                <Clock className="w-5 h-5 text-accent" />
                Next Reminder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{nextMedication?.time || 'N/A'}</div>
              <p className="text-sm text-muted-foreground mt-2">{nextMedication?.name || 'No upcoming medications'}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-2 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Average Glucose</p>
                <p className="text-2xl font-bold text-foreground">{averageGlucose} mg/dL</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-success/5 to-success/10 border border-success/20">
                <p className="text-sm text-muted-foreground mb-1">Total Readings</p>
                <p className="text-2xl font-bold text-foreground">{glucoseReadings.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20">
                <p className="text-sm text-muted-foreground mb-1">Days Tracked</p>
                <p className="text-2xl font-bold text-foreground">30</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/patient/statistics" className="group animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Card className="border-2 hover-lift hover:border-primary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Statistics</CardTitle>
                <CardDescription className="text-base">View your glucose trends and detailed analytics</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/patient/medications" className="group animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <Card className="border-2 hover-lift hover:border-secondary/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-7 h-7 text-secondary" />
                </div>
                <CardTitle className="text-xl">Medication Schedule</CardTitle>
                <CardDescription className="text-base">Manage your medications and set reminders</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/patient/doctor" className="group sm:col-span-2 lg:col-span-1 animate-fade-up" style={{ animationDelay: '0.7s' }}>
            <Card className="border-2 hover-lift hover:border-accent/50 transition-all duration-300 h-full">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserRound className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="text-xl">My Doctor</CardTitle>
                <CardDescription className="text-base">View your doctor's contact information</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
