import { useState, useEffect, useCallback } from 'react';

interface DraggableHook {
  draggedItem: { id: string | null; index: number | null };
  handleDragStart: (id: string, index: number) => void;
  handleDragEnd: () => void;
  handleDrop: (overIndex: number) => void;
  items: any[];
}

const useDraggable = (initialItems: any[]): DraggableHook => {
  const [draggedItem, setDraggedItem] = useState({ id: '', index: 0 });
  const [items, setItems] = useState(initialItems);

  const handleDragStart = useCallback((id: string, index: number) => {
    setDraggedItem({ id, index });
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem({ id: '', index: 0 });
  }, []);

  const handleDrop = useCallback((overIndex: number) => {
    if (draggedItem.index === null || draggedItem.id === null) return;

    if (overIndex === draggedItem.index) return;

    // Update the order of items
    const updatedItems = [...items];
    const [dragged] = updatedItems.splice(draggedItem.index, 1);
    updatedItems.splice(overIndex, 0, dragged);

    setItems(updatedItems);

    console.log(`Move card from index ${draggedItem.index} to index ${overIndex}`);
  }, [draggedItem.index, draggedItem.id]);

  useEffect(() => {
    // Add event listeners for drag and drop events
    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', handleDragEnd);

    return () => {
      // Cleanup event listeners on component unmount
      document.removeEventListener('dragover', (e) => e.preventDefault());
      document.removeEventListener('drop', handleDragEnd);
    };
  }, [handleDragEnd]);

  return {
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    items,
  };
};

export default useDraggable;
