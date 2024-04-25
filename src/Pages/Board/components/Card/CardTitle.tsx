import { renameCard } from "src/api/requests";
import { FormInput } from "../../../../Components/form/form-input";
import { Button } from "../../../../Components/ui/button";
import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContextProvider";

interface CardTitleProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    cardId: string;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
}

export const CardTitle: React.FC<CardTitleProps> = ({
    title,
    setTitle,
    cardId,
    isEditing,
    setIsEditing,
}): JSX.Element => {
    const context = useContext(BoardContext);

    if (!context) {
        throw new Error("Board context is not available");
    }
    const { boardInfo } = context;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        setTitle(title);
        renameCard(cardId, boardInfo!.owner, title);
        setIsEditing(false);
    };

    const onBlur = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <form onSubmit={onSubmit} className="flex items-center gap-x-2">
                <FormInput
                    id="title"
                    onBlur={onBlur}
                    defaultValue={title}
                    className="text-[16px]  h-auto w-auto py-1 px-2 text-slate-600 font-medium bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form> 
        );
    }

    return (
        <div
            variant="transparent"
            className="leading-normal text-left font-medium text-[16px] h-auto w-fit py-1 px-2 text-slate-900 overflow-hidden truncate"
        >
            <span className="w-full text-left">{title}</span>
        </div>
    );
};
