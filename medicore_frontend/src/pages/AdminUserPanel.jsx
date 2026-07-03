import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Modal from "../components/Modal";
import CustomTextFieldDark from "../components/CustomTextFieldDark";
import CustomPasswordFieldDark from "../components/CustomPasswordFieldDark";
import ComboBox from "../components/ComboBox";
import axios from "axios";
import { UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Toast from "../components/Toast";

export default function AdminUserPanel() {
  const userTypes = ["TECHNICAL_ADMIN", "HOSPITAL_ADMIN", "DOCTOR", "RECEPTIONIST"];
  const [isUserModal, setUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [isPassVisible, setPassVisible] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [userAddInfo, setUserAddInfo] = useState({});

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/allUsers", {
          withCredentials: true,
        });
        setUsersData(response.data);
      }
      catch (error) {
        console.log(error);
      }
    };

    fetchUsersData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserAddInfo({
      ...userAddInfo,
      [e.target.name]: value,
    });
  };

  const processAddUser = async (e) => {
    try {
      e.preventDefault();

      const newUserData = {
        username: userAddInfo.username,
        fname: userAddInfo.fname,
        lname: userAddInfo.lname,
        password: userAddInfo.password,
        userType: userAddInfo.userType,
      };

      const response = await axios.post("http://localhost:8080/api/users/addUser", null, {
        params: newUserData,
        withCredentials: true,
      });

      console.log(response.data);

      const tableResponse = await axios.get("http://localhost:8080/api/users/allUsers", {
        withCredentials: true,
      });
      setUsersData(tableResponse.data);

      setUserModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const processUpdateUser = async (e) => {
    try {
      e.preventDefault();

      const editedUserData = {
        id: editUserData.userId,
        username: editUserData.username,
        fname: editUserData.userFname,
        lname: editUserData.userLname,
        userType: editUserData.userType,
      }

      const response = await axios.post("http://localhost:8080/api/users/updateUser", {}, { params: editedUserData, withCredentials: true });

      console.log(response.data);
      setEditUserModal(false);

      const tableResponse = await axios.get("http://localhost:8080/api/users/allUsers", {
        withCredentials: true,
      });
      setUsersData(tableResponse.data);

    } catch (error) {
      console.log(error)
    }
  }

  const processDeleteUser = async (e) => {
    try {
      e.preventDefault();

      console.log(deleteUserId)

      const response = await axios.post("http://localhost:8080/api/users/deleteUser", null, {params: {id: deleteUserId}, withCredentials: true});

      console.log(response.data);
      setDeleteUserModal(false);

      const tableResponse = await axios.get("http://localhost:8080/api/users/allUsers", {
        withCredentials: true,
      });
      setUsersData(tableResponse.data);
    } catch (error) {
      console.log(error)
    }
  }

  function handleEditUser(user) {
    setEditUserData(user);
    setEditUserModal(true);
  }


  function handleDeleteUser(id) {
    setDeleteUserId(id);
    setDeleteUserModal(true);
  }

  return (
    <div className="h-screen flex flex-col gap-10 p-5">
      {/* User Creation Modal */}
      <Modal isOpen={isUserModal} title="Add User" onClose={() => setUserModal(false)}>
        <form onSubmit={processAddUser} className="flex flex-col gap-5">
          <CustomTextFieldDark text="Username" id="username" onChange={handleChange} icon={<UserIcon className="size-6 text-gray-800" />} />

          <CustomTextFieldDark text="First Name" id="fname" onChange={handleChange} />

          <CustomTextFieldDark text="Last Name" id="lname" onChange={handleChange} />

          <CustomPasswordFieldDark text="Password" id="password" onChange={handleChange} isPassVisible={isPassVisible} setPassVisible={setPassVisible} />

          <ComboBox options={userTypes} onChange={handleChange} />

          <div className="w-full flex justify-end">
            <button type="submit" className="flex justify-center items-center gap-2 w-33 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent"><UserPlusIcon className="text-white size-8" /> Add User</button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={editUserModal} title="Edit User" onClose={() => setEditUserModal(false)}>
        <form onSubmit={processUpdateUser} className="flex flex-col justify-between gap-5">
          <h1 className="text-2xl text-gray-800 font-semibold">User ID: {editUserData.userId}</h1>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-gray-800">Username:</h2>
              <CustomTextFieldDark
                text="Username"
                id="username"
                value={editUserData.username}
                onChange={(e) => setEditUserData((prev) => ({ ...prev, username: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-gray-800">First Name:</h2>
              <CustomTextFieldDark
                text="First Name"
                id="userFname"
                value={editUserData.userFname}
                onChange={(e) => setEditUserData((prev) => ({ ...prev, userFname: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-gray-800">Last Name:</h2>
              <CustomTextFieldDark
                text="Last Name"
                id="userLname"
                value={editUserData.userLname}
                onChange={(e) => setEditUserData((prev) => ({ ...prev, userLname: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-gray-800">User Roles:</h2>
              <ComboBox options={userTypes} value={editUserData.userType} onChange={(e) => setEditUserData((prev) => ({ ...prev, userType: e.target.value }))} />
            </div>
          </div>

          <div className="w-full flex justify-end gap-5">
            <button type="submit" className="w-32 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">Update</button>

            {/* Change hardcoded data with appropriate admin id when session is added */}
            <Link to={`/changePassword?adminID=uid_001&userID=${editUserData.userId}&username=${editUserData.username}`}>
              <button type="button" className="w-42 h-12 bg-white border-primary border-2 text-primary font-semibold rounded-xl hover:cursor-pointer hover:bg-primary hover:text-white">Change Password</button>
            </Link>
          </div>
        </form>
      </Modal>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-gray-700 font-semibold">Users</h1>
          <p className="text-md text-gray-600">A table of all the user accounts in the system, along with actionable components.</p>
        </div>

        <div className="flex gap-5">
          <button className="w-32 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent" onClick={() => setUserModal(true)}>Add</button>

          <button onClick={() => setShowToast(true)} className="w-32 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">Settings</button>

          {showToast && (
            <Toast onClose={() => setShowToast(false)}>
              <h1>Test Toast!</h1>
            </Toast>
          )}

        </div>
      </div>

      {/* Delete User Modal */}
      <Modal isOpen={deleteUserModal} title="Delete User" onClose={() => setDeleteUserModal(false)}>
        <form className="flex" onSubmit={processDeleteUser}>
          <h1>Are you sure you want to delete {deleteUserId}?</h1>
            <button type="submit" className="w-30 h-10 border-2 border-red-500 bg-white text-red-500 text-sm font-semibold rounded-xl hover:cursor-pointer hover:bg-red-500 hover:text-white">Delete User</button>
        </form>
      </Modal>

      <table className="w-full h-5/4 table-fixed border-2 overflow-x-scroll">
        


        

        <thead>
            <tr className="bg-gray-200">
            <th className="border px-2 py-1 break-words whitespace-normal">ID</th>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">First Name</th>
            <th className="border px-2 py-1">Last Name</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Timestamp</th>
            <th className="border px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((u) => (
            <tr className="h-20 align-top" key={u.userId}>
              <td className="border px-2 py-1 break-words whitespace-normal">{u.userId}</td>
              <td className="border px-2 py-1 break-words whitespace-normal">{u.username}</td>
              <td className="border px-2 py-1 break-words whitespace-normal">{u.userFname}</td>
              <td className="border px-2 py-1 break-words whitespace-normal">{u.userLname}</td>
              <td className="border px-2 py-1 break-words whitespace-normal">{u.userType}</td>
              <td className="border px-2 py-1 break-words whitespace-normal">{u.userCreated}</td>
              <td className="px-2 py-1 flex justify-center gap-3">
                <button className="w-17 h-10 bg-primary text-white text-sm font-semibold rounded-xl hover:cursor-pointer hover:bg-accent"
                onClick={() => handleEditUser(u)}>Edit</button>

                <button onClick={() => handleDeleteUser(u.userId)} className="w-17 h-10 bg-red-500 text-white text-sm font-semibold rounded-xl hover:cursor-pointer hover:bg-red-400">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}