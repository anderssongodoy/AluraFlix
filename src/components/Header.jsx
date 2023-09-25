import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <div className="flex justify-between bg-topbar text-white">
            <div className="m-5">
                <img src="/LogoMain.png" alt="logito" />
            </div>
            <div className="mt-7 mr-5">
            <Link to="/video" className="border px-7 py-3">
                Nuevo Video
            </Link>
            </div>
        </div>
    );
};
