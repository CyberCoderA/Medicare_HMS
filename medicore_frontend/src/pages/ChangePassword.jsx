import { useLocation, useSearchParams } from "react-router-dom";
import CustomPasswordFieldDark from "../components/CustomPasswordFieldDark";

export default function ChangePassword() {
    const [searchParams] = useSearchParams();

    const userID = searchParams.get('userID');
    const adminID = searchParams.get('adminID');

    console.log(location.state);

    return (
        <div className="h-screen w-full bg-primary flex items-center justify-center">
            <div className="flex flex-col justify-around bg-white rounded-2xl h-1/2 w-1/2 p-5">
                <div className="flex justify-center">
                    <h1 className="text-2xl text-gray-700 font-bold">Change Password of User: {userID}</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <CustomPasswordFieldDark text="Admin Password" id="admin_password" />
                    <CustomPasswordFieldDark text="New User Password" id="user_password" />
                    <CustomPasswordFieldDark text="Confirm User Password" id="confirm_user_password" />
                </div>

                <div className="w-full flex justify-end gap-5">
                    <button className="w-42 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">Change Password</button>

                    <button className="w-22 h-12 bg-white border-primary border-2 text-primary font-semibold rounded-xl hover:cursor-pointer hover:bg-primary hover:text-white">Cancel</button>
                </div>
            </div>
        </div>
    )
}