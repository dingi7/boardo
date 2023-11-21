import { useState, useCallback } from "react";

import { IBoardProps } from "../../Interfaces/IBoard";

import { TaskModal } from "./TaskModal/TaskModal";

import { BoardHeader } from "./Header/BoardHeader";

import update from "immutability-helper";
import Card from "../../Components/DragableComponent/DragableCard";
import { List } from "./List/List";

interface CheckboxElement {
    // Define the shape of your checkbox element
}

interface CardItem {
    id: string;
    name: string;
    checkboxElements: CheckboxElement[];
    color: string;
}

interface BoardCard {
    key: string;
    id: string;
    name: string;
    items: CardItem[];
}

export const Board = (): JSX.Element => {
    //TEMP hardcoded data

    const [cards, setCards] = useState<BoardCard[]>([
        {
            key: "123",
            id: "123",
            name: "Test",
            items: [
                {
                    id: "1",
                    name: "test",
                    checkboxElements: [""],
                    color: "blue",
                },
                {
                    id: "2",
                    name: "test test",
                    checkboxElements: [""],
                    color: "blue",
                },
                {
                    id: "3",
                    name: "test test test",
                    checkboxElements: [""],
                    color: "blue",
                },
            ],
        },

        {
            key: "456",
            id: "456",
            name: "Test1",
            items: [
                {
                    id: "4",
                    name: "test1",
                    checkboxElements: [""],
                    color: "blue",
                },
                {
                    id: "5",
                    name: "test test1",
                    checkboxElements: [""],
                    color: "blue",
                },
                {
                    id: "6",
                    name: "test test test1",
                    checkboxElements: [""],
                    color: "blue",
                },
            ],
        },

        {
            key: "789",
            id: "789",
            name: "Test2",
            items: [
                {
                    id: "7",
                    name: "test2",
                    checkboxElements: [""],
                    color: "blue",
                },
                {
                    id: "8",
                    name: "test test2",
                    checkboxElements: [""],
                    color: "blue",
                },
                {
                    id: "9",
                    name: "test test test2",
                    checkboxElements: [""],
                    color: "blue",
                },
            ],
        },
    ]);

    const { boardName, boardId }: IBoardProps = {
        boardName: "test",
        boardId: "test",
    };

    const [boards, setBoards] = useState([
        {
            boardName: "test1",
            boardId: "test",
        },
        {
            boardName: "test1",
            boardId: "test1",
        },
        {
            boardName: "test2",
            boardId: "test2",
        },
    ]);

    //^^TEMP

    const [isOpen, setIsOpen] = useState(false);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
    }, []);

    const renderCard = useCallback(
        (card: BoardCard, index: number) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    card={card}
                    OpenModal={() => setIsOpen(true)}
                    moveCard={moveCard}
                />
            );
        },
        [moveCard]
    );

    return (
        <div className="bg-[url('https://images.unsplash.com/photo-1698471058817-a280ddf07704?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col w-screen overflow-y-auto h-screen">
            {/* change bg */}
            <BoardHeader boardName={boardName} boardId={boardId} />

            <div
                className={`flex flex-row mt-[1%] ml-10 p-[1%] gap-[2%] w-full overflow-auto ${
                    isOpen && "blur-sm disabled"
                }`}
            >
                {cards.map((card, index) => renderCard(card, index))}
                <List
                    id="addNew"
                    name="+ Add a list"
                    initialItems={[]}
                    setIsOpen={() => {}}
                ></List>
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-slate-100 opacity-50"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[5%] bg-gradient-to-b from-black to-blue-400 rounded h-[65%] w-[30%] shadow-lg shadow-blue-500/50">
                        <TaskModal setIsOpen={() => setIsOpen(false)} />
                    </div>
                </>
            )}
        </div>
    );
};
