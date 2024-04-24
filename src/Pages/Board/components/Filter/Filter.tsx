import { ChevronsUpDown, ListFilter } from "lucide-react";

import { Button } from "src/Components/ui/button";
import { Input } from "src/Components/ui/input";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "src/Components/dropdown";
import { BoardContext } from "../../contexts/BoardContextProvider";

export const FilterComponent = ({
    filterCompleted,
    setFilterCompleted,
    filterDeadline,
    setFilterDeadline,
}: {
    filterCompleted: boolean | null;
    filterDeadline: number | null;
    setFilterCompleted: Dispatch<SetStateAction<boolean | null>>;
    setFilterDeadline: Dispatch<SetStateAction<number | null>>;
}) => {
    const handleClearFilter = () => {
        setFilterCompleted(null);
        setFilterDeadline(null);
    };

    return (
        <div className="flex flex-col w-full gap-4 px-8 py-4 text-white items-left md:flex-row md:items-center">
            <Button variant="secondary" size="icon" onClick={handleClearFilter}>
                <ListFilter />
            </Button>

            <div className="flex flex-col w-80">
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full px-4 text-left text-gray-500 rounded-md font-se bg-slate-200">
                        <div className="flex flex-row items-center justify-between w-full text-left">
                            {filterCompleted !== null ? (
                                filterCompleted === true ? (
                                    <Button
                                        className="font-semibold text-left text-black w-max"
                                        variant="transparent"
                                    >
                                        Completed
                                    </Button>
                                ) : (
                                    <Button
                                        className="font-semibold text-left text-black w-max"
                                        variant="transparent"
                                    >
                                        Non completed
                                    </Button>
                                )
                            ) : (
                                <Button
                                    className="font-semibold text-left text-gray-500 w-max"
                                    variant="transparent"
                                >
                                    Filter by completed
                                </Button>
                            )}
                            <ChevronsUpDown strokeWidth={1} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-0 font-semibold w-80">
                        <DropdownMenuItem
                            onClick={() => setFilterCompleted(true)}
                        >
                            Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setFilterCompleted(false)}
                        >
                            Non completed
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex flex-col w-56">
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full px-4 text-left text-gray-500 rounded-md bg-slate-200">
                        <div className="flex flex-row items-center justify-between w-full text-left">
                            {filterDeadline ? (
                                <Button
                                    className="font-semibold text-left text-black w-max"
                                    variant="transparent"
                                >
                                    {filterDeadline === 1 ? "24 hours" : `${filterDeadline} days`}
                                </Button>
                            ) : (
                                <Button
                                    className="font-semibold text-left text-gray-500 w-max"
                                    variant="transparent"
                                >
                                    Filter by deadline
                                </Button>
                            )}
                            <ChevronsUpDown strokeWidth={1} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-0 font -semibold">
                        <DropdownMenuItem onClick={() => setFilterDeadline(1)}>
                            24 hours
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterDeadline(7)}>
                            7 days
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
