import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../common/BaseUrl';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
}

export default function AuthModal({ open, onOpenChange, defaultTab = 'login' }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate hook
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [formData, setData] = useState({
    email: '',
    password: '',
    name: '',
  });


  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const resLogin = await axios.post(`${BASE_URL}/user/login`, {
        email: formData.email,
        password: formData.password,
      });
      const  data  = resLogin.data;
      if(data?.data?.otp){
        setShowOtpModal(true); // Show OTP modal if OTP is required
        setUserEmail(formData.email); // Set user email for OTP verification
        const message = data?.message || 'OTP sent to your registered email for two-factor authentication. Please verify to continue.';
        toast(message, { duration: 5000 });
        setIsLoading(false);
        return
      }
      localStorage.setItem('token', data?.data?.token); // Save token after successful login
      const message = data?.message || 'Logged in successfully!';
      toast.success(message);
      navigate(data?.data?.redirectUrl); // Use navigate instead of redirect
      setIsLoading(false);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Login failed. Please try again later or use another method.';
      if (error?.response?.data?.data?.otp) {
        setShowOtpModal(true); // Show OTP modal if OTP is required
        setUserEmail(formData.email); // Set user email for OTP verification
        toast.error('OTP sent to your email. Please verify to continue.', { duration: 5000 });
      } 

      setIsLoading(false);
      toast.error(errorMessage);
    }
  }

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/user/sign-up`, {
        email: formData.email,
        password: formData.password,
        fullName: formData.name,
      });
      setShowOtpModal(true);
      setUserEmail(formData.email);
      toast.success(`OTP sent to ${formData.email}`);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      // console.error('Error during submit', error);
      console.log('Error during submit', error);
      toast.error(error?.response?.data?.message || 'An error occurred. Please try again later or use another method.');
    }
  };
  const handleSuccess = async (credentialResponse: any, type: string) => {
    const idToken = credentialResponse.credential
    try {
      const res = await axios.post(`${BASE_URL}/user/google-auth`, {
        id_token: idToken,
      });
      const { data } = res.data;
      localStorage.setItem('token', data.token);
      toast.success(`${type === 'login' ? 'Logged in' : 'Signed up'} successfully!`);
      navigate(data.redirectUrl); // Use navigate instead of redirect
      console.log('Google login successful', data.redirectUrl);
      onOpenChange(false);

    } catch (error) {
      console.error('Google login failed', error);
      toast.error('Google login failed. Please try again later or use another method.');
      onOpenChange(false);
    }
  };

  const handleError = () => {
    console.error('Google login error');
    toast.error('Google login error. Please try again later or use another method.');
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/user/verify`, {
        email: userEmail,
        otp: otp,
      });
      const { data } = res.data;
      localStorage.setItem('token', data.token); // Save token after successful OTP verification
      toast.success('Account verified successfully!');
      setIsLoading(false);
      setShowOtpModal(false); // Close OTP Modal
      onOpenChange(false); // Close main Auth Modal
      navigate(data.redirectUrl); // Redirect user
    } catch (error: any) {
      setIsLoading(false);
      console.log('Error during OTP verification', error);
      toast.error(error?.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };




  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {
          !showOtpModal ? (


            <>

              <DialogHeader>
                <DialogTitle>Welcome to Cloudyfile</DialogTitle>
                <DialogDescription>
                  Secure cloud storage for all your files
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-login">Email</Label>
                      <Input id="email-login" type="email" placeholder="john@example.com" name='email' onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-login">Password</Label>
                      <Input id="password-login" type="password" name='password' onChange={handleChange} />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                    <span className="px-4 text-sm text-gray-500">or continue with</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                  </div>

                  <div className="">
                    <GoogleLogin onSuccess={(credentialResponse) => handleSuccess(credentialResponse, 'login')}
                      onError={handleError} />

                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isLoading}
                    onClick={handleLogin}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name-signup">Full Name</Label>
                      <Input id="name-signup" placeholder="John Doe" onChange={handleChange} name='name' />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input id="email-signup" type="email" placeholder="john@example.com" onChange={handleChange} name='email' />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <Input id="password-signup" type="password" onChange={handleChange} name='password' />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                    <span className="px-4 text-sm text-gray-500">or continue with</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                  </div>

                  <div className="">
                    {/* <Button variant="outline" onClick={() => handleSubmit('signup')}>
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button> */}
                    <GoogleLogin onSuccess={(credentialResponse) => handleSuccess(credentialResponse, 'signup')}
                      onError={handleError} />

                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isLoading}
                    onClick={handleSignup}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </TabsContent>
              </Tabs>
            </>
          ) :

            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
                <DialogDescription>
                  An OTP has been sent to {userEmail}. Please enter it below to verify your account.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
                onClick={handleVerifyOtp}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>


        }

      </DialogContent>
    </Dialog>

    <Toaster richColors />
    </>
  );
}