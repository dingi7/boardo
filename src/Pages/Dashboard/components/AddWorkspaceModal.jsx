import { X } from "lucide-react";

import { useState } from "react";

export const AddWorkspaceModal = ({ closeModal }) => {

    const [option, setOption] = useState("join")

    return (
        <div className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] border-2 border-solid border-gray-300 p-8 rounded-md bg-slate-100">
            <div className="absolute right-[5%] hover:cursor-pointer" onClick={closeModal}>
                <X />
            </div>

            <div className="flex flex-row justify-center mt-[2%] w-[100%] gap-[10%] font-bold text-2xl">
                <div className="text-center hover:underline decoration-from-font" onClick={() => setOption("join")}>
                    <h1>Join Workspace</h1>
                </div>
                <div className="text-center hover:underline decoration-from-font" onClick={() => setOption("create")}>
                    <h1>Create Workspace</h1>
                </div>
            </div>

            <div>
                {option == "join"
                    ?
                    (
                        <div className="flex flex-col">
                            <label>Board name</label>
                            <input 
                                className=""
                            />
                        </div>
                    )

                    :
                        <div>

                        </div>
                }
            </div>
        </div>
    );
};
