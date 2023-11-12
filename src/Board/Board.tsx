import dotsIcon from './dots.svg';
import starIcon from './star.svg';
import filterIcon from './filter.svg';
import shareIcon from './share.svg';

import { List } from '../List/List';

export const Board = (): JSX.Element => {
    return (
        <div className="bg-[#172b4d] flex flex-row justify-center w-full overflow-y-auto">
            <div className="flex flex-row bg-[#172b4d] overflow-hidden w-full h-screen relative">

                {/* Side bar container */}
                <div className="relative w-[270px] h-full top-0  bg-[#141d27]">
                    <div className="inline-flex items-end gap-[10px] absolute top-[18px] left-[14px] ">
                        <div className="relative w-[55px] h-[57px] bg-[#92a0ae]" />
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                            Kamen Kanev’s
                            <br />
                            workspace
                        </div>
                    </div>
                    <div className="flex flex-col w-[268px] items-center gap-[11px] relative top-[43px] ">
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

                {/* HEADER NAVIGATION */}
                <div className="absolute h-[5%] top-0 left-[268px]">
                    <div className="relative w-screen h-[70px] bg-[#052b5f]" />
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


                {/* cards parrent div  */}
                <div className="flex flex-row mt-[4%] p-[1%] gap-[2%] w-full overflow-auto">
                    {<List />}
                    {<List />}
                    {<List />}
                    {<List />}
                    {<List />}
                    {<List />}
                    {<List />}
                    {<List />}
                </div>


            </div>
        </div>
    );
};
