import { useState, useCallback } from 'react';

interface DraggableHook {
  draggedItem: { id: string | null; index: number | null };
  setDraggedItem: Function;
  handleDragStart: (id: string, index: number) => void;
  handleDragEnd: () => void;
  handleEnter: (overIndex: number) => void;
  items: any[];

  //isParrent: boolean;
}

const useDraggable = (initialItems: any[], draggedItem: any, setDraggedItem: any): DraggableHook => {
  const [items, setItems] = useState(initialItems);


  const handleDragStart = useCallback((id: string, index: number) => {
    if(draggedItem.id !== ""){
      return
    }


    console.log("drag start")
    console.log(id);

    setDraggedItem({ id, index});
  }, [draggedItem.index, draggedItem.id]);

  const handleDragEnd = useCallback(() => {

    setDraggedItem({ id: '', index: 0, isParrent: false });
  }, []);

  const handleEnter = useCallback((overIndex: number) => {
    console.log("overIndex");
    console.log(overIndex);
    
    
    if (draggedItem.index === null || draggedItem.id === null) return;
    // Update the order of items
    const updatedItems = [...items];
    const [dragged] = updatedItems.splice(draggedItem.index, 1);
    updatedItems.splice(overIndex, 0, dragged);

    setItems(updatedItems);
  }, [draggedItem.index, draggedItem.id]);

  return {
    setDraggedItem,
    handleDragStart,
    handleDragEnd,
    handleEnter,
    items,
    draggedItem,
    //isParrent
  };
};

export default useDraggable;