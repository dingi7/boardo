import { Typewriter } from '../../util/typewriter';
import { Header } from '../../Header/Header';

export const LandingPage = (): JSX.Element => {
    return (
        <div className="flex flex-col h-[1117px] items-start gap-[74px] pt-[37px] pb-0 px-[117px] relative bg-gradient-to-b from-black to-blue-400">
            <Header></Header>
            <div className="inline-flex flex-wrap items-center justify-center gap-[100px_100px] px-[10px] py-[16px] absolute top-[414px] left-[244px]">
                <div className="flex flex-wrap w-[603px] items-end gap-[27px_0px] relative">
                    <div className="min-w-[400px] min-h-[200px] relative w-fit mt-[-1.00px] font-extrabold text-white text-[122px] tracking-[0] leading-[normal]">
                        <Typewriter text="Welcome." delay={150} />
                    </div>
                    <div className="flex items-end gap-[45px] relative flex-1 grow">
                        <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-[#147d9e] rounded-[30px] overflow-hidden">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                                <button>CREATE YOUR FIRST BOARD</button>
                            </div>
                        </div>
                        <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] rounded-[30px] overflow-hidden border border-solid border-[#e0e0e0]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal]">
                                <button>see more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
