export const BoardPlaceholder = ({img}: {img: string}) => {

    //const img = "https://thumbs.dreamstime.com/b/aerial-view-lago-antorno-dolomites-lake-mountain-landscape-alps-peak-misurina-cortina-di-ampezzo-italy-reflected-103752677.jpg"


    return(
        <>
        {img ?
        <div
            className="w-[30%] h-[100%] mt-[2%]  rounded bg-gradient-to-r from-slate-600 to-slate-900 text-white"
        >
            <p className="absolute">Board</p>
            <div
            className="h-full rounded"
            >
                <img 
                    src={img}
                    alt="board display image"
                />
            </div>
        </div>
        :
        <></>
}
        </>
    )
    
}
