import closeVector from "../assets/closeVector.svg"

interface TaskModalProps {
    setIsOpen: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ setIsOpen }) => {
    return (
        <div

        >
            <button
                className="absolute top-0 right-0 p-2 mt-[1%] mr-[1%]"
                style={{ cursor: "pointer" }}
                onClick={setIsOpen}
            >
                <img
                    src={closeVector}
                />
            </button>
            <form
                className="flex flex-col"
            >
                <label className="text-white">Task label:</label>
                <input className="bg-white text-black p-2 rounded" />

                <label className="text-white">Task colour:</label>
                <div className="flex gap-2">
                    <div
                        className="p-[8%] bg-red-600 cursor-pointer"
                    ></div>
                    <div
                        className="p-[8%] bg-blue-600 cursor-pointer"
                    ></div>
                    <div
                        className="p-[8%] bg-purple-600 cursor-pointer"
                    ></div>

                    <div
                        className="p-[8%] bg-orange-600 cursor-pointer"
                    ></div>

                    <div
                        className="p-[8%] bg-green-600 cursor-pointer"
                    ></div>
                </div>

                <button
                    type="submit"
                    className="py-[2%] px-[10%] bg-black text-white rounded absolute bottom-[4%] left-1/2 transform -translate-x-1/2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
