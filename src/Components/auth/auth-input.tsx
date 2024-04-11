import React, { useState } from 'react';
import { LoginUserData, RegisterUserData } from '../../Interfaces/IUserData';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
    type: string;
    placeholder?: string;
    id: keyof LoginUserData | keyof RegisterUserData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isValid?: boolean;
};

export const AuthInput = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordInput = props.type === 'password';
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="mb-4 relative">
            <div className={`flex items-center rounded-lg border-2 ${props.isValid ? "border-grey-500" : "border-rose-500"}`}>
                <input
                    className={`bg-gray-50 text-sm w-full p-2.5 ${isPasswordInput ? 'rounded-l-lg' : 'rounded-lg'} outline-none `}
                    id={props.id}
                    type={isPasswordInput && showPassword ? 'text' : props.type}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                />
                {isPasswordInput && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="p-2 rounded-r-lg"
                    >
                        {showPassword ? (
                            <EyeOff size="20" />
                        ) : (
                            <Eye size="20" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
