import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "src/Components/ui/button";

type Props = {};

export const Settings = (props: Props) => {
    const { selectedOrganization } = useOutletContext<any>();
    console.log(selectedOrganization);
    return (
        <div className="flex justify-between">
            <div className="flex flex-col items-left">
                {selectedOrganization.members.map(
                    (name: string, index: number) => (
                        <div
                            key={index}
                            className="bg-gray-200 p-2 m-2 rounded"
                        >
                            {name}
                        </div>
                    )
                )}
            </div>
            <div>
                <Button>Delete organization</Button>
            </div>
        </div>
    );
};
