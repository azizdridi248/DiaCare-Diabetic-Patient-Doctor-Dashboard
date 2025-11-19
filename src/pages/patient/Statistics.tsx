import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const Statistics = () => {
  const { glucoseReadings, addGlucoseReading } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const chartData = glucoseReadings.slice(-14).map((reading) => ({
    date: new Date(reading.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: reading.value,
  }));

  const average = Math.round(glucoseReadings.reduce((sum, r) => sum + r.value, 0) / glucoseReadings.length);
  const max = Math.max(...glucoseReadings.map((r) => r.value));
  const min = Math.min(...glucoseReadings.map((r) => r.value));

  const handleAddReading = () => {
    if (newValue && newDate) {
      addGlucoseReading(parseInt(newValue), new Date(newDate));
      setNewValue('');
      setNewDate(new Date().toISOString().split('T')[0]);
      setIsDialogOpen(false);
      toast({
        title: "Reading added",
        description: "Your glucose reading has been recorded successfully.",
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
            <Activity className="w-5 h-5 text-primary" />
            Statistics
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 hover-lift animate-fade-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">{average}</span>
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${(average / 200) * 100}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover-lift animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-warning" />
                Maximum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">{max}</span>
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-warning to-destructive rounded-full" style={{ width: `${(max / 200) * 100}%` }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover-lift animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-success" />
                Minimum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">{min}</span>
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-success to-secondary rounded-full" style={{ width: `${(min / 200) * 100}%` }} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 border-2 shadow-lg animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl">Glucose Levels - Last 14 Days</CardTitle>
                <CardDescription className="text-base mt-1">Track your glucose readings over time</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="shadow-lg hover:shadow-xl transition-all hover-scale">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Reading
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Add Glucose Reading</DialogTitle>
                    <DialogDescription className="text-base">Enter your glucose level and date</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="glucose" className="text-sm font-semibold">Glucose Level (mg/dL)</Label>
                      <Input
                        id="glucose"
                        type="number"
                        placeholder="120"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-semibold">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddReading} size="lg" className="w-full sm:w-auto">
                      Add Reading
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] sm:h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickMargin={10}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickMargin={10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '2px solid hsl(var(--border))',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                  />
                  <Area
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fill="url(#colorGlucose)"
                    dot={{ fill: 'hsl(var(--primary))', r: 5, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                    activeDot={{ r: 7, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Statistics;
