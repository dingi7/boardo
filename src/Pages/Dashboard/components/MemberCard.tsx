import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'src/Components/alertDialog';
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

const MemberCard = ({
  member,
  isOwner,
  handleRemoveMember,
  handleBanMember,
  revokeUserBan,
  selectedOrganization,
  mode,
}: {
  member: IUserData;
  isOwner: boolean;
  handleRemoveMember: (orgId: string, memberId: string) => void;
  handleBanMember: (memberId: string) => void;
  revokeUserBan:  (memberId: string) => void;
  selectedOrganization: IOrg;
  mode: string;
}) => {
  return (
    <TableRow>
      <TableCell className='font-medium'>{member.username}</TableCell>
      <TableCell className='hidden md:table-cell'>{member.email}</TableCell>
      <TableCell
        className={`hidden md:table-cell text-center ${
          member.honorCredits > 0 && 'text-green-600'
        }  ${member.honorCredits < 0 && 'text-red-600'}`}
      >
        {member.honorCredits}
      </TableCell>
      <TableCell>
        {member._id === selectedOrganization.owner._id ? (
          <span className='text-red-500'>Owner</span>
        ) : (
          <span className='text-blue-500'>Member</span>
        )}
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <Dialog>
          <DialogTrigger asChild>
            {isOwner && member._id !== selectedOrganization.owner._id && (
              <Button size='sm'>View Options</Button>
            )}
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Member Actions</DialogTitle>
            </DialogHeader>
            {mode === 'remove' && (
              <div className='flex flex-col gap-3'>
                <AlertDialog>
                  <AlertDialogTrigger className='w-full'>
                    <Button className='w-full bg-red-600'>Kick</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleRemoveMember(
                            selectedOrganization._id,
                            member._id
                          )
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger className='w-full'>
                    <Button className='w-full bg-red-600'>Ban</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleBanMember(member._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}{' '}
            {mode === 'revoke' && (
              <div className='flex flex-col gap-3'>
                <AlertDialog>
                  <AlertDialogTrigger className='w-full'>
                    <Button
                      className='w-full bg-red-600'
                    >
                      Revoke ban
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => revokeUserBan(member._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default MemberCard;
