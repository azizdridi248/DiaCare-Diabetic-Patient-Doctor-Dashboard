import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, Stethoscope, Activity, Shield } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DiabetesCare
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive diabetes management platform for patients and healthcare providers
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover-lift border-2 hover:border-primary/50 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserRound className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">I'm a Patient</CardTitle>
              <CardDescription className="text-base">
                Track your glucose levels, manage medications, and stay connected with your doctor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Monitor glucose levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Medication reminders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Health statistics</span>
                </div>
              </div>
              <Link to="/signin?role=patient" className="block">
                <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                  Continue as Patient
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover-lift border-2 hover:border-secondary/50 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-10 h-10 text-secondary" />
              </div>
              <CardTitle className="text-2xl mb-2">I'm a Doctor</CardTitle>
              <CardDescription className="text-base">
                Monitor your patients, review statistics, and provide better care remotely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span>Patient monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span>Health analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span>Clinical notes</span>
                </div>
              </div>
              <Link to="/signin?role=doctor" className="block">
                <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-secondary hover:bg-secondary/90" size="lg">
                  Continue as Doctor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Secure, private, and easy-to-use diabetes management</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
