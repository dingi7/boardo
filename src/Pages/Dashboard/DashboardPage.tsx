import { useContext, useState } from 'react';
import { Plus } from 'lucide-react';

import { Organization } from './components/Organization';

import { Outlet, useNavigate } from 'react-router-dom';

import { DashboardContext } from './contexts/DashboardContextProvider';
import { CreateOrganizationDialog } from './modals/CreateOrganizationDialog';
import { DashboardSkeleton } from './skeletons/DashboardSkeleton';
//import { ai } from 'src/util/ai';

export const Dashboard = () => {
    //ai();
    const navigate = useNavigate();
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('Dashboard context is not available');
    }
    const {
        allOrganizations,
        selectedOrganization,
        setSelectedOrganization,
        loading,
        userOrganizations,
        fetchAllOrganizations,
        setUserOrganizations,
        expandedOrganizationId,
        setExpandedOrganizationId,
        handleCreateWorkspace,
    } = context;
    const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] =
        useState<boolean>(false);
    return !loading ? (
        <>
            <div
                className={`flex-1 mt-0 flex flex-row gap-[5%] duration-500 ease-in-out ${
                    isAddWorkspaceModalOpen && 'blur'
                }`}
            >
                <div className='w-[30%] ml-[2%] border-r-2 pt-[8%] md:w-[25%] lg:w-[20%] md:pt-[2%] xl:pt-[1%] 2xl:pt-0'>
                    <div className='text-sm md:text-base lg:text-text-lg pl-[2%] pt-[8%] pr-[5%] select-none'>
                        <h1 className='w-[95%] flex flex-row justify-between font-bold'>
                            Workspaces{' '}
                            <Plus
                                fill='black'
                                className='hover:cursor-pointer'
                                onClick={() => setIsAddWorkspaceModalOpen(true)}
                            />
                        </h1>
                        <div className='mt-[4%] hover:cursor-pointer'>
                            {userOrganizations?.length === 0 && (
                                <p className='text-gray-500'>
                                    You don't have any workspaces yet. Create
                                    your first one!
                                </p>
                            )}
                            {userOrganizations?.map((org) => (
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
                                    }}
                                    selectedOrganization={selectedOrganization}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-[60%] p-[1%] pt-[20%] sm:pt-[15%] md:pt-[10%] xl:pt-[5%]'>
                    {userOrganizations.length !== 0 ? null : (
                        <div className='flex flex-col items-center justify-center h-full'>
                            <h1 className='text-2xl font-bold'>
                                You don't have any workspaces yet.
                            </h1>
                            <button
                                className='mt-[2%] bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md p-[2%] hover:cursor-pointer font-semibold hover:opacity-90 ease-in-out duration-300'
                                onClick={() => {
                                    setIsAddWorkspaceModalOpen(true);
                                    navigate('/dashboard/boards');
                                }}
                            >
                                Create your first one!
                            </button>
                        </div>
                    )}
                    <Outlet />
                </div>
            </div>
            {isAddWorkspaceModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center'>
                    <CreateOrganizationDialog
                        allOrganizations={allOrganizations!}
                        fetchAllOrganizations={fetchAllOrganizations}
                        closeModal={() => setIsAddWorkspaceModalOpen(false)}
                        setUserOrganizations={setUserOrganizations}
                        handleCreateWorkspace={handleCreateWorkspace}
                    ></CreateOrganizationDialog>
                </div>
            )}
        </>
    ) : (
        // <Loading />
        <DashboardSkeleton />
    );
};
