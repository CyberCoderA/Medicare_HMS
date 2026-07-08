import CustomTextFieldDark from '../components/CustomTextFieldDark';
import ComboBox from '../components/ComboBox';
import TableOfRooms from "../components/TableOfRooms";
import Modal from "../components/Modal"

import axios from "axios";
import { useState, useEffect } from 'react';

export default function HospitalAdminRoomManagement() {
    const roomStatus = ["AVAILABLE", "OCCUPIED", "FULLY_OCCUPIED", "RESERVED", "MAINTENANCE", "CLEANING"];
    const roomTypes = ["PUBLIC_WARD", "PRIVATE_WARD", "ICU", "DELIVERY_WARD", "ISOLATION_WARD"];
    const isolationState = ["FALSE", "TRUE"];

    // Default to a value so backend required param is never missing.
    const [newRoomData, setNewRoomData] = useState({ roomIsIsolation: "FALSE" });
    const [isEditModalStatus, setEditModalStatus] = useState(false);
    const [isDeleteModalStatus, setDeleteModalStatus] = useState(false);

    const [roomsData, setRoomsData] = useState([])
    const [editRoomData, setEditRoomData] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRooms() {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/rooms/allRooms",
                    {
                        withCredentials: true,
                        signal: controller.signal
                    }
                );

                setRoomsData(response.data);
            } catch (error) {
                if (error.name !== "CanceledError" && error.name !== "AbortError") {
                    console.error("Error fetching rooms:", error);
                }
            }
        }

        fetchRooms();
        return () => controller.abort();
    }, []);

    const handleEditModal = (room) => {
        setEditRoomData(room);
        setEditModalStatus(true);
    }

    const handleDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteModalStatus(true);
    }

    const handleRoomUpdate = async (e) => {
        try {
            e.preventDefault();

            const editedRoomData = {
                roomId: editRoomData.roomId,
                roomStatus: editRoomData.roomStatus,
                roomType: editRoomData.roomType,
                roomIsIsolation: editRoomData.roomIsIsolation,
                roomCapacity: Number.parseInt(editRoomData.roomCapacity)
            };

            await axios.post("http://localhost:8080/api/rooms/updateRoom", {}, { params: editedRoomData, withCredentials: true });

            setEditModalStatus(false);

            const response = await axios.get(
                "http://localhost:8080/api/rooms/allRooms",
                {
                    withCredentials: true,
                }
            );

            setRoomsData(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteRoom = async (e) => {
        e.preventDefault();

        const response = await axios.post("http://localhost:8080/api/rooms/deleteRoom", {}, { params: {room_id: deleteId}, withCredentials: true });

        console.log(response.data);

        const roomResponse = await axios.get(
            "http://localhost:8080/api/rooms/allRooms",
            {
                withCredentials: true,
            }
        );

        setRoomsData(roomResponse.data);
        setDeleteModalStatus(false);
    }

    const handleRoomCreation = async (e) => {
        try {
            e.preventDefault();

            const roomCapacityInt = Number.parseInt(newRoomData.roomCapacity, 10);
            const roomIsIsolation = newRoomData.roomIsIsolation || "FALSE";

            if (!newRoomData.roomId || !newRoomData.roomType) {
                console.log("Missing room_id or room_type");
                return;
            }

            if (Number.isNaN(roomCapacityInt)) {
                console.log("room_capacity must be a number");
                return;
            }

            const newRoom = {
                room_id: newRoomData.roomId,
                room_type: newRoomData.roomType,
                room_capacity: roomCapacityInt,
                room_isIsolation: roomIsIsolation
            };

            await axios.post("http://localhost:8080/api/rooms/addRoom", {}, {
                withCredentials: true,
                params: newRoom
            });

            setNewRoomData({ roomIsIsolation: "FALSE" });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen flex flex-col gap-10 p-5">
            <h1 className="text-4xl text-gray-700 font-semibold">Rooms Management</h1>
            <form onSubmit={handleRoomCreation} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl text-gray-800 font-semibold">Room ID:</h2>
                    <CustomTextFieldDark id="roomId" text="Room ID" onChange={(e) => { setNewRoomData((prev) => ({ ...prev, roomId: e.target.value })) }} />
                </div>

                <div className="flex gap-5">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl text-gray-800 font-semibold">Room Type:</h2>
                        <ComboBox options={roomTypes} onChange={(e) => { setNewRoomData((prev) => ({ ...prev, roomType: e.target.value })) }} />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <h2 className="text-2xl text-gray-800 font-semibold">Is in Isolation:</h2>
                        <ComboBox options={isolationState} onChange={(e) => { setNewRoomData((prev) => ({ ...prev, roomIsIsolation: e.target.value })) }} />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <h2 className="text-2xl text-gray-800 font-semibold">Room Capacity:</h2>
                        <CustomTextFieldDark id="roomCapacity" text="Room Capacity" onChange={(e) => { setNewRoomData((prev) => ({ ...prev, roomCapacity: e.target.value })) }} />
                    </div>
                </div>

                <button type='submit' className="w-32 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">Create Room</button>
            </form>

            <span className='w-full h-0.5 bg-gray-700'></span>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalStatus} title="Edit Room Info" onClose={() => setEditModalStatus(false)}>
                <form onSubmit={handleRoomUpdate} className='flex flex-col justify-between gap-5'>
                    <div className='flex flex-col gap-2'>
                        <h1 className="text-2xl text-gray-800 font-semibold">Room ID: </h1>
                        <CustomTextFieldDark
                            text="Username"
                            id="username"
                            value={editRoomData.roomId}
                            onChange={(e) => setEditRoomData((prev) => ({ ...prev, roomId: e.target.value }))}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className="text-2xl text-gray-800 font-semibold">Room Status: </h1>
                        <ComboBox options={roomStatus} value={editRoomData.roomStatus} onChange={(e) => { setEditRoomData((prev) => ({ ...prev, roomStatus: e.target.value })) }} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className="text-2xl text-gray-800 font-semibold">Room Type: </h1>
                        <ComboBox options={roomTypes} value={editRoomData.roomType} onChange={(e) => { setEditRoomData((prev) => ({ ...prev, roomType: e.target.value })) }} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className="text-2xl text-gray-800 font-semibold">Is in Isolation: </h1>
                        <ComboBox options={isolationState} value={editRoomData.roomIsIsolation ? isolationState[1] : isolationState[0]} onChange={(e) => { setEditRoomData((prev) => ({ ...prev, roomIsIsolation: e.target.value })) }} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h1 className="text-2xl text-gray-800 font-semibold">Room Capacity: </h1>
                        <CustomTextFieldDark id="roomId" value={editRoomData.roomCapacity} text="Room Capacity" onChange={(e) => { setEditRoomData((prev) => ({ ...prev, roomCapacity: e.target.value })) }} />
                    </div>

                    <div className='w-full flex justify-end'>
                        <button type='submit' className="w-32 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">Update Room</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteModalStatus} title="Delete Room?" onClose={() => setDeleteModalStatus(false)}>
                <form className="flex" onSubmit={handleDeleteRoom}>
                    <h1>Are you sure you want to delete {deleteId}?</h1>
                    <button type="submit" className="w-30 h-10 border-2 border-red-500 bg-white text-red-500 text-sm font-semibold rounded-xl hover:cursor-pointer hover:bg-red-500 hover:text-white">Delete Room</button>
                </form>
            </Modal>

            <TableOfRooms roomsData={roomsData}>
                {(room) => (
                    <div className='flex gap-2'>
                        <button
                            onClick={() => handleEditModal(room)}
                            className="bg-primary text-sm font-semibold text-white py-2 px-4 rounded-xl hover:bg-accent hover:cursor-pointer"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => { handleDeleteModal(room.roomId) }}
                            className="py-2 px-3 bg-red-500 text-white text-sm font-semibold rounded-xl hover:cursor-pointer hover:bg-red-400"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </TableOfRooms>

        </div>
    );
}

