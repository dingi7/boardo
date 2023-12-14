export const BoardPlaceholder = ({
    name,
    img,
}: {
    name: string;
    img: string;
}) => {
    return (
        <>
            {img ? (
                <div className="w-[30%] h-[100%] mt-[2%]  rounded bg-gradient-to-r from-slate-600 to-slate-900 text-white">
                    <p className="absolute">{name}</p>
                    <div className="h-full rounded">
                        <img src={img} alt="board display" />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
