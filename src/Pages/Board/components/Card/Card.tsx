import { Draggable } from "@hello-pangea/dnd";
import { useContext, useEffect, useState } from "react";

import { CardTitle } from "./CardTitle";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Calendar,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/Components/ui/tooltip";
import SettingsCardModal from "./EditCardModal";
import { getAssignmentsByCard } from "src/api/requests";
import { IAssignment } from "src/Interfaces/IAssignment";
import { IUserData } from "src/Interfaces/IUserData";
import { DashboardContext } from "src/Pages/Dashboard/contexts/DashboardContextProvider";

type CardItem = {
  content: string;
  index: number;
  id: string;
  onDeleteCard: (cardId: string) => void;
  storedPriority: string;
  storedDueDate?: Date;
  storedDescription: string;
};

export const Card: React.FC<CardItem> = ({
  content,
  index,
  id,
  onDeleteCard,
  storedPriority,
  storedDueDate,
  storedDescription,
}) => {
  useEffect(() => {
    setTitle(content);
  }, [content]);
  useEffect(() => {
    setPriority(storedPriority);
  }, [storedPriority]);
  useEffect(() => {
    setDate(storedDueDate ? new Date(storedDueDate) : undefined);
  }, [storedDueDate]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(content);
  const [description, setDescription] = useState<string>(storedDescription);
  const [priority, setPriority] = useState<string>(storedPriority || "Normal");
  const [date, setDate] = useState<Date | undefined>(
    storedDueDate ? new Date(storedDueDate) : undefined
  );

  const dashboardContext = useContext(DashboardContext);

  const organizationMembers = dashboardContext?.selectedOrganization?.members;

  const [assignments, SetAssignments] = useState<Array<IAssignment>>([]);
  const [occupiedMembers, setOccupiedMembers] = useState<IUserData[]>([]);
  const [availableMembers, setAvailableMembers] = useState<IUserData[]>([]);

  
  useEffect(() => {
    if (organizationMembers) {
      const occupied: IUserData[] = [];
      const available: IUserData[] = [];

      organizationMembers.forEach((member) => {
        if (
          assignments.some((assignment) => assignment.user._id === member._id)
        ) {
          occupied.push(member);
        } else {
          available.push(member);
        }
      });

      setOccupiedMembers(occupied);
      setAvailableMembers(available);
    }
  }, [organizationMembers, assignments]);


  const fetchAllAssignmentsForCard = async () => {
    const assignments = await getAssignmentsByCard(id);
    SetAssignments(assignments);
  };

  useEffect(() => {
    fetchAllAssignmentsForCard();
    if (organizationMembers) {
      const occupied: IUserData[] = [];
      const available: IUserData[] = [];

      organizationMembers.forEach((member) => {
        if (
          assignments.some((assignment) => assignment.user._id === member._id)
        ) {
          occupied.push(member);
        } else {
          available.push(member);
        }
      });

      setOccupiedMembers(occupied);
      setAvailableMembers(available);
    }
  }, [organizationMembers]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex w-full h-auto items-center gap-[10px] px-[10px] py-[2%] relative bg-slate-100 rounded-[7px] overflow-hidden border-black cursor-pointer shadow-sm "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-[10px]">
                  {priority === "Urgent" ? (
                    <AlertTriangle color="red" className="w-5 h-5" />
                  ) : priority === "Important" ? (
                    <AlertOctagon color="#FF8200" className="w-5 h-5 " />
                  ) : priority === "Normal" ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : null}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>This card has priority of {priority}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {date && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-[10px]">
                    {date! > new Date() ? (
                      <Calendar color="green" className="w-5 h-5" />
                    ) : (
                      <Calendar color="red" className="w-5 h-5" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This card's due date is{" "}
                    {date?.toLocaleString() || "Not asigned"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {assignments && assignments.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-[10px]">
                    <User className="w-5 h-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This card is assigned to{" "}
                    {assignments.map((assignment, index) => (
                      <span key={assignment.user._id}>
                        <span className="font-bold">
                          {assignment.user.username}
                        </span>
                        {index !== assignments.length - 1 && " "}
                        {index === assignments.length - 2 && " and "}
                      </span>
                    ))}
                    
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <CardTitle
            title={title}
            setTitle={setTitle}
            cardId={id}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          ></CardTitle>

          <div
            className={`absolute p-[2%] top-0 right-0 h-full flex items-center transition-opacity duration-100 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* <CardSettingsDropdownMenu
                            
                        /> */}
            <SettingsCardModal
              title={title}
              cardId={id}
              setTitle={setTitle}
              priority={priority}
              setPriority={setPriority}
              date={date}
              setDate={setDate}
              assignments={assignments}
              SetAssignments={SetAssignments}
              description={description}
              setDescription={setDescription}
              availableMembers={availableMembers}
              setAvailableMembers={setAvailableMembers}
              occupiedMembers={occupiedMembers}
              setOccupiedMembers={setOccupiedMembers}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
