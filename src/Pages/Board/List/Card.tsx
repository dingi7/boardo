type CardProps = {
    task: string;
};

export const Card = ({task}: CardProps): JSX.Element => {
    return (
        <div className="flex w-[355px] items-center gap-[10px] px-[10px] py-[6px] relative flex-[0_0_auto] bg-[#172b4d] rounded-[10px] overflow-hidden">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                {task}
            </div>
        </div>
    );
};
