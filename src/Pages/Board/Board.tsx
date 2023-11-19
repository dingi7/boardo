import { useState, useCallback } from 'react';

import { IBoardProps } from '../../Interfaces/IBoard';

import { List } from './List/List';
import { TaskModal } from './TaskModal/TaskModal';

import { BoardHeader } from './Header/BoardHeader';
import { BoardSidebar } from './Sidebar/BoardSidebar';

import update from 'immutability-helper';
import  Card from '../../Components/DragableComponent/DragableCard';

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
  const [isOpen, setIsOpen] = useState(false);

  const [cards, setCards] = useState<BoardCard[]>([
    {
      key: '123',
      id: '123',
      name: 'Test',
      items: [
        { id: '1', name: 'test', checkboxElements: [''], color: 'blue' },
        { id: '2', name: 'test test', checkboxElements: [''], color: 'blue' },
        { id: '3', name: 'test test test', checkboxElements: [''], color: 'blue' },
      ],
    },
    
    {
      key: '456',
      id: '456',
      name: 'Test1',
      items: [
        { id: '4', name: 'test1', checkboxElements: [''], color: 'blue' },
        { id: '5', name: 'test test1', checkboxElements: [''], color: 'blue' },
        { id: '6', name: 'test test test1', checkboxElements: [''], color: 'blue' },
      ],
    },

    {
      key: '789',
      id: '789',
      name: 'Test2',
      items: [
        { id: '7', name: 'test2', checkboxElements: [''], color: 'blue' },
        { id: '8', name: 'test test2', checkboxElements: [''], color: 'blue' },
        { id: '9', name: 'test test test2', checkboxElements: [''], color: 'blue' },
      ],
    },
  ]);

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

  const { boardName, boardId }: IBoardProps = {
    boardName: 'test',
    boardId: 'test',
  };

  return (
    <div className="bg-[#172b4d] flex flex-row justify-center w-full overflow-y-auto">
      <div className="flex flex-row bg-[#172b4d] overflow-hidden w-full h-screen relative">
        <BoardSidebar />
        <BoardHeader boardName={boardName} boardId={boardId} />
        <div
          className={`flex flex-row mt-[4%] p-[1%] gap-[2%] w-full overflow-auto ${isOpen && 'blur-sm disabled'}`}
        >
          {cards.map((card, index) => renderCard(card, index))}
        </div>

        {isOpen && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>
            <div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[5%] bg-gradient-to-b from-black to-blue-400 rounded h-[65%] w-[30%] shadow-lg shadow-blue-500/50"
            >
              <TaskModal setIsOpen={() => setIsOpen(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
