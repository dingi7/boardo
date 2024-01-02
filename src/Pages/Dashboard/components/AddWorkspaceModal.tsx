import { X, Search } from 'lucide-react';

import { useState } from 'react';

export const AddWorkspaceModal = ({
    closeModal,
}: {
    closeModal: () => void;
}) => {
    const [option, setOption] = useState('join');

    const handleCreateWorkspace = (e:any) => {
        closeModal();

        e.preventDefault()
    }

    const handleJoinWorkspace = () => {

        closeModal();
    }

    return (
        <div className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] border-2 border-solid border-gray-300 p-8 rounded-md bg-slate-100">
            <div
                className="absolute right-[5%] hover:cursor-pointer"
                onClick={closeModal}
            >
                <X />
            </div>

            <div className="flex flex-row justify-center mt-[2%] w-[100%] gap-[10%] font-bold text-2xl">
                <div
                    className={`text-center hover:underline decoration-from-font ${option == "join" && "underline"}`}
                    onClick={() => setOption('join')}
                >
                    <h1>Join Workspace</h1>
                </div>
                <div
                    className={`text-center hover:underline decoration-from-font ${option == "create" && "underline"}`}
                    onClick={() => setOption('create')}
                >
                    <h1>Create Workspace</h1>
                </div>
            </div>

            <div>
                {option === 'join' ? (
                    <form className="flex flex-col w-[70%] mx-auto mt-[4%]" onSubmit={handleJoinWorkspace}>
                        <label className="font-medium">Workspace name</label>
                        <div className="flex flex-row gap-[4%] items-center">
                            <input className="border-2 border-solid border-black p-[1.4%]" />
                            <div className="w-[8%]">
                                <Search className="bg-indigo-500 p-[4%] h-full w-full rounded-md text-white hover:cursor-pointer" />
                            </div>
                        </div>
                    </form>
                ) : (
                    <form className="flex flex-col w-[70%] mx-auto mt-[4%]" onSubmit={handleCreateWorkspace}>
                        <label className="font-medium">Workspace name</label>
                        <input className="border-2 border-solid border-black p-[1.4%]" />

                        <label className="font-medium mt-[2%]">Workspace password</label>
                        <input className="border-2 border-solid border-black p-[1.4%]" />

                        <label className="font-medium mt-[2%]">Workspace password</label>
                        <input className="border-2 border-solid border-black p-[1.4%]" />

                        <button type="submit">
                            Create
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
