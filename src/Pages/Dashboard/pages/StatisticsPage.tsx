import { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import { IAssignment } from "src/Interfaces/IAssignment";
import { getStatisticsForOrg } from "src/api/requests";
import { DashboardContext } from "../contexts/DashboardContextProvider";
//import { getUsersWithAssignments } from "src/api/requests";

export const StatisticsPage = () => {

    const { selectedOrganization } = useContext(DashboardContext) || {};

    const [userAssignments, setUserAssignments] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchUserAssignments = async () => {
            try {
                const result = await getStatisticsForOrg(selectedOrganization?._id);
                // Convert values to numbers
                const userAssignmentsNumbers: { [key: string]: number } = {};
                for (const key in result) {
                    userAssignmentsNumbers[key] = result[key].length;
                }
                setUserAssignments(userAssignmentsNumbers);
            } catch (error) {
                console.error("Error fetching user assignments:", error);
            }
        };

        if (selectedOrganization?._id) {
            fetchUserAssignments();
        }
    }, [selectedOrganization]);

    return (
        <div className="flex flex-col">

            <Plot
                data={[
                    {
                        values: Object.values(userAssignments),
                        labels: Object.keys(userAssignments),
                        type: "pie",
                    },
                ]}
                layout={{ title: "Assignments by organization members" }}
            />
        </div>
    );
};

