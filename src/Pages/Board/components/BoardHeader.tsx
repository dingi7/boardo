import { BoardTitle } from './BoardTitle';
import { BoardSettingsDropdownMenu } from './BoardSettingsDropdownMenu';

type Props = {
    boardName: string | undefined;
    setBoardName: (name: string) => void;
    boardId: string;
};

export const BoardHeader = ({
    boardName,
    setBoardName,
    boardId,
}: Props): JSX.Element => {
    return (
        <div className='bg-black bg-opacity-20 text-white w-full flex items-center justify-between py-2 px-16 mt-3'>
            <div className='flex items-center gap-1'>
                <BoardTitle boardName={boardName} setBoardName={setBoardName} />
            </div>
            <BoardSettingsDropdownMenu boardId={boardId} />
        </div>
    );
};
