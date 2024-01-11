import {
    Activity,
    Layout,
    Settings,
    ChevronUp,
    ChevronDown,
    Building2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { IOrg } from "../contexts/DashboardContextProvider";

export const Organization = ({
    orgName,
    expandedOrganizationId,
    setExpandedOrganizationId,
    orgId,
    onClick,
    selectedOrganization,
}: {
    orgName: string;
    expandedOrganizationId: string;
    setExpandedOrganizationId: (id: string) => void;
    orgId: string;
    onClick: () => void;
    selectedOrganization: IOrg | null;
}): JSX.Element => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div
            onClick={() => {
                if (selectedOrganization!._id === orgId) {
                    return;
                }
                onClick();
            }}
            className="mb-3"
        >
            <h1 className="text-xs md:text-base lg:text-text-lg w-full flex flex-row font-medium justify-between ">
                <div className="flex flex-row w-[70%] gap-[4%]">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-[3%] rounded min-height">
                        <Building2 color="white"></Building2>
                    </div>
                    <p className="truncate w-[40%]">{orgName} </p>
                </div>
                <div className="flex flex-row justify-between">
                    {expandedOrganizationId === orgId ? (
                        <ChevronUp
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setExpandedOrganizationId("");
                            }}
                        />
                    ) : (
                        <ChevronDown
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setExpandedOrganizationId(orgId);
                            }}
                        />
                    )}
                </div>
            </h1>

            {expandedOrganizationId === orgId && (
                <ul className="mt-[2%] ml-[4%] flex flex-col">
                    <li
                        className={`flex flex-row items-center gap-[2%] px-[2%] py-[3%] rounded ${
                            selectedOrganization!._id === orgId &&
                            pathname === "/dashboard/boards"
                                ? "bg-blue-100 text-sky-800"
                                : "hover:bg-sky-50 hover:text-sky-700"
                        }`}
                        onClick={() => navigate("/dashboard/boards")}
                    >
                        <Layout
                            className={`w-[20%] md:w-[10%] ${
                                selectedOrganization!._id === orgId &&
                                pathname === "/dashboard/boards"
                                    ? "bg-blue-100"
                                    : "hover:bg-sky-50"
                            }`}
                        />{" "}
                        Boards
                    </li>
                    <li
                        className={`flex flex-row items-center gap-[2%] px-[2%] py-[3%] rounded ${
                            selectedOrganization!._id === orgId &&
                            pathname === "/dashboard/activity"
                                ? "bg-blue-100 text-sky-800"
                                : "hover:bg-sky-50 hover:text-sky-700"
                        }`}
                    >
                        <Activity
                            className={`w-[20%] md:w-[10%] ${
                                selectedOrganization!._id === orgId &&
                                pathname === "/dashboard/activity"
                                    ? "bg-blue-100"
                                    : "hover:bg-sky-50"
                            }`}
                        />{" "}
                        Activity
                    </li>
                    <li
                        className={`flex flex-row items-center gap-[2%] px-[2%] py-[3%] rounded ${
                            selectedOrganization!._id === orgId &&
                            pathname === "/dashboard/settings"
                                ? "bg-blue-100 text-sky-800"
                                : "hover:bg-sky-50 hover:text-sky-700"
                        }`}
                        onClick={() => {
                            console.log("clicked");
                            navigate("/dashboard/settings");
                        }}
                    >
                        <Settings
                            className={`w-[20%] md:w-[10%] ${
                                selectedOrganization!._id === orgId &&
                                pathname === "/dashboard/settings"
                                    ? "bg-blue-100"
                                    : "hover:bg-sky-50"
                            }`}
                        />{" "}
                        Settings
                    </li>
                </ul>
            )}
        </div>
    );
};
