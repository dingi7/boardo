import { ListItem } from '../../../../Interfaces/IList';
import { Card } from '../Card';

import { MoreHorizontal } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { dataBaseCard } from '../../../../Interfaces/IDatabase';
import { CardForm } from '../CardForm';
import { ListTitle } from './list-title';
import { useState } from 'react';

export const List = ({
    id,
    title,
    cards,
    index,
    onCardAdd,
    onDeleteCard,
}: ListItem): JSX.Element => {
    const [listTitle, setListTitle] = useState(title);
    return (
        <Draggable draggableId={id} index={index!}>
            {(provided) => (
                <div
                    className='inline-flex flex-col items-start gap-[5%] min-w-[365px]'
                    key={id}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div
                        className=' bg-slate-300 rounded-lg shadow-lg p-[4%] w-full'
                        {...provided.dragHandleProps}
                    >
                        <div className='p-[2%] inline-flex flex-col items-start gap-[5%] w-full'>
                            <div className='inline-flex flex-col items-start gap-[4%] relative w-full'>
                                <div className='flex items-center justify-between w-full whitespace-nowrap'>
                                    <div className="[font-family:'Inter-Bold',Helvetica] font-medium text-[24px] tracking-[0] leading-[normal]">
                                        <ListTitle
                                            title={listTitle}
                                            setTitle={setListTitle}
                                            listId={id}
                                        />
                                    </div>
                                    <MoreHorizontal className='h-6 w-6 on:hover:bg-slate-200 cursor-pointer' />
                                </div>
                                <Droppable droppableId={id} type='task'>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='inline-flex flex-col items-start gap-[0.5rem] relative flex-[0_0_auto] flex-grow-1 min-h-[100px] min-w-full'
                                        >
                                            {cards
                                                ? cards.map(
                                                      (
                                                          item: dataBaseCard,
                                                          index
                                                      ) => (
                                                          <Card
                                                              key={item._id}
                                                              index={index}
                                                              content={
                                                                  item.name
                                                              }
                                                              id={item._id}
                                                              onDeleteCard={
                                                                  onDeleteCard
                                                              }
                                                          />
                                                      )
                                                  )
                                                : null}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <CardForm listId={id} onCardAdd={onCardAdd} />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
