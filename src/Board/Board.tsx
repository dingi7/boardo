import dotsIcon from './dots.svg';
import starIcon from './star.svg';
import filterIcon from './filter.svg';
import shareIcon from './share.svg';
import plusIcon from './plus.svg';
import dotsVector from './dotsVector.svg';

export const Board = (): JSX.Element => {
    return (
        <div className="bg-[#172b4d] flex flex-row justify-center w-full overflow-y-auto">
            <div className="bg-[#172b4d] overflow-hidden w-full h-[1080px] relative">
                <div className="absolute w-[270px] h-full top-0 left-[-2px] bg-[#141d27]">
                    <div className="inline-flex items-end gap-[10px] absolute top-[18px] left-[14px]">
                        <div className="relative w-[55px] h-[57px] bg-[#92a0ae]" />
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                            Kamen Kanev’s
                            <br />
                            workspace
                        </div>
                    </div>
                    <div className="flex flex-col w-[268px] items-center gap-[11px] absolute top-[43px] left-[2px]">
                        <div className="relative border-t border-[#92a0ae] mt-11 w-full" />
                        <div className="inline-flex items-start gap-[85px] relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                                Your boards
                            </div>
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-end gap-[11px] absolute top-[147px] left-[16px]">
                        <div className="flex flex-wrap w-[132px] items-end gap-[11px_12px] relative">
                            <div className="relative w-[31px] h-[32.13px] bg-[#92a0ae]" />
                            <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                                Board 1
                            </div>
                            <div className="relative w-[31px] h-[32.13px] bg-[#92a0ae]" />
                            <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                                Board 2
                            </div>
                            <div className="relative w-[31px] h-[32.13px] bg-[#92a0ae]" />
                            <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                                Board 3
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-flex flex-col items-start gap-[10px] absolute top-0 left-[268px]">
                    <div className="relative w-[1652px] h-[70px] bg-[#052b5f]" />
                    <div className="inline-flex items-center gap-[1004px] absolute top-[7px] left-[22px]">
                        <div className="inline-flex items-start gap-[74px] relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-[12px] relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[24px] tracking-[0] leading-[normal]">
                                    Board 1
                                </div>
                                <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out">
                                    <img
                                        className="relative w-[24px] h-[24px]"
                                        alt="Star"
                                        src={starIcon}
                                    />
                                </button>
                            </div>
                            {/* <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out"> */}
                            <button className="rounded-md transition duration-300 ease-in-out">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[24px] tracking-[0] leading-[normal]">
                                    Visibility
                                </div>
                            </button>
                        </div>
                        <div className="inline-flex items-center relative flex-[0_0_auto]">
                            <div className="inline-flex items-start gap-[22px] relative flex-[0_0_auto] divide-x divide-slate-700 ">
                                <div className="inline-flex items-start gap-[22px] relative flex-[0_0_auto]">
                                    <button className="hover:bg-[#1F4476] rounded-md w-full transition duration-300 ease-in-out h-[56px]">
                                        <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                                            <img
                                                className="relative w-[38px] h-[38px]"
                                                alt="Filter"
                                                src={filterIcon}
                                            />
                                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-normal text-white text-[20px] text-center tracking-[0] leading-[32.8px] whitespace-nowrap">
                                                Filters &nbsp;
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="inline-flex items-start gap-[22px] relative flex-[0_0_auto]">
                                    <button className="hover:bg-[#1F4476] rounded-md w-full transition duration-300 ease-in-out h-[56px]">
                                        <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                                            <img
                                                className="relative w-[38px] h-[38px]"
                                                alt="Share"
                                                src={shareIcon}
                                            />
                                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-normal text-white text-[20px] text-center tracking-[0] leading-[32.8px] whitespace-nowrap">
                                                Share &nbsp;
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <button className="hover:bg-[#1F4476] rounded-md w-full transition duration-300 ease-in-out">
                                <img
                                    className="relative w-[56px] h-[56px]"
                                    alt="More"
                                    src={dotsIcon}
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute w-[400px] h-[445px] top-[147px] left-[712px]">
                    <div className="inline-flex items-start gap-[10px] absolute top-0 left-0">
                        <div className="inline-flex items-start gap-[10px] relative flex-[0_0_auto]">
                            <div className="relative w-[400px] h-[445px] bg-neutral-950 rounded-[15px]" />
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[146px] left-[22px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[190px] left-[21px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[234px] left-[22px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[278px] left-[22px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[322px] left-[21px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[366px] left-[22px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[58px] left-[21px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] absolute top-[102px] left-[22px] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[354px] items-center gap-[184px] absolute top-[13px] left-[22px]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                                In progress
                            </div>
                            <img
                                className="relative w-[33.25px] h-[5.25px]"
                                alt="More"
                                src={dotsVector}
                            />
                        </div>
                    </div>
                    <div className="inline-flex items-center absolute top-[410px] left-[20px]">
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
                <div className="inline-flex flex-col items-start gap-[10px] absolute top-[147px] left-[1134px]">
                    <div className="relative w-[400px] h-[236px] bg-neutral-950 rounded-[15px]" />
                    <div className="inline-flex flex-col items-start gap-[16px] absolute top-[13px] left-[22px]">
                        <div className="flex w-[356px] items-center gap-[257px] relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                                Done
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
                                    Front End
                                </div>
                            </div>
                            <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Front End
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
                <div className="inline-flex flex-col items-start gap-[10px] absolute top-[150px] left-[290px]">
                    <div className="relative w-[400px] h-[315px] bg-neutral-950 rounded-[15px]" />
                    <div className="inline-flex flex-col items-start gap-[5px] absolute top-[13px] left-[21px]">
                        <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-[257px] relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                                    To do
                                </div>
                                <button>
                                    <img
                                        className="relative w-[33.25px] h-[5.25px]"
                                        alt="More"
                                        src={dotsVector}
                                    />
                                </button>
                            </div>
                            <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                                <div className="h-[40px] flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Front End
                                    </div>
                                </div>
                                <div className="h-[40px] flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Back End
                                    </div>
                                </div>
                                <div className="h-[40px] flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Design
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button>
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
                        </button>
                    </div>
                </div>
                <div className="inline-flex flex-col items-start gap-[10px] absolute top-[147px] left-[1559px]">
                    <div className="relative w-[338px] h-[42px] bg-[#2d4c77] rounded-[15px]" />
                    <div className="inline-flex items-center absolute top-[8px] left-[15px]">
                        <img
                            className="relative w-[28px] h-[28px]"
                            alt="Plus"
                            src={plusIcon}
                        />
                        <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                            Add another list
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
