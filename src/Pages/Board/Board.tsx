import { List } from './List/List';
import { IBoardProps } from '../../Interfaces/IBoard';
import { BoardHeader } from './Header/BoardHeader';
import { BoardSidebar } from './Sidebar/BoardSidebar';

import useDraggable from '../../hooks/useDragable';

export const Board = (): JSX.Element => {
	const Lists = [
		<List key={'123'} id={'123'} name="Test" />,
		<List key={'22'} id={'22'} name="Test1" />,
		<List key={'13323'} id={'13323'} name="Test2" />,
	];

	const { handleDragStart, handleDragEnd, handleDrop, draggedItem, items } = useDraggable(Lists);

	const { boardName, boardId }: IBoardProps = {
		boardName: 'test',
		boardId: 'test',
	};

	return (
		<div className="bg-[#172b4d] flex flex-row justify-center w-full overflow-y-auto">
			<div className="flex flex-row bg-[#172b4d] overflow-hidden w-full h-screen relative">
				<BoardSidebar />
				<BoardHeader boardName={boardName} boardId={boardId} />
				<div className="flex flex-row mt-[4%] p-[1%] gap-[2%] w-full overflow-auto">
					{items.map((list, index) => (
						 <div
						 key={list.key}
						 draggable
						 className={`cursor-move ease-in duration-3000 ${draggedItem.id === list.props.id ? 'opacity-20 translate-x-0 translate-y-0 after:pointer-events-none' : 'bg-transparent'}`}
						 onMouseDown={() => handleDragStart(list.props.id, index)}
						 onDragEnter={() => handleDrop(index)}
						 onDragEnd={handleDragEnd}
					   >
						 {list}
					   </div>
					))}
				</div>
			</div>
		</div>
	);
};
