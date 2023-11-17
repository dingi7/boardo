export const Create = () => {




    return (
        <div className="flex flex-col h-screen gap-[5%] bg-gradient-to-b from-black to-blue-400">

            <div
                className="w-[80%] mx-auto mt-[2%]"
            >
                <form
                    className="flex flex-col"
                >


                    <label
                        className="text-gray-100 font-bold text-left"
                    >
                        Board name
                    </label>
                    <input
                        className="px-[1%] py-[0.5%] mb-[1%]"
                    />


                    <label
                        className="text-gray-100 font-bold text-left"
                    >
                        Workspace
                    </label>
                    <select
                        className="px-[1%] py-[0.5%] mb-[1%]"
                    >
                        <option value="">Mityo`s Workspace</option>
                        <option value="">Kamen`s Workspace</option>
                        <option value="">Ivan`s Workspace</option>
                    </select>


                    <label
                        className="text-gray-100 font-bold text-left"
                    >
                        Visiblity
                    </label>
                    <select
                        className="px-[1%] py-[0.5%] mb-[1%]"
                    >
                        <option>Private</option>
                        <option>Workspace</option>
                        <option>Public</option>
                    </select>

                    <div className="inline-flex items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-[#147d9e] rounded-[0.5rem] overflow-hidden">
                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
                            <button
                                type="submit"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}