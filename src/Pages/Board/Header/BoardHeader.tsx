import { IBoardProps } from "../../../Interfaces/IBoard";
import dotsIcon from "../assets/dots.svg";
import starIcon from "../assets/star.svg";

export const BoardHeader = ({
    boardName,
    boardId,
}: IBoardProps): JSX.Element => {
    return (
        <div className="bg-[#052b5f] text-white w-full flex items-center justify-between py-2 px-28">
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

                <button className="hover:bg-[#1F4476] rounded-md transition duration-300 ease-in-out p-2">
                    <img
                        className="w-[56px] h-[56px]"
                        alt="More"
                        src={dotsIcon}
                    />
                </button>
        </div>
    );
};
