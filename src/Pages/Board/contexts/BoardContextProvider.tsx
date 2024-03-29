import {
  createContext,
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dataBaseBoard, dataBaseList } from '../../../Interfaces/IDatabase';
import { getBoardById } from '../../../api/requests';
import { toast } from 'src/Components/Toaster/use-toast';
import { useInterval } from 'usehooks-ts';
import Pusher from 'pusher-js';




export interface BoardContextType {
    boardInfo: dataBaseBoard | null;
    setBoardInfo: Dispatch<SetStateAction<dataBaseBoard | null>>;
    lists: dataBaseList[] | null;
    setLists: Dispatch<SetStateAction<dataBaseList[] | null>>;
    backgroundUrl: string;
    setBackgroundUrl: Dispatch<SetStateAction<string>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    boardId: string | undefined;
    channel: any
}

export const BoardContext = createContext<BoardContextType | undefined>(
    undefined
);

export const BoardContextProvider = ({ children }: { children: any }) => {
    const { boardId } = useParams<{ boardId: string }>();
    const [boardInfo, setBoardInfo] = useState<dataBaseBoard | null>(null);
    const [lists, setLists] = useState<dataBaseList[] | null>(null);
    const [backgroundUrl, setBackgroundUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const pusher = new Pusher('b6ea70f2b0bc14153ae1', {
        cluster: 'eu',
    });

    const channel = pusher.subscribe(boardId!);

    const fetchBoardData = useCallback(async () => {
        if (!boardId) return;
        try {
            const data = await getBoardById(boardId);
            setBoardInfo(data);
            setLists(data.lists);
            setBackgroundUrl(data.backgroundUrl || '');
        } catch (error) {
            console.error('Failed to fetch board data:', error);
            navigate('/dashboard');
            toast({
                variant: 'destructive',
                title: 'Board not found',
                description: 'Board not found, redirecting to dashboard',
            });
        }
        setLoading(false);
    }, [boardId, navigate]);

    useEffect(() => {
        fetchBoardData();
    }, [fetchBoardData]);

    return (
        <BoardContext.Provider
            value={{
                boardInfo,
                setBoardInfo,
                lists,
                setLists,
                backgroundUrl,
                setBackgroundUrl,
                loading,
                setLoading,
                boardId,
                channel
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};
