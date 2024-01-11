import { BoardTitle } from './BoardTitle';
import { BoardSettingsDropdownMenu } from './BoardSettingsDropdownMenu';

type Props = {
    boardName: string | undefined;
    setBoardName: (name: string) => void;
    boardId: string;
    setBackgroundUrl: (bgUrl: string) => void;
};

export const BoardHeader = ({
    boardName,
    setBoardName,
    boardId,
    setBackgroundUrl,
}: Props): JSX.Element => {
    return (
        <div className='bg-black bg-opacity-20 text-white w-full flex items-center justify-between py-[1%] pt-[10%] sm:pt-[1%] lg:pt-[3%] xl:pt-[2%] 2xl:pt-[1%] px-[5%] '>
            <div className='flex items-center gap-1'>
                <BoardTitle boardName={boardName} setBoardName={setBoardName} />
            </div>
            <BoardSettingsDropdownMenu
                boardId={boardId}
                setBackgroundUrl={setBackgroundUrl}
                
            />
        </div>
    );
};
