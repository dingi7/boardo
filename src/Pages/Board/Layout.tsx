import { Board } from './Board';
import { BoardProvider } from './BoardContext';

export const BoardLayout = () => {
    return (
        <BoardProvider>
            <Board />
        </BoardProvider>
    );
};

