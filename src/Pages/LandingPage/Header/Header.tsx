// import moreInfo from "../../public/more.svg";
import moreInfo from "./more.svg";

import { useNavigate } from "react-router-dom";
import { authRoutes } from "../../../util/routesList";

export const Header = (): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between">
            <div className="inline-flex items-end gap-[14px]  flex-[0_0_auto]">
                <div className=" w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[34px] tracking-[0] leading-[normal]">
                    <button
                        onClick={() => navigate("/")}
                    >
                        BOARDO
                    </button>
                </div>
            </div>
            <div className="inline-flex items-center gap-[37px]  flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center gap-[10px] p-[10px]  flex-[0_0_auto] bg-[#147d9e] rounded-[30px]">
                    <div className=" w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[22px] tracking-[0] leading-[normal]">
                        <button
                            onClick={() => navigate(authRoutes.register)}
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>
                <button>
                    <img
                        className=" w-[51px] h-[60.71px]"
                        alt="more"
                        src={moreInfo}
                    />
                </button>
            </div>
        </div>
    );
};
