import { Search } from "lucide-react";

export const SearchComponent = () => {
    return (
        <div className="w-[50%] border-2 flex rounded-xl p-[0.2%] mx-auto bg-white">
            <button
                type="submit"
                className="p-[4%] rounded-md text-white"
            >
                <Search color="gray"/>
            </button>
            <input
                id="workspaceName"
                type="text"
                className="flex-grow relative outline-none rounded-xl w-[80%]"
                placeholder="Search..."
                required
            />
        </div>
    );
};
