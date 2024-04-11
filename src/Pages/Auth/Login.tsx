import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Logo } from '../../Components/ui/logo';
import { Button } from '../../Components/ui/button';
import { useIsAuthenticated } from 'react-auth-kit';
import { loginUser } from '../../api/requests';
import { LoginUserData } from '../../Interfaces/IUserData';
import { useAuth } from './hooks/useAuth';
import useFormData from '../../util/hooks/useFormData';
import { AuthInput } from '../../Components/auth/auth-input';
import { useToast } from '../../Components/Toaster/use-toast';
import { Label } from 'src/Components/ui/label';
import { isValid, set } from 'date-fns';

export const Login = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const authenticateUser = useAuth();
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
    const [loginData, handleInputChange] = useFormData<LoginUserData>({
        email: '',
        password: '',
    });
    const [errorFields, setErrorFields] = React.useState({
        email: true,
        password: true,
    });
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!loginData?.email || !loginData?.password) {
                const newErrorFields = { ...errorFields };
                if (!loginData?.email) {
                    newErrorFields.email = false;
                }
                if (!loginData?.password) {
                    newErrorFields.password = false;
                }
                setErrorFields(newErrorFields);
                throw new Error('Please fill in all the fields');
            }
            if (!validateEmail(loginData.email)) {
                setErrorFields({ password: true, email: false });
                throw new Error('Invalid email');
            }
            setErrorFields({ password: true, email: true });
            setLoading(true);
            const response = await loginUser(loginData!);
            await authenticateUser(response);
            navigate('/');
        } catch (err: any) {
            toast({
                title: err.message,
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
                        <p className="text-gray-800 dark:text-gray-400">Enter your information to login an account</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <AuthInput id="email" placeholder="m@example.com" type="email" onChange={handleInputChange} isValid={errorFields.email} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <AuthInput id="password" type="password" onChange={handleInputChange} isValid={errorFields.password} />
                    </div>
                    <Button className="w-full" type="submit"
                        disabled={loading}
                    >
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent" /> : 'Register'}
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?
                        <Link className="underline" to="/auth/register">
                            <span className='font-semibold ml-2'>
                                Register
                            </span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
