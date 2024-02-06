import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useContext, useEffect, useState } from "react";
import { createCard, deleteCard, updateBoard } from "../../api/requests";
import { Loading } from "../../Components/loading";
import { Navbar } from "../../Components/navbar";
import { useToast } from "../../Components/Toaster/use-toast";
import { dataBaseList } from "../../Interfaces/IDatabase";
import { BoardHeader } from "./components/BoardHeader";
import { AddListPlaceholder } from "./components/List/AddListPlaceholder";
import { List } from "./components/List/List";
import { BoardContext } from "./contexts/BoardContextProvider";

import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");
const socket = io("https://boardo-back-end.vercel.app/api/v1");

export const Board = (): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const context = useContext(BoardContext);
  const { toast } = useToast();

  if (!context) {
    throw new Error("Board context is not available");
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
  } = context;

  useEffect(() => {
    if (boardId) {
      socket.emit("join-board", boardId);
    }
  }, [boardId]);

  const onDeleteCard = async (cardId: string) => {
    try {
      deleteCard(cardId, boardId!, boardInfo?.owner!);
      socket.emit("delete-card", cardId, boardId!);
      setLists((prev) => {
        if (!prev) return null;
        return prev.map((list) => ({
          ...list,
          cards: list.cards.filter((card) => card._id !== cardId),
        }));
      });
    } catch (e) {
      throw new Error("Card could not be deleted");
    }
  };
  socket.on("card-deleted", (cardId) => {
    setLists((prev) => {
      if (!prev) return null;
      return prev.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => card._id !== cardId),
      }));
    });
  });

  const onCardAdd = async (listId: string, name: string) => {
    const card = await createCard(listId, name, boardInfo?.owner!);
    socket.emit("create-card", card, boardId!);
    toast({
      title: "Card created successfully",
    });
    setLists((prev) => {
      if (!prev) return null;
      return prev.map((list) =>
        list._id === card.list
          ? { ...list, cards: [...list.cards, card] }
          : list,
      );
    });
  };

  socket.on("card-created", (card) => {
    console.log("Got card info " + card);
    setLists((prev) => {
      if (!prev) return null;
      return prev.map((list) =>
        list._id === card.list
          ? { ...list, cards: [...list.cards, card] }
          : list,
      );
    });
  });
  // socket.on("list-created", (newList: any) => {
  //   setLists((prev: any) => {
  //     // if (!Array.isArray(prev)) return [newList];
  //     return [...prev, newList];
  //     // return prev?.map((list: any) => {
  //     //   if (list._id === newList._id) {
  //     //     return newList;
  //     //   }
  //     //   return list;
  //     // });
  //   });
  // });

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = [...lists!];

      const [removed] = newColumnOrder.splice(source.index, 1);

      newColumnOrder.splice(destination.index, 0, removed);

      setLists(newColumnOrder);
      return updateBoard(boardInfo!._id, boardInfo!.name, newColumnOrder);
    }

    const start = lists!.find(
      (list: dataBaseList) => list._id === source.droppableId,
    );
    const finish = lists!.find(
      (list: dataBaseList) => list._id === destination.droppableId,
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
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <BoardHeader
            boardName={boardInfo?.name || ""}
            setBoardName={(name: string) =>
              setBoardInfo({ ...boardInfo!, name })
            }
            boardId={boardId!}
            setBackgroundUrl={setBackgroundUrl}
          />
          <Droppable
            droppableId="allcolumns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={`md:pretty-scrollBar mx-auto mt-[1%] flex h-screen flex-col  gap-[4%] overflow-auto p-[1%] px-[2%] pb-[5%] pr-[10%] md:w-full md:flex-row`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists?.map((data, index) => (
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
                <AddListPlaceholder isDragging={isDragging} socket={socket} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};
