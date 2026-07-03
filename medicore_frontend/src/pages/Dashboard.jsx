import { useMemo, useState } from "react";
import logo from "../assets/medicore_logo_light.png";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { NAVIGATION_BY_ROLE } from "../util/NAVIGATION_BY_ROLES";

export default function Dashboard({ userInfo }) {
    const [activePane, setActivePane] = useState("home");

    const navItems = useMemo(() => {
        return NAVIGATION_BY_ROLE[userInfo?.userType] || [];
    }, [userInfo?.userType]);

    const activeItem = useMemo(() => {
        return navItems.find((item) => item.id === activePane) || navItems[0];
    }, [activePane, navItems]);

    // Keep activePane stable; if user role changes, activeItem will fall back to the first valid pane.
    // (Avoid setState-in-effect to prevent React cascading-render lint warnings.)

    function renderUserBanner() {
        return (
            <div className="flex items-center gap-5">
                <img src={logo} alt="logo" className="h-15" />
                <h1 className="text-white text-xl font-bold">
                    Hello, {userInfo?.username || "User"}!
                </h1>
            </div>
        );
    }

    function renderNavigation() {
        return (
            <ul className="w-full flex flex-col justify-self-center items-center gap-5">
                {navItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActivePane(item.id)}
                        className={`flex justify-center items-center gap-3 p-5 w-full hover:cursor-pointer transition ${
                            activePane === item.id ? "bg-accent" : "hover:bg-accent"
                        }`}
                    >
                        {item.icon}
                        <h2 className="text-white text-xl font-semibold">{item.title}</h2>
                    </li>
                ))}
            </ul>
        );
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/logout",
                {},
                { withCredentials: true }
            );
            if (response.status === 200) {
                globalThis.location.href = "/login";
            }
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <div className="h-screen w-full flex">
            <nav className="bg-primary w-1/4 p-5 flex flex-col justify-between">
                {renderUserBanner()}
                {renderNavigation()}
                <button
                    onClick={handleLogout}
                    className="flex justify-end items-center gap-3 w-full hover:cursor-pointer"
                >
                    <ArrowRightStartOnRectangleIcon className="size-12 text-white" />
                    <h1 className="text-white text-2xl font-bold">Logout</h1>
                </button>
            </nav>

            <div className="h-screen w-full">{activeItem?.pane}</div>
        </div>
    );
}

