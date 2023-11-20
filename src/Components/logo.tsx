import { Link } from "react-router-dom";
import logoSvg from './logo.svg'

export const Logo = () => {
    return (
        <Link to="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <img src={logoSvg} alt="Logo" height={30} width={30} />
                {/* <svg path="../../public/logo.svg" height={30} width={30}></svg> */}
                <p className="text-lg text-neutral-700 pb-1">Boardo</p>
            </div>
        </Link>
    );
};
