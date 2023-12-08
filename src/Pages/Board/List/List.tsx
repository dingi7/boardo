import { ListItem } from '../../../Interfaces/IList';
import { Card } from './Card';

import { MoreHorizontal } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { dataBaseCard } from '../../../Interfaces/IDatabase';
import { CardForm } from '../_components/card-form';

export const List = ({ id, title, items, index }: ListItem): JSX.Element => {
    return (
        <Draggable draggableId={id} index={index!}>
            {(provided) => (
                <div
                    className="inline-flex flex-col items-start gap-[10px] "
                    key={id}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div
                        className=" bg-slate-300 rounded-[7px] shadow-lg"
                        {...provided.dragHandleProps}
                    >
                        <div className="p-5">
                            <div className="inline-flex flex-col items-start gap-[5px] ">
                                <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                                    <div className="flex items-center justify-between w-full whitespace-nowrap min-w-[200px]">
                                        <div className="w-full mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-medium text-slate-900 text-[24px] tracking-[0] leading-[normal]">
                                            {title}
                                        </div>
                                        <MoreHorizontal
                                            className="h-6 w-6 on:hover:bg-slate-200 cursor-pointer"
                                            onClick={() => console.log('2')}
                                        />
                                    </div>
                                    <Droppable droppableId={id} type="task">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto] flex-grow-1 min-h-[100px] min-w-[365px]"
                                            >
                                                {items
                                                    ? items.map(
                                                          (
                                                              item: dataBaseCard,
                                                              index
                                                          ) => (
                                                              <Card
                                                                  key={item._id}
                                                                  index={index}
                                                                  content={
                                                                      item.content
                                                                  }
                                                                  id={item._id}
                                                              />
                                                          )
                                                      )
                                                    : null}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                                <CardForm listId={id}></CardForm>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
