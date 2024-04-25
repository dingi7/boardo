import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useContext, useEffect, useState } from 'react';
import { createCard, deleteCard, updateBoard } from '../../api/requests';
import { Loading } from '../../Components/loading';
import { useToast } from '../../Components/Toaster/use-toast';
import {
    dataBaseBoard,
    dataBaseCard,
    dataBaseList,
} from '../../Interfaces/IDatabase';
import { BoardHeader } from './components/BoardHeader';
import { AddListPlaceholder } from './components/List/AddListPlaceholder';
import { List } from './components/List/List';
import { BoardContext } from './contexts/BoardContextProvider';
import { useAuthUser } from 'react-auth-kit';
import { FilterComponent } from './components/Filter/Filter';

export const Board = (): JSX.Element => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [filteredLists, setFilteredLists] = useState<dataBaseList[]>([]);

    const context = useContext(BoardContext);
    const { toast } = useToast();
    const authUser = useAuthUser()();

    if (!context) {
        throw new Error('Board context is not available');
    }
    const {
        boardId,
        boardInfo,
        setBoardInfo,
        lists,
        setLists,
        backgroundUrl,
        setBackgroundUrl,
        loading,
        channel,
        filterCompleted,
        setFilterCompleted,
        filterDeadline,
        setFilterDeadline,
    } = context;

    type PusherCardParams = {
        sender: string;
        card: dataBaseCard;
    };

    type PusherListParams = {
        sender: string;
        list: dataBaseList;
    };

    type PusherBoardParams = {
        sender: string;
        board: dataBaseBoard;
    };

    useEffect(() => {
        const handleCardDeleted = ({ sender, card }: PusherCardParams) => {
            if (sender === authUser!._id) {
                return;
            }
            setLists((prev) => {
                if (!prev) return null;
                return prev.map((list) => ({
                    ...list,
                    cards: list.cards.filter((c) => c._id !== card._id),
                }));
            });
        };

        const handleCardAdded = ({ sender, card }: PusherCardParams) => {
            if (sender === authUser!._id) {
                return;
            }
            setLists((prev) => {
                if (!prev) return null;
                return prev.map((list) =>
                    list._id === card.list
                        ? { ...list, cards: [...list.cards, card] }
                        : list
                );
            });
        };

        const handleCardEdited = ({ sender, card }: PusherCardParams) => {
            if (sender === authUser!._id) return;
            setLists((prev) => {
                if (!prev) return null;

                const newLists = prev.map((list) => ({
                    ...list,
                    cards: list.cards.map((c) =>
                        c._id === card._id ? card : c
                    ),
                }));

                return newLists;
            });
        };

        const handleListEdited = ({ sender, list }: PusherListParams) => {
            if (sender === authUser!._id) {
                return;
            }
            setLists((prev) => {
                if (!prev) return null;
                return prev.map((l) => (l._id === list._id ? list : l));
            });
        };

        const handleListDeleted = ({ sender, list }: PusherListParams) => {
            if (sender === authUser!._id) {
                return;
            }
            setLists((prev) => {
                if (!prev) return null;
                return prev.filter((l) => l._id !== list._id);
            });
        };

        const handleListCreated = ({ sender, list }: PusherListParams) => {
            if (sender === authUser!._id) {
                return;
            }
            setLists((prev) => {
                if (!prev) return null;
                return [...prev, list];
            });
        };

        const handleBoardEdited = ({ sender, board }: PusherBoardParams) => {
            if (sender === authUser!._id) {
                return;
            }
            setBoardInfo(board);
            setLists(board.lists);
        };

        channel.bind('card-added', handleCardAdded);
        channel.bind('card-deleted', handleCardDeleted);
        channel.bind('card-edited', handleCardEdited);
        channel.bind('list-edited', handleListEdited);
        channel.bind('list-deleted', handleListDeleted);
        channel.bind('list-created', handleListCreated);
        channel.bind('board-edited', handleBoardEdited);

        // Unbind the events when the component unmounts
        return () => {
            channel.unbind('card-added', handleCardAdded);
            channel.unbind('card-deleted', handleCardDeleted);
            channel.unbind('card-edited', handleCardEdited);
            channel.unbind('list-edited', handleListEdited);
            channel.unbind('list-deleted', handleListDeleted);
            channel.unbind('list-created', handleListCreated);
            channel.unbind('board-edited', handleBoardEdited);
        };
    }, []);

    const onDeleteCard = async (cardId: string) => {
        try {
            deleteCard(cardId, boardId!, boardInfo?.owner!);
            setLists((prev) => {
                if (!prev) return null;
                return prev.map((list) => ({
                    ...list,
                    cards: list.cards.filter((card) => card._id !== cardId),
                }));
            });
            toast({ title: 'Card deleted' });
        } catch (e) {
            throw new Error('Card could not be deleted');
        }
    };

    const onCardAdd = async (listId: string, name: string) => {
        const card = await createCard(listId, name, boardInfo?.owner!);
        setLists((prev) => {
            if (!prev) return null;
            return prev.map((list) =>
                list._id === card.list
                    ? { ...list, cards: [...list.cards, card] }
                    : list
            );
        });
        toast({
            title: 'Card created successfully',
        });
    };

    const onDragEnd = (result: DropResult) => {
        setIsDragging(false);
        const { destination, source, type } = result;

        if (filterCompleted !== null || filterDeadline !== null) return;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = [...lists!];

            const [removed] = newColumnOrder.splice(source.index, 1);

            newColumnOrder.splice(destination.index, 0, removed);

            setLists(newColumnOrder);
            return updateBoard(boardInfo!._id, boardInfo!.name, newColumnOrder);
        }

        const start = lists!.find(
            (list: dataBaseList) => list._id === source.droppableId
        );
        const finish = lists!.find(
            (list: dataBaseList) => list._id === destination.droppableId
        );
        if (start === finish) {
            const newArr = Array.from(start!.cards);
            const [removed] = newArr.splice(source.index, 1);
            newArr.splice(destination.index, 0, removed);
            if (start) {
                start.cards = newArr;
            }
            const newState = lists!.map((list: dataBaseList) => {
                if (list._id === start?._id) {
                    return start;
                } else {
                    return list;
                }
            });

            setLists(newState);

            return updateBoard(boardInfo!._id, boardInfo!.name, newState);
        }

        const startArr = Array.from(start!.cards);
        const [removed] = startArr.splice(source.index, 1);
        const finishArr = Array.from(finish!.cards);

        finishArr.splice(destination.index, 0, removed);

        const updatedStartList = {
            ...start,
            cards: startArr,
        };
        const updatedFinishList = {
            ...finish,
            cards: finishArr,
        };

        const newState = lists!.map((list: any) => {
            if (list._id === updatedStartList?._id) {
                return updatedStartList;
            } else if (list._id === updatedFinishList?._id) {
                return updatedFinishList;
            } else {
                return list;
            }
        });

        setLists(newState);
        return updateBoard(boardInfo!._id, boardInfo!.name, newState);
    };

    useEffect(() => {
        const filtered = lists?.map((list) => ({
            ...list,
            cards: list.cards.filter((card) => {
                // If filterCompleted is applied and the card's completion status doesn't match, exclude it
                if (
                    filterCompleted !== null &&
                    card.isCompleted !== filterCompleted
                ) {
                    return false;
                }
                // If filterDeadline is applied and the card doesn't have a due date, exclude it
                if (filterDeadline !== null && !card.dueDate) {
                    return false;
                }
                // If filterDeadline is applied, check the due date
                if (filterDeadline !== null && card.dueDate) {
                    const deadline = new Date(card.dueDate);
                    const now = new Date();
                    const diffInDays = Math.ceil(
                        (deadline.getTime() - now.getTime()) /
                            (1000 * 3600 * 24)
                    ); // Round up to the nearest day

                    if (
                        (filterDeadline === 1 && diffInDays > 1) ||
                        (filterDeadline === 7 && diffInDays > 7)
                    ) {
                        return false;
                    }
                }
                // If none of the filters apply, include the card
                return true;
            }),
        }));
        setFilteredLists(filtered || []);
    }, [lists, filterCompleted, filterDeadline]);

    if (loading) return <Loading></Loading>;

    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={() => setIsDragging(true)}
            >
                <div
                    className={`bg-transparent] flex w-screen flex-1 flex-col overflow-hidden overflow-y-auto`}
                    style={{
                        backgroundImage: `url('${backgroundUrl}')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <BoardHeader
                        boardName={boardInfo?.name || ''}
                        setBoardName={(name: string) =>
                            setBoardInfo({ ...boardInfo!, name })
                        }
                        boardId={boardId!}
                        setBackgroundUrl={setBackgroundUrl}
                    />
                    <div className=''>
                        <FilterComponent
                            filterCompleted={filterCompleted}
                            setFilterCompleted={setFilterCompleted}
                            filterDeadline={filterDeadline}
                            setFilterDeadline={setFilterDeadline}
                        />
                    </div>

                    <Droppable
                        droppableId='allcolumns'
                        direction='horizontal'
                        type='column'
                    >
                        {(provided) => (
                            <div
                                className={`md:pretty-scrollBar mx-auto mt-[1%] flex flex-col h-full  gap-[4%] overflow-auto p-[1%] px-[2%] pb-32 pr-[10%] md:w-full md:flex-row`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredLists?.map((data, index) => (
                                    <List
                                        key={data._id}
                                        id={data._id}
                                        styles={data.styles}
                                        title={data.name}
                                        cards={data.cards}
                                        index={index}
                                        onCardAdd={onCardAdd}
                                        onDeleteCard={onDeleteCard}
                                    />
                                ))}
                                <AddListPlaceholder isDragging={isDragging} />

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    );
};
