import React from 'react';

interface CreatePlaceholderProps {
  openModal: React.MouseEventHandler; // or use a more specific type if applicable
}

export const CreatePlaceholder: React.FC<CreatePlaceholderProps> = ({ openModal }) => {
  return (
    <div className="px-[2%] py-[10%] bg-gray-200 w-[25%] h-[20%] flex justify-center" onClick={openModal}>
      <p>Create new</p>
    </div>
  );
};
