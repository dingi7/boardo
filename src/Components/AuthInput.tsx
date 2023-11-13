import React from "react";

type Props = {
    type: string;
    text: string;
    id: string;
};

export const AuthInput = (props: Props) => {
    return (
        <div className="mb-4">
            <label
                className="block text-gray-100 text-sm font-bold mb-2 text-left"
                htmlFor={props.id}
            >
                {props.text}
            </label>
            <input
                className="shadow appearance-none border-2 drop-shadow-md border-slate-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-zinc-900 outline-none"
                id={props.id}
                type={props.type}
                placeholder={props.text}
            />
        </div>
    );
};
