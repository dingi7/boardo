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
                                member._id !== selectedOrganization.owner && (
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
                            <div className="flex flex-row justify-between item-center">
                                <span>Change roles: </span>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Roles</SelectLabel>
                                            <SelectItem value="owner">
                                                Owner
                                            </SelectItem>
                                            <SelectItem value="member">
                                                Member
                                            </SelectItem>
                                            <SelectItem value="guest">
                                                Guest
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="primary">Save</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

export default MemberCard;
