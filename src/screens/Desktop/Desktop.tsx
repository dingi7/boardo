import React from "react";

export const Desktop = (): JSX.Element => {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black overflow-hidden w-[1475px] h-[1176px] relative">
        <div className="absolute w-[1240px] h-[933px] top-[275px] left-[118px] bg-[url(https://c.animaapp.com/hsYDYkez/img/frame-10.png)] bg-cover bg-[50%_50%]">
          <div className="inline-flex flex-wrap items-center justify-center gap-[100px_100px] px-[10px] py-[16px] relative top-[198px]">
            <div className="flex flex-wrap w-[603px] items-end gap-[27px_0px] relative">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-extrabold text-white text-[122px] tracking-[0] leading-[normal]">
                Welcome.
              </div>
              <div className="flex items-end gap-[45px] relative flex-1 grow">
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-[#147d9e] rounded-[30px] overflow-hidden">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                    CREATE YOUR FIRST BOARD
                  </div>
                </div>
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] rounded-[30px] overflow-hidden border border-solid border-[#e0e0e0]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-[24px] tracking-[0] leading-[normal]">
                    see more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-start gap-[891px] absolute top-[39px] left-[118px]">
          <div className="inline-flex items-end gap-[14px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-[34px] tracking-[0] leading-[normal]">
              BOARDO
            </div>
          </div>
          <div className="inline-flex items-center gap-[37px] relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-[#147d9e] rounded-[30px]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-[22px] tracking-[0] leading-[normal]">
                SIGN IN
              </div>
            </div>
            <img
              className="relative w-[61px] h-[69.71px]"
              alt="Frame"
              src="https://c.animaapp.com/hsYDYkez/img/frame.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
