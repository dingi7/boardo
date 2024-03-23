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
                    Due to: {dueTo.getDate()}
                </span>
            </div>

            
        </div>
    );
};
