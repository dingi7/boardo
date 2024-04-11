import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Logo } from '../../Components/ui/logo';
import { Button } from '../../Components/ui/button';
import { useIsAuthenticated } from 'react-auth-kit';
import useFormData from '../../util/hooks/useFormData';
import { Navbar } from '../../Components/navbar';
import { AuthInput } from '../../Components/auth/auth-input';
import { useToast } from '../../Components/Toaster/use-toast';
import { IForgotPassword } from './../../Interfaces/IUserData';
import { requestResetPassword } from 'src/api/requests';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/Components/ui/card';
import { Label } from 'src/Components/ui/label';

export const ForgotPassword = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isSent, setIsSent] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const { toast } = useToast();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            toast({
                title: 'You are already logged in',
                variant: 'destructive',
            });
        }
    }, [isAuth, navigate, toast]);
    const [loginData, handleInputChange] = useFormData<IForgotPassword>({
        email: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError('');
            if (!loginData?.email)
                throw new Error('Please fill in all the fields');
            setLoading(true);
            await requestResetPassword(loginData.email);
            setIsSent(true);
        } catch (err: any) {
            setError(err.message);
            toast({
                title: err.message,
                variant: "destructive"
            });
        }
        setLoading(false);
    };

    if (isSent)
        return (
            <div className='h-screen bg-white flex justify-center items-center'>
                <Card className="max-w-md w-[50%]">
                    <CardContent className="px-4 py-12 text-center space-y-2 flex flex-col justify-between">
                        <div className='mx-auto'>
                            <Logo />
                        </div>
                        <h1 className="text-3xl font-bold">Password Reset</h1>
                        <p className="text-gray-500">An email has been sent to </p>
                        <span className='font-semibold text-blue-700 cursor-pointer' onClick={()=>{
                            window.open(`http://${loginData.email.match(/(?<=@)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0]}`, '_blank');
                        } }>{loginData.email}</span>
                        <p className="text-gray-500">
                            Please follow the instructions in the email we've sent you
                            to choose a new password.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );

    return (
        <div className='h-screen bg-white flex justify-center items-center'>
            <Card className="mx-auto max-w-sm">
                <form onSubmit={handleSubmit}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
                        <CardDescription>Enter your email below to recover your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <AuthInput id="email" placeholder="m@example.com" isValid={true} type="email" onChange={handleInputChange} />
                            </div>
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>
                        </div>
                        <div className="mt-4 text-sm text-center">
                            <Link className="underline" to="/auth/login">
                                Back to login
                            </Link>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};
