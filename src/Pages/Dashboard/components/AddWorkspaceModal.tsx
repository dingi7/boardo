import { X } from "lucide-react";
import { useState, FormEvent } from "react";
import useFormData from "../../../util/hooks/useFormData";
import { createOrganization } from "../../../api/requests";
import { dataBaseOrganization } from "../../../Interfaces/IDatabase";
import { SearchComponent } from "./Search";
import { IOrgLean } from "../context/DashboardContext";

type AddWorkspaceModalProps = {
    closeModal: () => void;
    allOrganizations: IOrgLean[];
    fetchAllOrganizations: any;
    setUserOrganizations: (organizations: any) => void;
};

type WorkspaceData = {
    name: string;
    password: string;
};

export const AddWorkspaceModal = ({
    closeModal,
    allOrganizations,
    setUserOrganizations,
}: AddWorkspaceModalProps) => {
    const [option, setOption] = useState<"create" | "join">("create");
    const [workspaceData, handleInputChange] = useFormData<WorkspaceData>({
        name: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    console.log(allOrganizations);

    const handleCreateWorkspace = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = await createOrganization(workspaceData);
        setUserOrganizations((prev: any) => [...prev, result]);
        setLoading(false);
        closeModal();
    };

    const handleJoinWorkspace = (e: FormEvent) => {
        e.preventDefault();
        // Add logic for joining a workspace
        closeModal();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative w-[40%] h-[60%] border-2 border-gray-300 bg-slate-100 rounded-md p-8">
                <button
                    className="absolute top-4 right-4 hover:cursor-pointer"
                    onClick={closeModal}
                >
                    <X />
                </button>

                <TabSelector option={option} setOption={setOption} />

                {option === "join" ? (
                    <JoinWorkspaceForm
                        onSubmit={handleJoinWorkspace}
                        allOrganizations={allOrganizations}
                    />
                ) : (
                    <CreateWorkspaceForm
                        onSubmit={handleCreateWorkspace}
                        handleInputChange={handleInputChange}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
};

type TabSelectorProps = {
    option: "create" | "join";
    setOption: (option: "create" | "join") => void;
};

const TabSelector = ({ option, setOption }: TabSelectorProps) => (
    <div className="flex justify-center gap-10 font-bold text-2xl my-4">
        <Tab
            title="Join Workspace"
            isActive={option === "join"}
            onClick={() => setOption("join")}
        />
        <Tab
            title="Create Workspace"
            isActive={option === "create"}
            onClick={() => setOption("create")}
        />
    </div>
);

type TabProps = {
    title: string;
    isActive: boolean;
    onClick: () => void;
};

const Tab = ({ title, isActive, onClick }: TabProps) => (
    <div
        className={`text-center hover:underline ${isActive ? "underline" : ""}`}
        onClick={onClick}
    >
        <h1>{title}</h1>
    </div>
);

type FormProps = {
    onSubmit: (e: FormEvent) => void;
    handleInputChange?: (e: any) => void;
    loading?: boolean;
    allOrganizations?: dataBaseOrganization[];
};

const JoinWorkspaceForm = ({ onSubmit, allOrganizations }: FormProps) => (
    <form
      className="h-full flex flex-col w-full mx-auto text-center justify-center"
      onSubmit={onSubmit}
    >
      <label htmlFor="workspaceName" className="font-medium">
        Workspace name
      </label>
      <div className="h-[100%] flex flex-col gap-3  items-start justify-center overflow-hidden">
        <SearchComponent />
        {/* loop through the first 6 organizations and display them */}
        <div className="h-[70%] w-[40%] overflow-y-auto no-scrollbar mx-auto">
          {allOrganizations!.map((org: dataBaseOrganization) => (
            <div
              className="flex items-center gap-2 p-[4%] hover:bg-slate-200 rounded-lg cursor-pointer"
              key={org._id}
            >
              <label htmlFor={org._id}>{org.name}</label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
  

const CreateWorkspaceForm = ({
    onSubmit,
    handleInputChange,
    loading,
}: FormProps) => (
    <form className="flex flex-col w-3/4 mx-auto mt-4" onSubmit={onSubmit}>
        {/* Repeat the above input for workspace name */}
        <label htmlFor="name" className="font-medium mt-4">
            Workspace name
        </label>
        <input
            id="name"
            className="border-2 border-black p-2"
            required
            onChange={handleInputChange}
        />
        <label htmlFor="password" className="font-medium mt-4">
            Workspace password
        </label>
        <input
            id="password"
            type="password"
            className="border-2 border-black p-2"
            required
            onChange={handleInputChange}
        />

        <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
            disabled={loading}
        >
            {loading ? "Creating..." : "Create"}
        </button>
    </form>
);
