import { Toaster } from '../../Components/toaster';
import { Board } from './Board';
import { BoardProvider } from './context/BoardContext';

export const BoardLayout = () => {
    return (
        <BoardProvider>
            <Board />
            <Toaster></Toaster>
        </BoardProvider>
    );
};

