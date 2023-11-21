import { IBoardProps } from "../../../Interfaces/IBoard";
import dotsIcon from "../assets/dots.svg";
import starIcon from "../assets/star.svg";
import filterIcon from "../assets/filter.svg";
import shareIcon from "../assets/share.svg";

export const BoardHeader = ({
    boardName,
    boardId,
}: IBoardProps): JSX.Element => {
    return (
        <header className="bg-[#052b5f] text-white">
            <div className="container mx-auto flex items-center justify-between py-2 px-6">
                {/* Board Name and Star Icon */}
                <div className="flex items-center gap-1">
                    <div className="font-bold text-[24px]">{boardName}</div>
                    <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out p-2">
                        <img
                            className="w-[22px] h-[22px]"
                            alt="Star"
                            src={starIcon}
                        />
                    </button>
                </div>

                {/* Filters and Share Buttons */}
                <div className="flex items-center gap-4">
                    <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out p-2">
                        <div className="flex items-center gap-1">
                            <img
                                className="w-[38px] h-[38px]"
                                alt="Filter"
                                src={filterIcon}
                            />
                            <div className="text-[20px] text-center">
                                Filters
                            </div>
                        </div>
                    </button>

                    <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out p-2">
                        <div className="flex items-center gap-1">
                            <img
                                className="w-[38px] h-[38px]"
                                alt="Share"
                                src={shareIcon}
                            />
                            <div className="text-[20px] text-center">Share</div>
                        </div>
                    </button>

                    <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out p-2">
                        <img
                            className="w-[56px] h-[56px]"
                            alt="More"
                            src={dotsIcon}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};
