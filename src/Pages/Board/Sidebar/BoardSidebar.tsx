

export const BoardSidebar: React.FC<{ boards: { boardName: string, boardId: string }[] }> = ({ boards }): JSX.Element => {
    return (
        <div className="relative w-[17%] h-full top-0  bg-[#141d27]">
            <div className="inline-flex items-end gap-[10px] fixed top-[2%] left-[1%] mb-[10%]">
                <div className="relative w-[55px] h-[57px] bg-[#92a0ae]" />
                <div className="relative w-fit [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] lg:text-[24px] tracking-[0] leading-[normal]">
                    <p
                        className="flex flex-col"
                    >
                        <span>Kamen Kanev’s</span>
                        <span>workspace</span>
                    </p>
                </div>
            </div>
            <div className="w-[100%] flex flex-col relative top-[10%] ">
                <div className="w-full relative border-t border-[#92a0ae] w-full" />
                <div className="flex flex-row justify-between gap-[2%] relative mt-[2%] mx-[4%]">
                    <div className=" relative w-[100%] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#92a0ae] text-[24px] text-left tracking-[0] leading-[normal]">
                        Your boards
                    </div>
                    <div className="relative w-fit  [font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#92a0ae] text-[24px] tracking-[0] leading-[normal]">
                        <button>+</button>
                    </div>
                </div>
            </div>
            <div className="flex relative top-[12%] ml-[4%] w-full">
                <div className="flex flex-col flex-wrap w-full items-end gap-[11px_12px] relative">

                    {boards.map((board) =>
                        <div
                            className="mb-[10%] w-full flex flex-row gap-[5%] text-left [font-family:'Inter-Medium',Helvetica] font-medium text-[#92a0ae] text-[24px] tracking-[0] leading-[normal] hover:font-bold hover:underline"
                        >
                            <div className="relative w-[10%] h-[100%] bg-[#92a0ae]" />
                            <p>{board.boardName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
