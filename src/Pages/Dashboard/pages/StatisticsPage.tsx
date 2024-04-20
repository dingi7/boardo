import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { IAssignment } from "src/Interfaces/IAssignment";
//import { getUsersWithAssignments } from "src/api/requests";

export const StatisticsPage = () => {
    const [organizationAssignments, setOrganizationAssignments] = useState<IAssignment[]>([]);
    const [completedOrganizationAssignments, setCompletedOrganizationAssignments] = useState<IAssignment[]>([]);
    const [userAssignments, setUserAssignments] = useState<{ [key: string]: number }>({});

    // useEffect(() => {
    //     // Fetch organization assignments
    //     const fetchOrganizationAssignments = async () => {
    //         try {
    //             const assignments = await getOrganizationAssignments();
    //             setOrganizationAssignments(assignments);

    //             // Filter completed assignments
    //             const completedAssignments = assignments.filter(assignment => assignment.isCompleted);
    //             setCompletedOrganizationAssignments(completedAssignments);

    //             // Count assignments per user
    //             const assignmentsByUser: { [key: string]: number } = {};
    //             assignments.forEach(assignment => {
    //                 if (assignment.user) {
    //                     const { username } = assignment.user;
    //                     if (assignmentsByUser[username]) {
    //                         assignmentsByUser[username]++;
    //                     } else {
    //                         assignmentsByUser[username] = 1;
    //                     }
    //                 }
    //             });
    //             setUserAssignments(assignmentsByUser);
    //         } catch (error) {
    //             console.error("Error fetching organization assignments:", error);
    //         }
    //     };

    //     fetchOrganizationAssignments();
    // }, []);

    return (
        <div className="flex flex-col">
            <Plot
                data={[
                    {
                        values: [completedOrganizationAssignments.length, organizationAssignments.length - completedOrganizationAssignments.length],
                        labels: ["Completed", "Non-Completed"],
                        type: "pie",
                    },
                ]}
                layout={{ title: "Assignments completion progress" }}
            />

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

