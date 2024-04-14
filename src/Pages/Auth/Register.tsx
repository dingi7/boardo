import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { registerUser } from '../../api/requests';
import { useIsAuthenticated } from 'react-auth-kit';
import { Logo } from '../../Components/ui/logo';
import { Button } from '../../Components/ui/button';
import React from 'react';
import { useAuth } from './hooks/useAuth';
import useFormData from '../../util/hooks/useFormData';
import { RegisterUserData } from '../../Interfaces/IUserData';
import { AuthInput } from '../../Components/auth/auth-input';
import { useToast } from '../../Components/Toaster/use-toast';
import { Label } from 'src/Components/ui/label';


export const Register = () => {
    const { toast } = useToast()
    const [loading, setLoading] = React.useState<boolean>(false);
    const authenticateUser = useAuth();
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            toast({
                title: 'You are already logged in',
                variant: "destructive"
            })
        }
    }, [isAuth, navigate, toast]);
    const [loginData, handleInputChange] = useFormData<RegisterUserData>({
        firstName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorFields, setErrorFields] = React.useState({
        email: true,
        password: true,
        firstName: true,
        username: true,
        confirmPassword: true
    });
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const validatePassword = (password: string) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        return re.test(String(password));
    }
    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!loginData?.email || !loginData?.password || !loginData?.firstName || !loginData?.username || !loginData?.confirmPassword) {
                const newErrorFields = { ...errorFields };
                if (!loginData?.email) {
                    newErrorFields.email = false;
                }
                if (!loginData?.password) {
                    newErrorFields.password = false;
                }
                if (!loginData?.firstName) {
                    newErrorFields.firstName = false;
                }
                if (!loginData?.username) {
                    newErrorFields.username = false;
                }
                if (!loginData?.confirmPassword) {
                    newErrorFields.confirmPassword = false;
                }
                setErrorFields(newErrorFields);
                throw new Error('Please fill in all the fields');
            }
            if (!validateEmail(loginData.email)) {
                setErrorFields({ password: true, email: false, firstName: true, username: true, confirmPassword: true });
                throw new Error('Invalid email');
            }
            if (!validatePassword(loginData.password)) {
                setErrorFields({ password: false, email: true, firstName: true, username: true, confirmPassword: true });
                throw new Error('Password must contain at least one digit, one uppercase and lowercase letter, and be between 6 and 20 characters');
            }
            if (!validateConfirmPassword(loginData.password, loginData.confirmPassword)) {
                setErrorFields({ password: true, email: true, firstName: true, username: true, confirmPassword: false });
                throw new Error('Passwords do not match');
            }
            setErrorFields({ password: true, email: true, firstName: true, username: true, confirmPassword: true });
            setLoading(true);
            const response = await registerUser(loginData);
            await authenticateUser(response);
            navigate('/');
        } catch (error: any) {
            toast({
                title: error.message,
                variant: 'destructive',
            });
        }
        setLoading(false);
    };

    return (
        <div className='flex-1 bg-white flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col p-12 pb-16 justify-between space-y-6">
                    <div className="mx-auto">
                        <Logo />
                    </div>
                    <div className="space-y-2 text-center">
                        <p className="text-gray-800 dark:text-gray-400">Enter your information to register an account</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <AuthInput id="email" placeholder="m@example.com" type="email" onChange={handleInputChange} isValid={errorFields.email} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <AuthInput id="firstName" placeholder="Kelly" type='text' onChange={handleInputChange} isValid={errorFields.firstName} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <AuthInput id="username" placeholder="kelly22" type='text' onChange={handleInputChange} isValid={errorFields.username} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <AuthInput id="password" type="password" onChange={handleInputChange} isValid={errorFields.password} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <AuthInput id="confirmPassword" type="password" onChange={handleInputChange} isValid={errorFields.confirmPassword} />
                    </div>
                    <Button className="w-full" type="submit"
                        disabled={loading}
                    >
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" /> : 'Register'}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?
                        <Link className="underline" to="/auth/login">
                            <span className='font-semibold ml-2'>
                                Login
                            </span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
