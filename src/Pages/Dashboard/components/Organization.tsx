import { useState } from 'react';

import {
    Activity,
    Lightbulb,
    Layout,
    Settings,
    ChevronUp,
    ChevronDown,
    Building2,
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

export const Organization = ({
    orgName,
    orgLogo,
    orgId,
    onClick,
    selectedOrganization,
}: {
    orgName: string;
    orgLogo: string;
    orgId: string;
    onClick: () => void;
    selectedOrganization: any;
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useAuthUser()();
    return (
        <div
            onClick={() => {
                if (selectedOrganization.id === orgId) return;
                onClick();
            }}
            className='mb-3 pr-[4%]'
        >
            <h1 className='text-xs md:text-base lg:text-text-lg w-full flex flex-row justify-between font-medium gap-[4%]'>
                <div className='bg-gradient-to-r from-purple-500 to-indigo-600 p-[3%] rounded min-height'>
                    <Building2 color='white'></Building2>
                </div>
                <div className='flex flex-row gap-[5%] w-full justify-between'>
                    {orgName}{' '}
                    {isOpen ? (
                        <ChevronUp
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                        />
                    ) : (
                        <ChevronDown
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                        />
                    )}
                </div>
            </h1>

            {isOpen && (
                <ul className='mt-[2%] ml-[4%] flex flex-col'>
                    <li
                        className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'
                        onClick={() => navigate('/dashboard/boards')}
                    >
                        <Layout className='w-[30%] md:w-[10%] h-full' /> Boards
                    </li>
                    {/* <li className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'>
                        <Lightbulb className="w-[40%] md:w-[10%] h-full"/> Brainstorming
                    </li> */}
                    <li className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'>
                        <Activity className='w-[30%] md:w-[10%] h-full' />{' '}
                        Activity
                    </li>
                    {auth && auth._id === selectedOrganization.owner ? (
                        <li
                            className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'
                            onClick={() => navigate('/dashboard/settings')}
                        >
                            <Settings className='w-[30%] md:w-[10%] h-full' />{' '}
                            Settings
                        </li>
                    ) : null}
                </ul>
            )}
        </div>
    );
};
