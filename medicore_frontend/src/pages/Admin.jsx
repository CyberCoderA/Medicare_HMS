import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/medicore_logo_light.png";
import { HomeIcon, UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import AdminHomePanel from "./AdminHomePanel";
import AdminUserPanel from "./AdminUserPanel";

export default function Admin() {
    const [activePane, setActivePane] = useState("users");
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userDataResponse = await axios.get("http://localhost:8080/api/users/allUsers", {
                    withCredentials: true,
                });
                setUsersData(userDataResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchUserData();
    }, []);

    const renderPage = () => {
        if (activePane == "home") {
            return <AdminHomePanel />
        } else if (activePane == "users") {
            return <AdminUserPanel setUsersData={setUsersData} usersData={usersData} />
        }
    }

    return (
        <div className="h-screen w-full flex">
            <div className="bg-primary w-1/4 p-5 flex flex-col justify-between">
                <div className="flex items-center gap-5">
                    <img src={logo} alt="logo" className="h-15" />
                    <h1 className="text-white text-xl font-bold">Hello, Admin!</h1>
                </div>

                <ul className="w-full flex flex-col justify-self-center items-center gap-5">
                    <li onClick={() => setActivePane("home")} className="flex justify-center items-center gap-3 p-5 w-full hover:cursor-pointer hover:bg-accent">
                        <HomeIcon className="size-8 text-white" />

                        <h2 className="text-white text-xl font-semibold">Home</h2>
                    </li>

                    <li onClick={() => setActivePane("users")} className="flex justify-center items-center gap-3 p-5 w-full hover:cursor-pointer hover:bg-accent">
                        <UserIcon className="size-8 text-white" />

                        <h2 className="text-white text-xl font-semibold">Users</h2>
                    </li>
                </ul>

                <button className="flex justify-end items-center gap-3 w-full hover:cursor-pointer">
                    <ArrowRightStartOnRectangleIcon className="size-12 text-white" />
                    <h1 className="text-white text-2xl font-bold">Logout</h1>
                </button>
            </div>

            <div className="h-screen w-full">
                {renderPage()}
            </div>
        </div>
    );
}
