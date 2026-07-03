import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CustomPasswordFieldDark from "../components/CustomPasswordFieldDark";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [isAdminPasswordVisible, setAdminPasswordVisible] = useState(false);
    const [isNewUserPasswordVisible, setNewUserPasswordVisible] = useState(false);
    const [isConfirmUserPasswordVisible, setConfirmUserPasswordVisible] = useState(false);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const userID = searchParams.get('userID');
    const adminID = searchParams.get('adminID');
    const userUsername = searchParams.get('username');

    const handleChangePassword = async(event) => {
        try {
            event.preventDefault();
            const adminPassword = event.target.admin_password.value;
            const newUserPassword = event.target.user_password.value;
            const confirmUserPassword = event.target.confirm_user_password.value;

            const params = new URLSearchParams();
            params.append('userID', userID);
            params.append('adminID', adminID);
            params.append('adminPassword', adminPassword);
            params.append('newPassword', newUserPassword);
                    // Validate that the new password and confirm password match
            if(newUserPassword === confirmUserPassword) {
                // Call the API to change the user's password
                await axios.post('http://localhost:8080/api/users/changeUserPassword', params, {
                    withCredentials: true,
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then(() => {
                    alert("Password changed successfully!");
                    navigate(-1); // Go back to the previous page
                })
                .catch(() => {
                    alert("Failed to change password.");
                });
            } else {
                alert("New password and confirm password do not match.");
                return;
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("An error occurred while changing the password.");
        }
    }

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    }

    return (
        <div className="h-screen w-full bg-primary flex items-center justify-center">
            <form className="flex flex-col justify-around bg-white rounded-2xl h-1/2 w-1/2 p-5" onSubmit={handleChangePassword}>
                <div className="flex justify-center">
                    <h1 className="text-2xl text-gray-700 font-bold">Change Password of User: {userUsername}</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <CustomPasswordFieldDark text="Admin Password" id="admin_password" isPassVisible={isAdminPasswordVisible} setPassVisible={setAdminPasswordVisible} />
                    <CustomPasswordFieldDark text="New User Password" id="user_password" isPassVisible={isNewUserPasswordVisible} setPassVisible={setNewUserPasswordVisible} />
                    <CustomPasswordFieldDark text="Confirm User Password" id="confirm_user_password" isPassVisible={isConfirmUserPasswordVisible} setPassVisible={setConfirmUserPasswordVisible} />
                </div>

                <div className="w-full flex justify-end gap-5">
                    <button type="submit" className="w-42 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">
                        Change Password
                    </button>

                    <button className="w-22 h-12 bg-white border-primary border-2 text-primary font-semibold rounded-xl hover:cursor-pointer hover:bg-primary hover:text-white" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}