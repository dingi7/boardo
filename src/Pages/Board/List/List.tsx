import { IListProps, IItemProps } from '../../../Interfaces/IList';
import { Card } from './Card';
import { useState, useCallback } from 'react';

import update from 'immutability-helper';
import { MoreHorizontal } from 'lucide-react';

export const List = ({
    id,
    name,
    initialItems,
    setIsOpen,
}: IListProps): JSX.Element => {
    const [cards, setCards] = useState(initialItems);

    const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: any) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        );
    }, []);

    return (
        <div className="inline-flex flex-col items-start gap-[10px] " key={id}>
            <div className=" bg-slate-300 rounded-[7px] shadow-lg">
                <div className="p-5">
                    <div className="inline-flex flex-col items-start gap-[5px] ">
                        <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                            <div className="flex items-center justify-between w-full whitespace-nowrap min-w-[200px]">
                                <div className="w-full mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-medium text-slate-900 text-[24px] tracking-[0] leading-[normal]">
                                    {name}
                                </div>
                                <MoreHorizontal
                                    className="h-6 w-6 on:hover:bg-slate-200 cursor-pointer"
                                    onClick={() => console.log('2')}
                                />
                            </div>
                            <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                                {cards
                                    ? cards.map((item: IItemProps, index) => (
                                          <Card
                                              key={item.id}
                                              index={index}
                                              task={item.name}
                                              id={item.id}
                                              moveTask={moveTask}
                                          />
                                      ))
                                    : null}
                            </div>
                        </div>
                        <button
                            className="inline-flex items-center relative flex-[0_0_auto]"
                            onClick={setIsOpen}
                        >
                            <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-semibold  text-gray-400 text-[16px] tracking-[0] leading-[normal] whitespace-nowrap  pt-5">
                                + Add a card
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
