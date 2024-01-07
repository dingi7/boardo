import { useState } from 'react';

import {
    Activity,
    Lightbulb,
    Layout,
    Settings,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';

export const Organisation = ({
    orgName,
    orgLogo,
    orgId,
    onClick,
    selectedOrganisation,
}: {
    orgName: string;
    orgLogo: string;
    orgId: string;
    onClick: () => void;
    selectedOrganisation: string;
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => {
                if (selectedOrganisation === orgId) return;
                onClick();
            }}
            className='mb-3'
        >
            <h1 className='flex flex-row justify-between font-medium gap-[4%]'>
                <div className='bg-gradient-to-r from-purple-500 to-indigo-600 p-[3%] rounded min-content'>
                    <img
                        src={orgLogo}
                        // alt="organization logo"
                    />
                </div>
                <div
                    className='flex flex-row gap-[5%] w-full justify-between' 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {orgName} {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </h1>

            {isOpen && (
                <ul className='mt-[2%] ml-[4%] flex flex-col'>
                    <li className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'>
                        <Layout /> Boards
                    </li>
                    <li className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'>
                        <Lightbulb /> Brainstorming
                    </li>
                    <li className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'>
                        <Activity /> Activity
                    </li>
                    <li className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'>
                        <Settings /> Settings
                    </li>
                </ul>
            )}
        </div>
    );
};
