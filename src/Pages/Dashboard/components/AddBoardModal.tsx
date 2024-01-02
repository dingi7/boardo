import { X } from 'lucide-react';

export const AddBoardModal = ({
    closeModal,
}: {
    closeModal: () => void;
}) => {


    const handleCreateWorkspace = (e: any) => {
        closeModal();

        e.preventDefault()
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
                    className={`text-center hover:underline decoration-from-font`}
                >
                    <h1>Create board</h1>
                </div>
            </div>

            <div>
                <form className="flex flex-col w-[70%] mx-auto mt-[4%]" onSubmit={handleCreateWorkspace}>
                    <label className="font-medium">Board name</label>
                    <input className="border-2 border-solid border-black p-[1.4%]" />

                    <label className="font-medium mt-[2%]">Board background image</label>
                    <input className="border-2 border-solid border-black p-[1.4%]" />

                    <button type="submit">
                        Create
                    </button>
                </form>

            </div>
        </div>
    );
};
