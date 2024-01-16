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

export const ForgotPassword = ({setResetEmail}: {setResetEmail: Function}) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { toast } = useToast()

    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    useEffect(() => {
        if (isAuth()) {
            navigate('/');
            toast({
                title: 'You are already logged in',
            })
        }
    }, [isAuth, navigate]);
    const [loginData, handleInputChange] = useFormData<IForgotPassword>({
        email: '',
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!loginData?.email)
                throw new Error('Please fill in all the fields');
            setLoading(true);
            //const response = await loginUser(loginData);
            //await authenticateUser(response);
            setResetEmail(loginData.email)
            navigate('/auth/forgotPassword/submit');
        } catch (err: any) {
            toast({
                title: err.message,
            })
        }
        setLoading(false);
    };

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
                            Not registered?{' '}
                            <Link to={'/auth/register'} className='font-semibold'>
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
