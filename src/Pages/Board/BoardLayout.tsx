import { Board } from './Board';
import { BoardContextProvider } from './contexts/BoardContextProvider';

export const BoardLayout = () => {
    return (
        <BoardContextProvider>
            <Board />
        </BoardContextProvider>
    );
};
