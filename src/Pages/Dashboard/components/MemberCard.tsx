import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "src/Components/dropdown";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "src/Components/select";
import { Button } from "src/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "src/Components/ui/dialog";

const MemberCard = ({ member }: { member: any; }) => {
    return (
        <li
            key={member._id}
            className="bg-gray-200 p-2 m-2 rounded flex flex-row justify-between items-center"
        >
            <span className="text-md">
                {`${member.firstName} ${member.lastName}`}
            </span>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Menu></Menu>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Member Actions</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        <Button className="bg-red-800">Kick</Button>
                        <Button className="bg-purple-800">Ban</Button>
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
                        <Button variant="outline">Cancel</Button>
                        <Button variant="primary">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </li>
    );
};

export default MemberCard;
