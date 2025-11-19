import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Activity, ArrowLeft, Mail, Lock, User, Calendar } from 'lucide-react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; age?: string }>({});
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as UserRole) || 'patient';

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string; age?: string } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (role === 'patient') {
      if (!age) {
        newErrors.age = 'Age is required for patients';
      } else if (parseInt(age) < 18 || parseInt(age) > 120) {
        newErrors.age = 'Age must be between 18 and 120';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      signUp(name, email, password, parseInt(age) || 0, role);
      
      if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Welcome</span>
        </Link>

        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl">Create Account</CardTitle>
              <CardDescription className="text-base mt-2">
                Sign up as {role === 'doctor' ? 'a Doctor' : 'a Patient'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 focus-ring"
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive font-medium">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 focus-ring"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive font-medium">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 focus-ring"
                  />
                </div>
                {errors.password && <p className="text-sm text-destructive font-medium">{errors.password}</p>}
              </div>

              {role === 'patient' && (
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-semibold">Age</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="age"
                      type="number"
                      placeholder="45"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="pl-10 h-11 focus-ring"
                    />
                  </div>
                  {errors.age && <p className="text-sm text-destructive font-medium">{errors.age}</p>}
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Create Account
              </Button>

              <div className="text-center text-sm pt-2">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to={`/signin?role=${role}`} className="text-primary hover:underline font-semibold">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
