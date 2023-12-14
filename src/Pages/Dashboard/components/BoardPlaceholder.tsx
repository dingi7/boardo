import { useState } from "react";

export const BoardPlaceholder = ({
    name,
    img,
}: {
    name: string;
    img: string;
}) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            {img ? (
                <div className={`w-[30%] h-[100%] mt-[2%] rounded bg-gradient-to-r from-slate-600 to-slate-900 text-white relative`}>

                    <div
                        className={`w-full h-full rounded bg-gradient-to-r from-slate-600 to-slate-900 text-white relative`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className="h-full rounded overflow-hidden">
                            <img src={img} alt="board display" className={`w-full h-full object-cover duration-500 ease-in-out ${isHovering && "blur"}`} />
                        </div>
                    </div>

                    {isHovering &&
                        <p className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold select-none`}>
                            {name}
                        </p>
                    }
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
