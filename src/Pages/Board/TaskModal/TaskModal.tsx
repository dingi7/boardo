    import { useState } from "react";
    import closeVector from "../assets/closeVector.svg";

    interface TaskModalProps {
        setIsOpen: () => void;
    }

    export const TaskModal: React.FC<TaskModalProps> = ({ setIsOpen }) => {
        const [selectedColor, setSelectedColor] = useState("");
        const [addCheckbox, setAddCheckbox] = useState(false)

        const submitHandler = (e: React.FormEvent) => {
            e.preventDefault();
            setIsOpen()
            console.log(selectedColor);
        };

        const handleColorChange = (color: string) => {
            setSelectedColor(color);
        };

        const [inputValues, setInputValues] = useState<string[]>([""]);

        const handleInputChange = (index: number, value: any) => {
            const newInputValues = [...inputValues];
            newInputValues[index] = value;
            setInputValues(newInputValues);
          
            // If the value is empty and not the last input, remove the input from the array
            if (value === "" && index !== newInputValues.length - 1) {
              newInputValues.splice(index, 1);
              setInputValues(newInputValues);
            }
          
            // If the value is not empty and it's the last input, add a new empty input
            if (value !== "" && index === newInputValues.length - 1) {
              setInputValues([...newInputValues, ""]);
            }
          };
          

        return (
            <div
                className="w-full"
            >

                <button
                    className="absolute top-0 right-0 p-2 mt-[1%] mr-[1%]"
                    style={{ cursor: "pointer" }}
                    onClick={setIsOpen}
                >
                    <img src={closeVector} alt="Close" />
                </button>
                <form className="flex flex-col justify-center w-full" onSubmit={submitHandler}>
                    <label className="text-white text-left mb-1">Task label:</label>
                    <input className="bg-white text-black p-2 rounded mb-4" />

                    <label className="text-white text-left mb-1">Task colour:</label>

                    <div className="flex gap-2 mb-[4%]">
                        <input
                            type="radio"
                            id="red"
                            name="color"
                            value="red"
                            className="appearance-none"
                            checked={selectedColor === "red"}
                            onChange={() => handleColorChange("red")}
                        />
                        <label
                            htmlFor="red"
                            className={`p-[8%] bg-red-600 cursor-pointer rounded ${selectedColor === "red" && "border-2 border-black"}`}
                        ></label>

                        <input
                            type="radio"
                            id="blue"
                            name="color"
                            value="blue"
                            className="appearance-none"
                            checked={selectedColor === "blue"}
                            onChange={() => handleColorChange("blue")}
                        />
                        <label
                            htmlFor="blue"
                            className={`p-[8%] bg-blue-600 cursor-pointer rounded ${selectedColor === "blue" && "border-2 border-black"}`}
                        ></label>

                        <input
                            type="radio"
                            id="purple"
                            name="color"
                            value="purple"
                            className={`appearance-none`}
                            checked={selectedColor === "purple"}
                            onChange={() => handleColorChange("purple")}
                        />
                        <label
                            htmlFor="purple"
                            className={`p-[8%] bg-purple-600 cursor-pointer rounded ${selectedColor === "purple" && "border-2 border-black"}`}
                        ></label>

                        <input
                            type="radio"
                            id="orange"
                            name="color"
                            value="orange"
                            className="appearance-none"
                            checked={selectedColor === "orange"}
                            onChange={() => handleColorChange("orange")}
                        />
                        <label
                            htmlFor="orange"
                            className={`p-[8%] bg-orange-600 cursor-pointer rounded  ${selectedColor === "orange" && "border-2 border-black"}`}
                        ></label>

                        <input
                            type="radio"
                            id="green"
                            name="color"
                            value="green"
                            className="appearance-none"
                            checked={selectedColor === "green"}
                            onChange={() => handleColorChange("green")}
                        />
                        <label
                            htmlFor="green"
                            className={`p-[8%] bg-green-600 cursor-pointer rounded  ${selectedColor === "green" && "border-2 border-black"}`}
                        ></label>
                    </div>

                    <div className="inline-flex items-center" >
                        <label
                            className="relative flex items-center p-3 rounded-full cursor-pointer"
                            htmlFor="task"
                            data-ripple-dark="true"
                        >
                            <input
                                id="tasks"
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                                checked={addCheckbox}
                                onClick={() => setAddCheckbox(!addCheckbox)}
                            />
                            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="1"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </label>
                        <label
                            className="mt-px font-light text-white cursor-pointer select-none"
                            htmlFor="tasks"
                        >
                            Add Checkbox
                        </label>
                    </div>


                    {addCheckbox && inputValues.map((value, index) => (
                        <div className="flex flex-col  ml-2 justify-start w-[60%]" key={index}>
                            <input
                                className="p-1.5 rounded mb-2"
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>
                    ))}


                    <button
                        type="submit"
                        className="py-[2%] px-[10%] bg-black text-white rounded absolute bottom-[4%] left-1/2 transform -translate-x-1/2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    };
