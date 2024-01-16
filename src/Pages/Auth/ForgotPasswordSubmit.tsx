import { useEffect, useState } from "react";
import { Logo } from "../../Components/ui/logo";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordSubmit = ({
    resetEmail,
}: {
    resetEmail: string;
}) => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);
    useEffect(() => {
        if (countdown <= 0) {
            navigate('/')
            return;
        }
        setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);
    }, [countdown]);

    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <div className="w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] h-[60%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 items-center relative">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="h-full flex flex-col justify-center items-center">
                    <div className="absolute right-[5%] top-[8%] p-[4%] bg-green-500 rounded-full">
                        <Check className="text-white" />
                    </div>

                    <div className="w-[60%]">
                        <p>
                            A reset email has succesfuly been sent to{" "}
                            <span className="font-bold">{resetEmail}</span>
                        </p>
                        <p>
                            If you don't see it in your inbox, please check your
                            spam folder.
                        </p>
                    </div>
                    <div className="w-[60%] text-left">
                        <p>
                            Redirecting in: <span className="font-bold">{countdown}s</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
