import { BoardTitle } from './BoardTitle';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    removeBoardBackground,
    updateBoardBackground,
    uploadBoardBackground,
} from '../../../api/requests';
import { useParams } from 'react-router-dom';
import { BoardSettingsDropdownMenu } from './BoardSettingsDropdownMenu';

export const BoardHeader = ({
    boardName,
    setBoardName,
    setBackgroundUrl,
    backgroundUrl,
}: any): JSX.Element => {
    const { boardId } = useParams();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const openModal = useCallback(() => {
        setShowModal(true);
        setFile(null);
    }, []);
    const closeModal = useCallback(() => setShowModal(false), []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!boardId) return;
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'g3xeufp5');
        const response = await uploadBoardBackground(formData);
        setBackgroundUrl(response.url);
        await updateBoardBackground(boardId, response.url);
        setShowModal(false);
    };

    const handleRemove = async () => {
        if (!boardId) return;
        setBackgroundUrl('');
        removeBoardBackground(boardId);
    };

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                closeModal();
            }
        },
        [closeModal]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <>
            <div className='bg-black bg-opacity-20 text-white w-full flex items-center justify-between py-2 px-16'>
                <div className='flex items-center gap-1'>
                    {/* <div className="font-bold text-[24px]">{boardName}</div> */}
                    <BoardTitle
                        boardName={boardName}
                        setBoardName={setBoardName}
                    />
                </div>
                
                <BoardSettingsDropdownMenu></BoardSettingsDropdownMenu>
            </div>
            {showModal && (
                <div className='fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4'>
                    <div
                        ref={modalRef}
                        className='bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-auto p-1'
                    >
                        <div className='p-6'>
                            <label className='block'>
                                <span className='sr-only'>Choose file</span>
                                <input
                                    type='file'
                                    onChange={handleFileChange}
                                    className='block w-full text-sm text-gray-500
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0
                           file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100'
                                />
                            </label>
                        </div>
                        <div className='bg-gray-100 px-6 py-3 flex justify-end gap-3 text-sm'>
                            <button
                                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                onClick={handleRemove}
                            >
                                Remove Background
                            </button>
                            <button
                                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                    !file ? 'opacity-50' : ''
                                }`}
                                onClick={handleSubmit}
                                disabled={!file}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
