import { useCallback, useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { Building2, HelpCircle, Plus, User2 } from 'lucide-react';

import { Board } from './components/BoardPlaceholder';
import { CreatePlaceholder } from './components/CreatePlaceholder';
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
import { AddBoardModal } from './components/AddBoardModal';
import { Link } from 'react-router-dom';
import { Loading } from '../Board/_components/loading';
import { Navbar } from '../../Components/navbar';
import { FormPopover } from './formPopover/form-popover';

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
    const [isAddBoardModalOpen, setisAddBoardModalOpen] =
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
                className={`h-screen mt-0 flex flex-row gap-[5%] duration-500 ease-in-out ${
                    isAddBoardModalOpen || isAddWorkspaceModalOpen ? 'blur' : ''
                }`}
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
                                    <User2 size={35} /> Your boards
                                </h1>
                                <div className='w-[95%] h-full mt-[1%] flex flex-row flex-wrap gap-[5%]'>
                                    {boards.map((board) => (
                                        <Link
                                            to={`/board/${board._id}`}
                                            key={board._id}
                                            className='w-[30%]'
                                        >
                                            <Board
                                                name={board.name}
                                                img={
                                                    board.backgroundUrl ||
                                                    imgUrl
                                                }
                                            />
                                        </Link>
                                    ))}
                                    {/* <CreatePlaceholder
                                        openModal={() =>
                                            setisAddBoardModalOpen(true)
                                        }
                                    /> */}
                                
                                    <FormPopover sideOffset={10} side='right'>
                                        <div
                                            role='button'
                                            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
                                        >
                                            <p className='text-sm'>
                                                Create new board
                                            </p>
                                            <span className='text-xs'>
                                                {`3 remaining`}
                                            </span>
                                            {/* <Hint
                                                sideOffset={40}
                                                description={`
                                                Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
                                                `} */}
                                            {/* > */}
                                            <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
                                            {/* </Hint> */}
                                        </div>
                                    </FormPopover>
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
            {isAddBoardModalOpen && (
                <AddBoardModal
                    orgId={selectedOrganisation!._id}
                    closeModal={() => setisAddBoardModalOpen(false)}
                    setBoards={setBoards}
                />
            )}
        </div>
    ) : (
        // Display loading indicator here
        <Loading />
    );
};
