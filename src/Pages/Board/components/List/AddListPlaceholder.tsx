import { Plus } from "lucide-react";
import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContextProvider";
import { createList } from "../../../../api/requests";

export const AddListPlaceholder = ({
  isDragging,
  socket,
}: {
  isDragging: boolean;
  socket: any;
}): JSX.Element => {
  const context = useContext(BoardContext);

  const { boardId, setLists } = context!;

  const createListFunc = async () => {
    const newList = await createList(boardId!, "New List");
    socket.emit("create-list", newList, boardId!);
    setLists((prev) => {
      if (!Array.isArray(prev)) return [newList];
      return [...prev, newList];
    });
  };

  return (
    <div
      className={`on:hover: inline-flex h-[10%] cursor-pointer flex-col items-start gap-[10px] ${isDragging ? "opacity-0" : "opacity-100"}`}
      key={"add list"}
      onClick={() => createListFunc()}
    >
      <div className=" rounded-[7px] bg-slate-200 shadow-lg ">
        <div className="p-5">
          <div className="inline-flex flex-col items-start gap-[5px] ">
            <div className="relative inline-flex min-w-[200px] flex-[0_0_auto] flex-row items-start gap-[13px] ">
              {" "}
              <Plus />
              Add list
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
