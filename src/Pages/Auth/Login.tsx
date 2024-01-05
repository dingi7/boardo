import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Logo } from '../../Components/ui/logo';
import { Button } from '../../Components/ui/button';
import { useIsAuthenticated } from 'react-auth-kit';
import { loginUser } from '../../api/requests';
import { LoginUserData } from '../../Interfaces/IUserData';
import { useAuth } from './hooks/useAuth';
import useFormData from './hooks/useFormData';
import { errorNotification } from '../../util/notificationHandler';
import { Navbar } from '../LandingPage/components/navbar';
import { AuthInput } from '../../Components/auth/auth-input';

export const Login = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const authenticateUser = useAuth();

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            errorNotification('You are already logged in');
        }
    }, [isAuth, navigate]);
    const [loginData, handleInputChange] = useFormData<LoginUserData>({
        email: '',
        password: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!loginData?.email || !loginData?.password)
                throw new Error('Please fill in all the fields');
            setLoading(true);
            const response = await loginUser(loginData!);
            await authenticateUser(response);
            navigate('/');
        } catch (err: any) {
            errorNotification(err.message);
        }
        setLoading(false);
    };

    return (
        <div className='h-screen bg-white flex justify-center items-center'>
            <Navbar></Navbar>
            <div className=' w-[600px] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between'>
                <div className='mx-auto'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <AuthInput
                            type='email'
                            text='Email'
                            id='email'
                            onChange={handleInputChange}
                        />
                        <AuthInput
                            type='password'
                            text='Password'
                            id='password'
                            onChange={handleInputChange}
                        />
                        <div className='text-black text-left'>
                            Not registered?{' '}
                            <Link to={'/register'} className='font-semibold'>
                                Register
                            </Link>
                        </div>
                    </div>
                    <Button
                        className='shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100'
                        type='submit'
                        id='registerButton'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
