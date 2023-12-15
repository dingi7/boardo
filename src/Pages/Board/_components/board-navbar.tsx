import { MoreHorizontal } from "lucide-react";
import { BoardTitle } from "./board-title";
import { useState } from "react";
import { createBoard, removeBoardBackground, updateBoardBackground } from "../../../api/requests";
import { useParams } from "react-router-dom";

export const BoardHeader = ({
    boardName,
    setBoardName,
    setBackgroundUrl,
    backgroundUrl
}: any): JSX.Element => {
    const { boardId } = useParams();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [file, setFile] = useState<File>();

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
    };
    const handleSubmit = async () => {
        if(!boardId) return;
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "g3xeufp5");

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/drmxfdj5o/image/upload",
                {
                    // Replace with your API endpoint
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            setBackgroundUrl(result.url);
            await updateBoardBackground(boardId, result.url)
            setShowModal(false);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    const handleRemove = async () => {
        if(!boardId) return;
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/drmxfdj5o/image/destroy",
            {
                method: "POST",
                body: `public_id=u0xupohegdke01ynkm47&api_key=677511693625866`,
            }
        );
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        setBackgroundUrl("");
        removeBoardBackground(boardId)
    }
    return (
        <div className="bg-black bg-opacity-20 text-white w-full flex items-center justify-between py-2 px-16">
            <div className="flex items-center gap-1">
                {/* <div className="font-bold text-[24px]">{boardName}</div> */}
                <BoardTitle boardName={boardName} setBoardName={setBoardName} />
            </div>
            <button
                className="hover:shadow-lg rounded-md transition duration-300 ease-in-out p-2"
                onClick={openModal}
            >
                <MoreHorizontal />
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-auto">
                        <div className="p-6">
                            <label className="block">
                                <span className="sr-only">Choose file</span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
                                />
                            </label>
                        </div>
                        <div className="bg-gray-100 px-6 py-3 flex justify-end gap-3 text-sm">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleRemove}
                            >
                                Remove Background
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
