import { Search } from "lucide-react";

export const SearchComponent = () => {
    return (
        <div className="w-[50%] border-2 border-black flex rounded-xl p-[0.2%] mx-auto">
            <button
                type="submit"
                className="p-2 rounded-md text-white"
            >
                <Search color="black"/>
            </button>
            <input
                id="workspaceName"
                type="text"
                className="flex-grow relative outline-none rounded-xl"
                placeholder="Search..."
                required
            />
        </div>
    );
};
