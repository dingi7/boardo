import { IListProps, IItemProps } from '../../../Interfaces/IList';
import { Card } from './Card';
import dotsVector from '../assets/dotsVector.svg';
import plusIcon from '../assets/plus.svg';
import { useState, useCallback } from 'react';

import update from 'immutability-helper';

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
            <div className=" bg-slate-300 rounded-[7px]">
                <div className="p-5">
                    <div className="inline-flex flex-col items-start gap-[5px] ">
                        <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-[257px] relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-medium text-slate-900 text-[24px] tracking-[0] leading-[normal]">
                                    {name}
                                </div>
                                <img
                                    className="relative w-[33.25px] h-[5.25px]"
                                    alt="More"
                                    src={dotsVector}
                                />
                            </div>
                            <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                                {cards
                                    ? 
                                    cards.map((item: IItemProps, index) => (
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
