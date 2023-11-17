import { List } from './List/List';
import { IBoardProps } from '../../Interfaces/IBoard';
import { BoardHeader } from './Header/BoardHeader';
import { BoardSidebar } from './Sidebar/BoardSidebar';
import { useEffect, useState } from 'react';

import useDraggable from '../../hooks/useDragable';

export const Board = (): JSX.Element => {

	const [draggedItem, setDraggedItem] = useState({ id: "", index: 0, isParrent: false });

	const Lists = [
		{
			key: '123',
			id: '123',
			name: "Test",
			initialItems:
				[
					{ id: "1", name: "test" },
					{ id: "2", name: "test test" },
					{ id: "3", name: "test test test" },
				]

		},
		{
			key: '22',
			id: '22',
			name: "Test1",
			initialItems:
				[
					{ id: "4", name: "test" },
				]

		},
		{
			key: '13323',
			id: '13323',
			name: "Test2",
			initialItems:
				[
					{ id: "5", name: "test" },
				]

		}
	];


	const { handleDragStart, handleDragEnd, handleEnter, items } = useDraggable(Lists || [], draggedItem, setDraggedItem);

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
							className={`cursor-move ease-in h-fit after: ${(draggedItem.id === `${list.id}`) ? 'opacity-60 translate-x-0 translate-y-0 ' : 'disabled'}`}
							onDragStart={() => handleDragStart(list.id, index)}
							onDragEnter={() => handleEnter(index)}
							onDragEnd={handleDragEnd}
						>
							<List
								id={list.id}
								name={list.name}
								initialItems={list.initialItems}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
