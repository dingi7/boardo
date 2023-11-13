export const BoardSidebar = (): JSX.Element => {
    return (
        <div className="relative w-[270px] h-full top-0  bg-[#141d27]">
            <div className="inline-flex items-end gap-[10px] absolute top-[18px] left-[14px] ">
                <div className="relative w-[55px] h-[57px] bg-[#92a0ae]" />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                    Kamen Kanev’s
                    <br />
                    workspace
                </div>
            </div>
            <div className="flex flex-col w-[268px] items-center gap-[11px] relative top-[43px] ">
                <div className="relative border-t border-[#92a0ae] mt-11 w-full" />
                <div className="inline-flex items-start gap-[85px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                        Your boards
                    </div>
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                        <button>+</button>
                    </div>
                </div>
            </div>
            <div className="inline-flex items-end gap-[11px] absolute top-[147px] left-[16px]">
                <div className="flex flex-wrap w-[132px] items-end gap-[11px_12px] relative">
                    <div className="relative w-[31px] h-[32.13px] bg-[#92a0ae]" />
                    <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                        Board 1
                    </div>
                    <div className="relative w-[31px] h-[32.13px] bg-[#92a0ae]" />
                    <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                        Board 2
                    </div>
                    <div className="relative w-[31px] h-[32.13px] bg-[#92a0ae]" />
                    <div className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                        Board 3
                    </div>
                </div>
            </div>
        </div>
    );
};
