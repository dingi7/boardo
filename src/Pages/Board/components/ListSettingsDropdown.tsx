import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/Components/dropdown";
// import { StylesHandler } from './StylesHandler';
import { DeleteHandler } from "./DeleteHandler";
import { BoardContext } from "../contexts/BoardContextProvider";
import { useContext } from "react";

export const ListSettingsDropdownMenu = ({
    listId,
    setBackgroundColor,
}: {
    listId: string;
    setBackgroundColor: (color: string) => void;
}) => {
    const context = useContext(BoardContext);
    const { setLists } = context!;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="p-[2%] flex items-center h-8 w-8 hover:bg-slate-200 cursor-pointer rounded-md" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>List Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DeleteHandler
                            itemId={listId}
                            option="list"
                            setLists={setLists}
                        />
                        {/* <StylesHandler
                            setBackgroundColor={setBackgroundColor}
                        /> */}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
