import { IBoardProps } from '../../../Interfaces/IBoard';
import dotsIcon from '../assets/dots.svg';
import starIcon from '../assets/star.svg';
import filterIcon from '../assets/filter.svg';
import shareIcon from '../assets/share.svg';

export const BoardHeader = ({
    boardName,
    boardId,
}: IBoardProps): JSX.Element => {
    return (
        <div className="absolute h-[5%] top-0 left-[268px]">
            <div className="relative w-screen h-[70px] bg-[#052b5f]" />
            <div className="inline-flex items-center gap-[1004px] absolute top-[7px] left-[22px]">
                <div className="inline-flex items-start gap-[74px] relative flex-[0_0_auto]">
                    <div className="inline-flex items-center gap-[12px] relative flex-[0_0_auto]">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[24px] tracking-[0] leading-[normal]">
                            {boardName}
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
    );
};
