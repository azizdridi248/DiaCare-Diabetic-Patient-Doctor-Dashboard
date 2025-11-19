import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, Phone, MapPin, Stethoscope } from 'lucide-react';

const MyDoctor = () => {
  // Dummy doctor data
  const doctor = {
    name: 'Dr. Sarah Mitchell',
    specialty: 'Endocrinologist',
    email: 'dr.mitchell@hospital.com',
    phone: '+1 (555) 123-4567',
    location: 'City Medical Center, 123 Health St.',
    experience: '15 years',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/patient/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">My Doctor</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{doctor.name}</CardTitle>
                <CardDescription className="text-base">{doctor.specialty}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{doctor.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">{doctor.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Stethoscope className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Experience</p>
                  <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">
                Dr. Mitchell specializes in diabetes management and endocrine disorders. She has been
                helping patients manage their diabetes for over 15 years with a focus on personalized
                care and modern treatment approaches.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyDoctor;
