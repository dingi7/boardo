//import angleUp from "../assets/angleUp.svg"
//import angleDown from "../assets/angleDown.svg"
import { useState } from "react";

import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";

import { Activity } from "lucide-react";
import { Layout } from "lucide-react";
import { Settings } from "lucide-react";
import { Lightbulb } from "lucide-react";
export const Organistaion = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div >
            <h1 
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row gap-[5%] font-medium"
            >
                Org 1 {isOpen ? <ChevronUp /> : <ChevronDown />}
            </h1>


            {isOpen &&
                <ul className="mt-[2%] ml-[4%] flex flex-col">
                    <li className="flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded"><Layout /> Boards</li>
                    <li className="flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded"><Lightbulb /> Brainstorming</li>
                    <li className="flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded"><Activity /> Activity</li>
                    <li className="flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded"><Settings /> Settings</li>
                </ul>
            }
        </div>
    )
}