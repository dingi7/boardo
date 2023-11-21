import React from "react";
import { LoginUserData, RegisterUserData } from "../../Interfaces/IUserData";

type Props = {
    type: string;
    text: string;
    id: string;
    setUserData:
        | React.Dispatch<React.SetStateAction<RegisterUserData>>
        | React.Dispatch<React.SetStateAction<LoginUserData>>;
};

export const AuthInput = (props: Props) => {
    return (
        <div className="mb-4">
            <label
                className="block mb-2 text-md font-medium text-gray-900"
                htmlFor={props.id}
            >
                {props.text}
            </label>

            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id={props.id}
                type={props.type}
                placeholder={props.text}
                onChange={(e) => {
                    props.setUserData((prevState: any) => {
                        return { ...prevState, [props.id]: e.target.value };
                    });
                }}
            />
        </div>
    );
};
