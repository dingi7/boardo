import { Plus } from "lucide-react";
import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContextProvider";
import { createList } from "../../../../api/requests";

export const AddListPlaceholder = ({
  isDragging,
}: {
  isDragging: boolean;
}): JSX.Element => {
  const context = useContext(BoardContext);

  const { boardId } = context!;

  const createListFunc = async () => {
    await createList(boardId!, "New List");
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
