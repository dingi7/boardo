type Props = {
    // user: object,
    // organization: object,
    // board: object,
    // action: string,
    // timeStamp: Date
};

export const Activity = (props: Props) => {
    return (
        <div className="border-gray-200 dark:border-gray-700 flex flex-row items-center">
            <div className="w-[4%]">
                <div className="w-[70%] aspect-square bg-purple-800 rounded-full flex flex-row justify-center items-center text-center">
                    <p className="text-white">A</p>
                </div>
            </div>

            <div>
                <div>
                    <p>
                        <span className="font-bold">antonio erdeljac</span>{" "}
                        created list "Todo"
                    </p>
                </div>

                <div>
                    <p className="text-sm">Nov 6, 2023 at 12:12 AM</p>
                </div>
            </div>
        </div>
    );
};
