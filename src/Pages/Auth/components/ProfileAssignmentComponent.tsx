import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileAssignmentComponent = ({
    cardName,
    cardId,
    dueTo,
}: {
    cardName: string;
    cardId: string;
    dueTo: Date;

}) => {

    return (
        <div
            key={cardId}
            className="flex items-center justify-between bg-gray-200 p-2 rounded-md"
        >
            <div className="flex flex-col ">
                <span className="font-semibold">{cardName}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    Due to: {dueTo.toISOString().split('T')[0]}
                </span>
            </div>

            <Link to={""} className="mr-2 hover:underline"><p className="flex gap-2"><span>Go to card</span><ArrowRight /></p></Link>
        </div>
    );
};
