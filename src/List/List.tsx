import dotsVector from './dotsVector.svg';
import plusIcon from './plus.svg';

export const List = (): JSX.Element => {
    return (
        // <div className="inline-flex flex-col items-start gap-[10px] absolute top-[150px] left-[290px]">
        <div className="inline-flex flex-col items-start gap-[10px]">
            <div className="bg-neutral-950 rounded-[15px]">
                <div className="p-5">
                    <div className="inline-flex flex-col items-start gap-[5px] absolute top-[13px] left-[21px]">
                        <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-[257px] relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                                    To do
                                </div>
                                <img
                                    className="relative w-[33.25px] h-[5.25px]"
                                    alt="More"
                                    src={dotsVector}
                                />
                            </div>
                            <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                                <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Front End
                                    </div>
                                </div>
                                <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Back End
                                    </div>
                                </div>
                                <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Design
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex items-center relative flex-[0_0_auto]">
                            <img
                                className="relative w-[28px] h-[28px]"
                                alt="Plus"
                                src={plusIcon}
                            />
                            <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                Add a card
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
