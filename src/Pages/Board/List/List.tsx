import { IListProps, IItemProps } from '../../../Interfaces/IList';
import { Card } from './Card';
import dotsVector from '../assets/dotsVector.svg';
import plusIcon from '../assets/plus.svg';

export const List = ({ id, name, items }: IListProps): JSX.Element => {
    return (
        <div className="inline-flex flex-col items-start gap-[10px]" key={id}>
            <div className="bg-neutral-950 rounded-[15px]">
                <div className="p-5">
                    <div className="inline-flex flex-col items-start gap-[5px] ">
                        <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                            <div className="inline-flex items-center gap-[257px] relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                                    {name}
                                </div>
                                <img
                                    className="relative w-[33.25px] h-[5.25px]"
                                    alt="More"
                                    src={dotsVector}
                                />
                            </div>
                            <div className="inline-flex flex-col items-start gap-[13px] relative flex-[0_0_auto]">
                                {items
                                    ? items.map((item: IItemProps) => (
                                          <Card
                                              key={item.id}
                                              task={item.name}
                                          />
                                      ))
                                    : null}

                                <Card task="Front End" />
                            </div>
                        </div>
                        <div className="inline-flex items-center relative flex-[0_0_auto]">
                            <img
                                className="relative w-[28px] h-[28px]"
                                alt="Plus"
                                src={plusIcon}
                            />
                            <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                Add a card
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
