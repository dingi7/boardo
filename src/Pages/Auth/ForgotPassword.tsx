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
import { Check } from 'lucide-react';
import { requestResetPassword } from 'src/api/requests';

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
            });
        }
    }, [isAuth, navigate]);
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
            const response = await requestResetPassword(loginData.email);
            console.log(response);
            setIsSent(true);
        } catch (err: any) {
            setError(err.message);
            toast({
                title: err.message,
            });
        }
        setLoading(false);
    };

    if (isSent)
        return (
            <div className='h-screen bg-white flex justify-center items-center'>
                <Navbar></Navbar>
                <div className='w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] border-1 bg-slate-100 rounded-md flex flex-col p-12 pb-16 justify-between'>
                    <div className='mx-auto'>
                        <Logo />
                    </div>
                    <div>
                        {/* <div className='w-[60%]'> */}
                        <p className='text-lg font-semibold mt-4'>
                            A reset email has been successfully sent to{' '}
                            <span className='text-blue-500'>
                                {loginData.email}
                            </span>
                            . Follow the instructions there to reset your
                            password.
                        </p>
                        <p className='text-gray-600 mt-2'>
                            If you don't see it in your inbox, please check your
                            spam folder.
                        </p>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        );

    return (
        <div className='h-screen bg-white flex justify-center items-center'>
            <Navbar></Navbar>
            <div className='w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 justify-between'>
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
                        <div className='text-black text-left'>
                            <p className=' text-red-600'>{error}</p>
                            Not registered?{' '}
                            <Link
                                to={'/auth/register'}
                                className='font-semibold'
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                    <Button
                        className='shadow border-1 mt-4 font-semibold border-slate-800 bg-white rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline outline-none hover:bg-zinc-100'
                        type='submit'
                        variant={'ghost'}
                        id='registerButton'
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Send reset email'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
