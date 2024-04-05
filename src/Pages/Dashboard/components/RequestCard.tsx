import { TableCell, TableRow } from 'src/Components/table';
import { Button } from 'src/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'src/Components/ui/dialog';
import { IOrg } from 'src/Interfaces/IContexts';
import { IUserData } from 'src/Interfaces/IUserData';

const RequestCard = ({
    member,
    isOwner,
    handleRemoveMember,
    selectedOrganization,
}: {
    member: IUserData;
    isOwner: boolean;
    handleRemoveMember: (orgId: string, memberId: string) => void;
    selectedOrganization: IOrg;
}) => {
    return (
        <TableRow>
            <TableCell className='font-medium'>{member.username}</TableCell>
            <TableCell className='hidden md:table-cell'>
                {member.email}
            </TableCell>
            <TableCell className='hidden md:table-cell'>
                <Dialog>
                    <DialogTrigger asChild>
                        {isOwner &&
                            member._id !== selectedOrganization.owner._id && (
                                <Button size='sm'>View Options</Button>
                            )}
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>Requests actions</DialogTitle>
                        </DialogHeader>
                        <div className='flex w-full flex-row justify-between'>
                            <Button
                            className='w-[30%]'
                                variant="destructive"
                                onClick={() =>
                                    handleRemoveMember(
                                        selectedOrganization._id,
                                        member._id
                                    )
                                }
                            >
                                Deny
                            </Button>

                            <Button
                                variant="primary"
                                className='w-[50%]'
                                onClick={() =>
                                    handleRemoveMember(
                                        selectedOrganization._id,
                                        member._id
                                    )
                                }
                            >
                                Accept
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

export default RequestCard;
