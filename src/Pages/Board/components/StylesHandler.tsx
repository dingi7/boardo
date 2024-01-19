import { Paintbrush } from "lucide-react";
import { useState } from "react";

import { DropdownMenuItem } from "src/Components/dropdown";

export const StylesHandler = ({showStylesDialog}: {showStylesDialog: any}): JSX.Element => {
    return (
        <>
        <DropdownMenuItem
            onSelect={showStylesDialog}
            className="cursor-pointer"
            onClick={showStylesDialog}
        >
            <Paintbrush className="mr-2 h-4 w-4" />
            <span>Change style</span>
        </DropdownMenuItem>
        </>
    );
};
