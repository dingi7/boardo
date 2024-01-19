import React, { useState } from "react";
// import { useAuthUser } from "react-auth-kit";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useToast } from "src/Components/Toaster/use-toast";
import { useAuthUser } from "react-auth-kit";
import { Activity } from "../components/Activity";
type Props = {};

export const ActivityPage = (props: Props) => {
    const { selectedOrganization, setUserOrganizations } =
        useOutletContext<any>();
    const [loading, setLoading] = useState<boolean>(false);
    //const auth = useAuthUser()();
    //const isOwner = auth?._id === selectedOrganization.owner;

    return (
        <div className="mb-4 border-gray-200 dark:border-gray-700 flex flex-col gap-[2rem]">
            <h1 className="text-lg font-bold">Activity</h1>
            <div className="flex flex-col gap-[1.2rem]">
                <Activity />

                <Activity />

                <Activity />
            </div>
        </div>
    );
};
