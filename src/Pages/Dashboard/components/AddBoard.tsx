import { HelpCircle } from "lucide-react";
import { FormPopover } from "../../../Components/form/form-popover";
import { Hint } from "../../../Components/hint";
import { useEffect, useState } from "react";

export const AddBoard = ({ remainingBoards }: { remainingBoards: number }) => {
    const [monitorWidth, setMonitorWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setMonitorWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    let side: "top" | "left" | "right" | "bottom" = "top";
    let align: "center" | "end" | "start" | undefined = "center";
    let sideOffset = 0;

    if (remainingBoards % 3 === 0) {
        console.log('here');
        
        if (monitorWidth < 500) {
            side = "top";
            align = "center";
            sideOffset = -50;
        } else if (monitorWidth < 640) {
            sideOffset = -20;
            side = "top";
            align = "center";
        } 
        else if (monitorWidth < 1024) {
            sideOffset = 100;
            side = "left";
            align = "end";
        } 
        else if (monitorWidth < 1500) {
            side = "left";
            align = "end";
            sideOffset = 100;
        } else if (monitorWidth < 2200) {
            sideOffset = 10;
            side = "left";
            align = "end";
        }
    } else {
        if (monitorWidth < 500) {
            side = "left";
            align = "end";
            sideOffset = 50;
        } else if (monitorWidth < 1024) {
            side = "left";
            align = "center";
            sideOffset = 50;
        }
        else if (monitorWidth < 1500) {
            side = "bottom";
            align = "start";
            sideOffset = 100;
        } else if (monitorWidth < 2200) {
            side = "left";
            align = "end";
            sideOffset = 100;
        }

   
        
    }

    return (
        <FormPopover sideOffset={sideOffset} side={side} align={align}>
            <div
                role="button"
                className=" bg-slate-200 aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            >
                <p className="text-sm">Create new board</p>
                <span className="text-xs">{`${remainingBoards} remaining`}</span>
                <Hint
                    sideOffset={40}
                    description={`
                Workspaces can have up to 5 open boards.
              `}
                >
                    <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                </Hint>
            </div>
        </FormPopover>
    );
};
