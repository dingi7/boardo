import { List } from './List/List';
import { IBoardProps } from '../../Interfaces/IBoard';
import { BoardHeader } from './Header/BoardHeader';
import { BoardSidebar } from './Sidebar/BoardSidebar';

export const Board = (): JSX.Element => {
    // fetch the data from the server
    const { boardName, boardId }: IBoardProps = {
        boardName: 'test',
        boardId: 'test',
    };
    return (
        <div className="bg-[#172b4d] flex flex-row justify-center w-full overflow-y-auto">
            <div className="flex flex-row bg-[#172b4d] overflow-hidden w-full h-screen relative">
                {/* Side bar container */}
                <BoardSidebar />
                {/* HEADER NAVIGATION */}
                <BoardHeader boardName={boardName} boardId={boardId} />
                {/* cards parrent div  */}
                <div className="flex flex-row mt-[4%] p-[1%] gap-[2%] w-full overflow-auto">
                    {<List id={'123'} name="Test" />}
                    {<List id={'22'} name="Test" />}
                    {<List id={'13323'} name="Test" />}
                </div>
            </div>
        </div>
    );
};
