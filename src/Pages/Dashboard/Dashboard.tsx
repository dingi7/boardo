import { useCallback, useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Building2, Plus, User2 } from 'lucide-react';

import { Board } from './components/BoardPlaceholder';
import { CreatePlaceholder } from './components/CreatePlaceholder';
import { Organisation } from './components/Organisation';
import { getBoardsByOrgId, getUserOrganizations } from '../../api/requests';
import { errorNotification } from '../../util/notificationHandler';
import { dataBaseBoard } from '../../Interfaces/IDatabase';

//modals
import { AddWorkspaceModal } from './components/AddWorkspaceModal';
import { AddBoardModal } from './components/AddBoardModal';
import { Link } from 'react-router-dom';

// Define interfaces at the start or in a separate file
interface IOrg {
    name: string;
    _id: string;
    orgLogo: string;
}

export const Dashboard = () => {
    const auth = useAuthUser();
    const user = auth()!;

    //modals states
    const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] =
        useState<boolean>(false);
    const [isAddBoardModalOpen, setisAddBoardModalOpen] =
        useState<boolean>(false);

    const [organizations, setOrganizations] = useState<IOrg[]>([]);
    const [selectedOrganisation, setSelectedOrganisation] =
        useState<IOrg | null>(null);
    const [boards, setBoards] = useState<dataBaseBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchBoards = useCallback(async (orgId: string) => {
        try {
            const data = await getBoardsByOrgId(orgId);
            setBoards(data.boards);
        } catch (err: any) {
            errorNotification(err);
        }
    }, []);

    const fetchOrganizations = useCallback(async () => {
        try {
            const organizations = await getUserOrganizations();
            if (organizations.length > 0) {
                setOrganizations(organizations);
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
        fetchOrganizations();
    }, [user, fetchOrganizations]);

    // Constants for hardcoded values
    const imgUrl =
        'https://thumbs.dreamstime.com/b/aerial-view-lago-antorno-dolomites-lake-mountain-landscape-alps-peak-misurina-cortina-di-ampezzo-italy-reflected-103752677.jpg';
    const imgUrl2 = `https://media.istockphoto.com/id/1299226889/photo/large-blue-cresting-wave-standing-tall-in-the-open-ocean-on-a-sunny-day.jpg?s=612x612&w=0&k=20&c=d5-IejmHf3Y0DaJtF_f0cJizpykEGpCxCz9T2KQpWhA=`;

    return !loading ? (
        <div className={`h-screen duration-500 ease-in-out`}>
            <div
                className={`h-screen mt-0 flex flex-row gap-[5%] duration-500 ease-in-out ${
                    isAddBoardModalOpen || isAddWorkspaceModalOpen ? 'blur' : ''
                }`}
            >
                <div className=' w-[20%] ml-[2%] h-[90%]'>
                    <div className='pl-[5%] pt-[3%]'>
                        <h1 className='flex flex-row gap-[55%] font-bold'>
                            Workspaces{' '}
                            <Plus
                                fill='black'
                                className='hover:cursor-pointer'
                                onClick={() => setIsAddWorkspaceModalOpen(true)}
                            />
                        </h1>
                        <div className='mt-[4%] hover:cursor-pointer'>
                            {organizations.map((org) => (
                                <Organisation
                                    key={org._id}
                                    orgName={org.name}
                                    orgId={org._id}
                                    orgLogo={'test'}
                                    onClick={() => {
                                        setSelectedOrganisation(org);
                                        fetchBoards(org._id);
                                    }}
                                    selectedOrganisation={selectedOrganisation!._id}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='w-[60%] p-[1%]'>
                    <div className='flex flex-row gap-[2%]'>
                        <div className='p-[2%] w-[8%] bg-gradient-to-r from-purple-500 to-indigo-600 text-black flex justify-center rounded'>
                            <Building2 color='white' />
                        </div>
                        <p className='font-extrabold text-2xl'>
                            {selectedOrganisation?.name || 'Loading...'}
                        </p>
                    </div>

                    <div className='mt-[4%] w-full'>
                        <h1 className='flex flex-row gap-[1%] font-medium text-xl'>
                            <User2 size={35} /> Your boards
                        </h1>
                        <div className='w-[95%] h-full mt-[1%] flex flex-row flex-wrap gap-[5%]'>
                            {boards.map((board) => (
                                <Link
                                    to={`/board/${board._id}`}
                                    key={board._id}
                                >
                                    <Board
                                        name={board.name}
                                        img={board.backgroundUrl || imgUrl}
                                    />
                                </Link>
                            ))}
                            <CreatePlaceholder
                                openModal={() => setisAddBoardModalOpen(true)}
                            />
                        </div>
                    </div>
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
                    closeModal={() => setIsAddWorkspaceModalOpen(false)}
                />
            )}
            {isAddBoardModalOpen && (
                <AddBoardModal
                    orgId={selectedOrganisation!._id}
                    closeModal={() => setisAddBoardModalOpen(false)}
                />
            )}
        </div>
    ) : (
        // Display loading indicator here
        <div className='loading-indicator'>Loading...</div>
    );
};
