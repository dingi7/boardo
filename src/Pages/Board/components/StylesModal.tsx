import React, { useState } from "react";
import { Button } from "src/Components/ui/button";
export const StylesModal = ({}: {}) => {
    const [selectedColor, setSelectedColor] = useState("white");

    const colorOptions = [
        { name: "white", value: "bg-white" },
        { name: "red", value: "bg-red-200" },
        { name: "purple", value: "bg-purple-200" },
    ];
    console.log(selectedColor);

    return (
        <div className="flex flex-col w-[25%] h-[40%] items-center gap-2 p-[4%] bg-slate-200 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <h1>Color</h1>
            <div className="flex flex-row gap-[4%]">
                {colorOptions.map((colorOption, index) => (
                    <div
                        key={index}
                        className={`min-w-[40px] min-h-[40px] 
                            ${colorOption.value}
                             ${
                                 selectedColor === colorOption.name
                                     ? "border-slate-800 border-2"
                                     : ""
                             }`}
                        onClick={() => setSelectedColor(colorOption.name)}
                    />
                ))}
            </div>

            <div className="absolute bottom-[4%] w-[100%] flex justify-center">
                <Button className="w-[50%]">Save</Button>
            </div>
        </div>
    );
};
