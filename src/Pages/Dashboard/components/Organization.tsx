import { useState } from 'react';

import {
    Activity,
    Layout,
    Settings,
    ChevronUp,
    ChevronDown,
    Building2,
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { IOrg } from '../contexts/DashboardContextProvider';

export const Organization = ({
    orgName,
    expandedOrganizationId,
    setExpandedOrganizationId,
    orgId,
    onClick,
    selectedOrganization,
}: {
    orgName: string;
    expandedOrganizationId: string;
    setExpandedOrganizationId: (id: string) => void;
    orgId: string;
    onClick: () => void;
    selectedOrganization: IOrg;
}): JSX.Element => {
    const navigate = useNavigate();
    const auth = useAuthUser()();
    
    return (
        <div
            onClick={() => {
                if (selectedOrganization._id === orgId) return;
                setExpandedOrganizationId('');
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
                    {expandedOrganizationId === orgId ? (
                        <ChevronUp
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setExpandedOrganizationId('');
                            }}
                        />
                    ) : (
                        <ChevronDown
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setExpandedOrganizationId(orgId);
                            }}
                        />
                    )}
                </div>
            </h1>

            {expandedOrganizationId === orgId && (
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
                    <li
                        className='flex flex-row gap-[5%] p-[4%] hover:bg-teal-100 hover:text-teal-700 rounded'
                        onClick={() => navigate('/dashboard/settings')}
                    >
                        <Settings className='w-[30%] md:w-[10%] h-full' />{' '}
                        Settings
                    </li>
                </ul>
            )}
        </div>
    );
};
