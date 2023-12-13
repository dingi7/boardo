import { BoardPlaceholder } from './components/BoardPlaceholder';

import { CreatePlaceholder } from './components/CreatePlaceholder';
import { Organisation } from './components/Organisation';

import { Building2, Plus, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBoardsByOrgId } from '../../api/requests';

export const Dashboard = () => {
    interface IOrg {
        orgName: string;
        _id: string;
        orgLogo: string;
        orgBoards: string[];
    }
    //temp data
    const [organisations, setOrganisations] = useState<IOrg[]>([
        {
            orgName: 'test',
            _id: 'test',
            orgLogo: 'test',
            orgBoards: ['', ''],
        },
        {
            orgName: 'test',
            _id: 'test2',
            orgLogo: 'test',
            orgBoards: ['', ''],
        },
    ]);
    const [selectedOrganisation, setSelectedOrganisation] = useState(
        organisations[0]._id
    );
    useEffect(() => {
        const apiReq = async () => {
            // const data = await getBoardsByOrgId(selectedOrganisation);
            // setOrganisations
        };
        apiReq();
        console.log(selectedOrganisation);
    }, [selectedOrganisation]);
    const imgUrl =
        'https://thumbs.dreamstime.com/b/aerial-view-lago-antorno-dolomites-lake-mountain-landscape-alps-peak-misurina-cortina-di-ampezzo-italy-reflected-103752677.jpg';

    return (
        <div className="h-screen mt-0 pt-[2%] select-none flex flex-row gap-[5%]">
            <div className=" w-[20%] ml-[2%] h-[90%]">
                <div className="pl-[5%] pt-[3%]">
                    <h1 className="flex flex-row gap-[55%] font-bold">
                        Workspaces <Plus />
                    </h1>
                    <div className="mt-[4%] hover:cursor-pointer">
                        {organisations.map((org) => (
                            <Organisation
                                key={org._id}
                                orgName={org.orgName}
                                orgId={org._id}
                                orgLogo={org.orgLogo}
                                onClick={() => setSelectedOrganisation(org._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-[60%] p-[1%]">
                <div className="flex flex-row gap-[2%]">
                    <div className="p-[2%] w-[8%] bg-gradient-to-r from-purple-500 to-indigo-600 text-black flex justify-center rounded">
                        <Building2 color="white" />
                    </div>
                    <p className="font-extrabold text-2xl">Org name</p>
                </div>

                <div className="mt-[4%] w-full">
                    <h1 className="flex flex-row gap-[1%] font-medium text-xl">
                        <User2 size={35} /> Your boards
                    </h1>
                    <div className="mt-[1%] flex flex-row flex-wrap gap-[5%]">
                        <BoardPlaceholder img={imgUrl} />
                        <BoardPlaceholder img={imgUrl} />
                        <BoardPlaceholder img={imgUrl} />
                        <BoardPlaceholder img={imgUrl} />

                        <CreatePlaceholder />
                    </div>
                </div>
            </div>
        </div>
    );
};
