import { Menu } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "src/Components/select";
import { TableCell, TableRow } from "src/Components/table";
import { Button } from "src/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "src/Components/ui/dialog";

const MemberCard = ({
    member,
    isOwner,
    handleRemoveMember,
    selectedOrganization,
}: {
    member: any;
    isOwner: boolean;
    handleRemoveMember: any;
    selectedOrganization: any;
}) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{member.username}</TableCell>
            <TableCell className="hidden md:table-cell">
                {member.email}
            </TableCell>
            <TableCell>
                {member._id === selectedOrganization.owner._id ? (
                    <span className="text-red-500">Owner</span>
                ) : (
                    <span className="text-blue-500">Member</span>
                )}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                <Dialog>
                        <DialogTrigger asChild>
                            {isOwner &&
                                member._id !== selectedOrganization.owner._id && (
                                    <Button size="sm">View Options</Button>
                                )}
                        </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Member Actions</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-3">
                            <Button
                                className="bg-red-800"
                                onClick={() =>
                                    handleRemoveMember(
                                        selectedOrganization._id,
                                        member._id
                                    )
                                }
                            >
                                Kick
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

export default MemberCard;
