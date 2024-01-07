import { useCallback, useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Building2, Plus, User2 } from 'lucide-react';

import { Organisation } from './components/Organisation';
import {
    getAllOrganizations,
    getBoardsByOrgId,
    getUserOrganizations,
} from '../../api/requests';
import { errorNotification } from '../../util/notificationHandler';
import { dataBaseBoard } from '../../Interfaces/IDatabase';

//modals
import { AddWorkspaceModal } from './components/AddWorkspaceModal';
import { AddBoard } from './components/AddBoard';
import { Link } from 'react-router-dom';
import { Loading } from '../Board/_components/loading';

import { Navbar } from '../../Components/navbar';

// Define interfaces at the start or in a separate file
interface IOrg {
    name: string;
    _id: string;
    orgLogo: string;
}

interface IOrgLean {
    name: string;
    _id: string;
}

export const Dashboard = () => {
    const auth = useAuthUser();
    const user = auth()!;

    //modals states
    const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] =
        useState<boolean>(false);

    const [allOrganizations, setAllOrganizations] = useState<IOrgLean[]>([]);
    const [userOrganizations, setUserOrganizations] = useState<IOrg[]>([]);
    const [selectedOrganisation, setSelectedOrganisation] =
        useState<IOrg | null>(null);
    const [boards, setBoards] = useState<dataBaseBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBoards = useCallback(async (orgId: string) => {
        try {
            const data = await getBoardsByOrgId(orgId);
            setBoards(data.boards || []);
        } catch (err: any) {
            errorNotification(err);
        }
    }, []);

    const fetchAllOrganizations = useCallback(async () => {
        setAllOrganizations(await getAllOrganizations());
    }, []);

    const fetchOrganizations = useCallback(async () => {
        try {
            const organizations = await getUserOrganizations();
            if (organizations.length > 0) {
                setUserOrganizations(organizations);
                setSelectedOrganisation(organizations[0]);
                await fetchBoards(organizations[0]._id);
            } else {
                setSelectedOrganisation(null);
            }
        } catch (err: any) {
            errorNotification(err);
        } finally {
            setLoading(false);
        }
    }, [fetchBoards]);

    useEffect(() => {
        if (!user) return;
        fetchAllOrganizations();
        fetchOrganizations();
    }, [user, fetchOrganizations]);

    // Constants for hardcoded values
    const imgUrl =
        'https://thumbs.dreamstime.com/b/aerial-view-lago-antorno-dolomites-lake-mountain-landscape-alps-peak-misurina-cortina-di-ampezzo-italy-reflected-103752677.jpg';
    const imgUrl2 = `https://media.istockphoto.com/id/1299226889/photo/large-blue-cresting-wave-standing-tall-in-the-open-ocean-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=d5-IejmHf3Y0DaJtF_f0cJizpykEGpCxCz9T2KQpWhA=`;

    return !loading ? (
        <div className={`h-screen duration-500 ease-in-out`}>
            <Navbar />
            <div
                className={`h-screen mt-0 flex flex-row gap-[5%] duration-500 ease-in-out`}
            >
                <div className='w-[30%] ml-[2%] h-[90%] mt-auto border-r-2 pt-[5%] md:w-[25%] lg:w-[20%] md:pt-[2%] xl:pt-[1%] 2xl:pt-0'>
                    <div className='pl-[2%] pt-[3%] select-none'>
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
                                <Organisation
                                    key={org._id}
                                    orgName={org.name}
                                    orgId={org._id}
                                    orgLogo={'test'}
                                    onClick={() => {
                                        setSelectedOrganisation(org);
                                        fetchBoards(org._id);
                                    }}
                                    selectedOrganisation={
                                        selectedOrganisation!._id
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-[60%] p-[1%] pt-[20%] sm:pt-[15%] md:pt-[10%] xl:pt-[5%]'>
                    {selectedOrganisation !== null ? (
                        <>
                            <div className='flex flex-row gap-[2%]'>
                                <div className='p-[2%] w-[8%] bg-gradient-to-r from-purple-500 to-indigo-600 text-black flex justify-center rounded'>
                                    <Building2 color='white' />
                                </div>
                                <p className='font-extrabold text-2xl'>
                                    {selectedOrganisation.name || 'Loading...'}
                                </p>
                            </div>

                            <div className='mt-[4%] w-full'>
                                <h1 className='flex flex-row gap-[1%] font-medium text-xl'>
                                    <User2 size={30} /> Your boards
                                </h1>
                                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-[2%]'>
                                    {boards.map((board) => (
                                        <Link
                                            to={`/board/${board._id}`}
                                            key={board._id}
                                            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
                                            style={{
                                                backgroundImage: `url(${board.backgroundUrl})`,
                                            }}
                                        >
                                            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
                                            <p className='relative font-semibold text-white'>
                                                {board.name}
                                            </p>
                                        </Link>
                                    ))}
                                    <AddBoard remainingBoards={5-boards.length} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col justify-center items-center h-full'>
                            <h1 className='font-bold text-2xl'>
                                You don't have any workspaces yet.
                            </h1>
                            <button
                                className='mt-[2%] bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md p-[2%] hover:cursor-pointer'
                                onClick={() => setIsAddWorkspaceModalOpen(true)}
                            >
                                Create your first one!
                            </button>
                        </div>
                    )}
                </div>

                {/* {isAddWorkspaceModalOpen && (
                    <div className=" duration-500 ease-in-out">
                        <div className="background-animate absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-purple-500  duration-500 ease-in-out to-transparent animate-gradient"></div>
                        <div className="background-animate absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-indigo-500 duration-500 ease-in-out  to-transparent animate-gradient"></div>
                    </div>
                )} */}
            </div>

            {isAddWorkspaceModalOpen && (
                <AddWorkspaceModal
                    allOrganizations={allOrganizations}
                    fetchAllOrganizations={fetchAllOrganizations}
                    closeModal={() => setIsAddWorkspaceModalOpen(false)}
                    setUserOrganizations={setUserOrganizations}
                />
            )}
        </div>
    ) : (
        // Display loading indicator here
        <Loading />
    );
};
