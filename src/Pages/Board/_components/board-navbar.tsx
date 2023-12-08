import { MoreHorizontal } from 'lucide-react';
import { BoardTitle } from './board-title';

export const BoardHeader = ({ boardName, setBoardName }: any): JSX.Element => {
    return (
        <div className="bg-black bg-opacity-20 text-white w-full flex items-center justify-between py-2 px-16">
            {/* Board Name and Star Icon */}
            <div className="flex items-center gap-1">
                {/* <div className="font-bold text-[24px]">{boardName}</div> */}
                <BoardTitle boardName={boardName} setBoardName={setBoardName} />
            </div>

            <button className="hover:shadow-lg rounded-md transition duration-300 ease-in-out p-2">
                <MoreHorizontal ></MoreHorizontal>
            </button>
        </div>
    );
};
