// import moreInfo from "../../public/more.svg";
import moreInfo from './more.svg';

export const Header = (): JSX.Element => {
    return (
        <div className="inline-flex items-start gap-[1345px] relative flex-[0_0_auto]">
            <div className="inline-flex items-end gap-[14px] relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[34px] tracking-[0] leading-[normal]">
                    <button>BOARDO</button>
                </div>
            </div>
            <div className="inline-flex items-center gap-[37px] relative flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-[#147d9e] rounded-[30px]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[22px] tracking-[0] leading-[normal]">
                        <button>SIGN IN</button>
                    </div>
                </div>
                <button>
                    <img
                        className="relative w-[51px] h-[60.71px]"
                        alt="more"
                        src={moreInfo}
                    />
                </button>
            </div>
        </div>
    );
};
