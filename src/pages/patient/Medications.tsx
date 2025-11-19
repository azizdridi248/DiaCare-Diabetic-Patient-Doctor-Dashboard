import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Pill, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Medications = () => {
  const { medications, addMedication } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();

  const handleAddMedication = () => {
    if (name && dose && time) {
      addMedication(name, dose, time);
      setName('');
      setDose('');
      setTime('');
      setIsDialogOpen(false);
      toast({
        title: "Medication added",
        description: `${name} has been added to your schedule.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="bg-card/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/patient/dashboard">
            <Button variant="ghost" size="sm" className="hover-scale">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-secondary" />
            Medications
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4 animate-fade-up">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Medication Schedule</h2>
            <p className="text-lg text-muted-foreground mt-1">Manage your daily medications</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover-scale">
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Add New Medication</DialogTitle>
                <DialogDescription className="text-base">Enter medication details</DialogDescription>
              </DialogHeader>
              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Medication Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Metformin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dose" className="text-sm font-semibold">Dosage</Label>
                  <Input
                    id="dose"
                    placeholder="e.g., 500mg"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-semibold">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddMedication} size="lg" className="w-full sm:w-auto">
                  Add Medication
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medications.map((medication, index) => (
            <Card key={medication.id} className="border-2 hover-lift group animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Pill className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl">{medication.name}</CardTitle>
                <CardDescription className="text-base font-semibold">{medication.dose}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Scheduled time</p>
                    <p className="text-lg font-bold text-foreground">{medication.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {medications.length === 0 && (
          <Card className="text-center py-16 border-2 border-dashed animate-fade-up">
            <CardContent>
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Pill className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No medications yet</h3>
              <p className="text-muted-foreground mb-6 text-lg">Add your first medication to get started</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Medication
                  </Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Medications;
