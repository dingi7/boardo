

import { BoardPlaceholder } from "./components/BoardPlaceholder";


import { CreatePlaceholder } from "./components/CreatePlaceholder";
import { Organistaion } from "./components/Organisation";

import { Plus } from "lucide-react";
import { User2 } from "lucide-react";

export const Dashboard = () => {


    return (
        <div className="h-screen mt-0 pt-[2%] select-none flex flex-row gap-[5%]">
            <div
                className=" w-[20%] ml-[2%] h-[90%]"
            >
                <div className="pl-[5%] pt-[3%]">
                    <h1 className="flex flex-row gap-[55%] font-bold">Workspaces <Plus /></h1>
                    <div
                        className="mt-[4%]"
                    >
                        <Organistaion />
                    </div>
                </div>
            </div>

            <div className="w-[60%] p-[1%]">
                <div
                    className="flex flex-row gap-[2%]"
                >
                    <div
                        className="p-[2%] w-[8%] bg-gray-500 text-black flex justify-center rounded"
                    >
                        Pic
                    </div>
                    <p className="font-extrabold text-2xl">Org name</p>
                </div>

                <div
                    className="mt-[4%] w-full"
                >
                    <h1 className="flex flex-row gap-[1%] font-medium text-xl"><User2 size={35}/> Your boards</h1>
                    <div
                        className="mt-[1%] flex flex-row flex-wrap gap-[5%]"
                    >
                        <BoardPlaceholder />
                        <BoardPlaceholder />
                        <BoardPlaceholder />
                        <BoardPlaceholder />

                        <CreatePlaceholder />
                    </div>
                </div>
            </div>
        </div>
    );
};
