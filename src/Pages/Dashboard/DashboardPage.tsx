import { useContext, useState } from 'react';
import { Plus } from 'lucide-react';

import { Organization } from './components/Organization';

import { AddWorkspaceModal } from './modals/AddWorkspaceModal';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loading } from '../../Components/loading';

import { Navbar } from '../../Components/navbar';
import { DashboardContext } from './contexts/DashboardContextProvider';

export const Dashboard = () => {
    const navigate = useNavigate();
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('Dashboard context is not available');
    }
    const {
        allOrganizations,
        setAllOrganizations,
        selectedOrganization,
        setSelectedOrganization,
        boards,
        loading,
        fetchBoards,
        userOrganizations,
        fetchAllOrganizations,
        setUserOrganizations,
        expandedOrganizationId,
        setExpandedOrganizationId,
    } = context;

    const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] =
        useState<boolean>(false);
    return !loading ? (
        <div className={`h-screen duration-500 ease-in-out`}>
            <Navbar />
            <div
                className={`h-screen mt-0 flex flex-row gap-[5%] duration-500 ease-in-out`}
            >
                <div className='w-[30%] ml-[2%] h-[90%] mt-auto border-r-2 pt-[5%] md:w-[25%] lg:w-[20%] md:pt-[2%] xl:pt-[1%] 2xl:pt-0'>
                    <div className='text-sm md:text-base lg:text-text-lg pl-[2%] pt-[3%] pr-[5%] select-none'>
                        <h1 className='w-[95%] flex flex-row justify-between font-bold'>
                            Workspaces{' '}
                            <Plus
                                fill='black'
                                className='hover:cursor-pointer'
                                onClick={() => setIsAddWorkspaceModalOpen(true)}
                            />
                        </h1>
                        <div className='mt-[4%] hover:cursor-pointer'>
                            {userOrganizations.length === 0 && (
                                <p className='text-gray-500'>
                                    You don't have any workspaces yet. Create
                                    your first one!
                                </p>
                            )}
                            {userOrganizations.map((org) => (
                                <Organization
                                    key={org._id}
                                    orgName={org.name}
                                    orgId={org._id}
                                    expandedOrganizationId={
                                        expandedOrganizationId
                                    }
                                    setExpandedOrganizationId={
                                        setExpandedOrganizationId
                                    }
                                    onClick={() => {
                                        setSelectedOrganization(org);
                                        fetchBoards(org._id);
                                    }}
                                    selectedOrganization={selectedOrganization!}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-[60%] p-[1%] pt-[20%] sm:pt-[15%] md:pt-[10%] xl:pt-[5%]'>
                    {selectedOrganization !== null ? null : (
                        <div className='flex flex-col justify-center items-center h-full'>
                            <h1 className='font-bold text-2xl'>
                                You don't have any workspaces yet.
                            </h1>
                            <button
                                className='mt-[2%] bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md p-[2%] hover:cursor-pointer'
                                onClick={() => {
                                    setIsAddWorkspaceModalOpen(true);
                                    navigate('/dashboard/boards');
                                }}
                            >
                                Create your first one!
                            </button>
                        </div>
                    )}
                    <Outlet context={{ selectedOrganization, boards }} />
                </div>
            </div>

            {isAddWorkspaceModalOpen && (
                <AddWorkspaceModal
                    allOrganizations={allOrganizations!}
                    fetchAllOrganizations={fetchAllOrganizations}
                    closeModal={() => setIsAddWorkspaceModalOpen(false)}
                    setUserOrganizations={setUserOrganizations}
                    setSelectedOrganization={setSelectedOrganization}
                />
            )}
        </div>
    ) : (
        <Loading />
    );
};
