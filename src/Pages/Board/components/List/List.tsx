import { ListItem } from '../../../../Interfaces/IList';
import { Card } from '../Card/Card';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { dataBaseCard } from '../../../../Interfaces/IDatabase';
import { CardForm } from '../Card/CardForm';
import { ListTitle } from './ListTitle';
import { useEffect, useState } from 'react';
import { ListSettingsDropdownMenu } from '../ListSettingsDropdown';

export const List = ({
    id,
    title,
    cards,
    index,
    onCardAdd,
    onDeleteCard,
    styles,
}: ListItem): JSX.Element => {
    useEffect(() => {
        setListTitle(title);
    }, [title]);
    const [listTitle, setListTitle] = useState(title);
    const [backgroundColor, setBackgroundColor] = useState<string>(
        styles?.backgroundColor || 'bg-slate-300'
    );
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
                        className={`rounded-lg  p-[4%] w-full ${backgroundColor}`}
                        {...provided.dragHandleProps}
                    >
                        <div className='p-[2%] inline-flex flex-col items-start gap-[5%] w-full'>
                            <div className='inline-flex flex-col items-start gap-[4%] relative w-full'>
                                <div className='flex items-center justify-between w-full whitespace-nowrap'>
                                    <div className="[font-family:'Inter-Bold',Helvetica] font-medium text-[24px] mb-2 tracking-[0] leading-[normal]">
                                        <ListTitle
                                            title={listTitle}
                                            setTitle={setListTitle}
                                            listId={id}
                                        />
                                    </div>
                                    <ListSettingsDropdownMenu
                                        listId={id}
                                        setBackgroundColor={setBackgroundColor}
                                    />
                                    {/* <SettingsCardModal /> */}
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
                                                              storedPriority={
                                                                  item.styles
                                                                      .priority
                                                              }
                                                              storedDueDate={
                                                                  item.dueDate
                                                              }
                                                              storedDescription={
                                                                  item.description
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
