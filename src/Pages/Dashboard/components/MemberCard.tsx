import { TableCell, TableRow } from 'src/Components/table';
import { Button } from 'src/Components/ui/button';
import { IOrg } from 'src/Interfaces/IContexts';
import { IUserData } from 'src/Interfaces/IUserData';

const MemberCard = ({
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
            <TableCell>
                {member._id === selectedOrganization.owner._id ? (
                    <span className='text-red-500'>Owner</span>
                ) : (
                    <span className='text-blue-500'>Member</span>
                )}
            </TableCell>
            <TableCell className='hidden md:table-cell'>
                {isOwner && (
                    <Button
                        size='sm'
                        className='bg-red-800'
                        disabled={member._id === selectedOrganization.owner._id}
                        onClick={() =>
                            handleRemoveMember(
                                selectedOrganization._id,
                                member._id
                            )
                        }
                    >
                        Kick member
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};

export default MemberCard;
