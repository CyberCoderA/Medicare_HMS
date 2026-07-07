import CustomTextFieldDark from '../components/CustomTextFieldDark';
import ComboBox from '../components/ComboBox';
import TableOfRooms from "../components/TableOfRooms";

import axios from "axios";
import { useState, useEffect } from 'react';

export default function HospitalAdminRoomManagement() {
    const roomTypes = ["PUBLIC_WARD", "PRIVATE_WARD", "ICU", "DELIVERY_WARD", "ISOLATION_WARD"];
    const isolationState = ["FALSE", "TRUE"];

    // Default to a value so backend required param is never missing.
    const [newRoomData, setNewRoomData] = useState({ roomIsIsolation: "FALSE" });

    const [roomsData, setRoomsData] = useState([])

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
                        <CustomTextFieldDark id="roomId" text="Room Capacity" onChange={(e) => { setNewRoomData((prev) => ({ ...prev, roomCapacity: e.target.value })) }} />
                    </div>
                </div>

                <button type='submit' className="w-32 h-12 bg-primary text-white font-semibold rounded-xl hover:cursor-pointer hover:bg-accent">Create Room</button>
            </form>

            <span className='w-full h-0.5 bg-gray-700'></span>

            <TableOfRooms roomsData={roomsData}>
                {/* Actions */}
                <button className="bg-primary text-white py-1 px-4 rounded-xl hover:bg-accent hover:cursor-pointer">
                    Info
                </button>
            </TableOfRooms>
        </div>
    );
}

