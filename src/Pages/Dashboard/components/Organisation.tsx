//import angleUp from "../assets/angleUp.svg"
//import angleDown from "../assets/angleDown.svg"
import { useState } from "react";

import { Activity, Lightbulb, Layout, Settings, Building2, ChevronUp, ChevronDown } from "lucide-react";


export const Organisation  = ({ orgName, orgLogo, orgId }: { orgName: string; orgLogo: string; orgId: string }): JSX.Element => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div >
            <h1
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row gap-[8%] font-medium"
            >
                <div
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 p-[3%] rounded"
                >
                    <img src={orgLogo}/>
                </div>
                <div className="flex flex-row gap-[5%] w-full">
                    {orgName} {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
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