import React, { useState } from "react";
import {
    EditingState,
    LoginUserData,
    RegisterUserData,
} from "../../Interfaces/IUserData";
import { Eye, EyeOff, Pencil } from "lucide-react";

type Props = {
    value: string;
    type: string;
    text: string;
    name: string;
    id: keyof LoginUserData | keyof RegisterUserData;
    // setUserData:
    //     | React.Dispatch<React.SetStateAction<RegisterUserData>>
    //     | React.Dispatch<React.SetStateAction<LoginUserData>>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEdditing: EditingState;
    setIsEdditing: any;
};

export const ProfileInput = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordInput = props.type === "password";

    const passwordVerification =
        isPasswordInput &&
        Object.values(props.isEdditing).some((value) => value);

    return (
        <div className="mb-4 relative">
            <label
                className="block mb-2 text-md font-medium text-gray-900"
                htmlFor={props.id}
            >
                {isPasswordInput && props.isEdditing[props.name]
                    ? "Old password:"
                    : props.text}
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg">
                <input
                    className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 relative ${
                        (!props.isEdditing[props.name] && !passwordVerification) ? "opacity-60" : ""
                    }`}
                    id={props.id}
                    type={isPasswordInput && showPassword ? "text" : props.type}
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                    disabled={!props.isEdditing[props.name] && !passwordVerification}
                />

                <div
                    className="absolute right-[0] p-2"
                    onClick={() =>
                        props.setIsEdditing(
                            props.name,
                            !props.isEdditing[props.name]
                        )
                    }
                >
                    <Pencil />
                </div>
            </div>

            {isPasswordInput && props.isEdditing[props.name] && (
                <>
                    <label
                        className="block mb-2 text-md font-medium text-gray-900"
                        htmlFor={props.id}
                    >
                        New password:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <input
                            className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 relative ${
                                !props.isEdditing && "opacity-60"
                            }`}
                            id={props.id}
                            type={
                                isPasswordInput && showPassword
                                    ? "text"
                                    : props.type
                            }
                            value={props.value}
                            onChange={props.onChange}
                            disabled={!props.isEdditing}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
