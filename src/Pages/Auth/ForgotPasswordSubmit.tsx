import { Logo } from "../../Components/ui/logo";
import { Check } from "lucide-react";

export const ForgotPasswordSubmit = () => {
    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <div className="w-[95%] md:w-[60%] lg:w-[50%] xl:w-[46%] h-[60%] border-1 bg-[#e2e2e2] rounded-md flex flex-col p-12 pb-16 items-center relative">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="h-full flex flex-col justify-center items-center">
                    <div className="absolute right-[5%] top-[20%]">
                        <Check />
                    </div>

                    <div className="w-[60%]">
                        <p>
                            A reset email has succesfuly been sent to ..........
                        </p>
                        <p>
                            If you don't see it in your inbox, please check your
                            spam folder.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
