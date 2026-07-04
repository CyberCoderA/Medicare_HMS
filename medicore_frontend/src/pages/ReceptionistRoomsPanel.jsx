import axios from "axios";
import { useEffect, useState } from "react";

export default function ReceptionistRoomsPanel() {
  const [roomsData, setRoomsData] = useState([])

  useEffect(() => {
    // Fetch rooms data from the backend API
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/rooms/allRooms", {
          withCredentials: true,
        });
        
        console.log(response.data);
        setRoomsData(response.data);
      } catch (error) {
        console.log("Error fetching rooms:", error);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div className="h-screen flex flex-col gap-10 p-5">
      <h1 className="text-2xl font-bold">Rooms</h1>
      <div className="flex flex-col gap-4">
        {roomsData.map((room) => (
          <div key={room.roomId} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Room Number: {room.roomId}</h2>
            <p>Room Type: {room.roomType}</p>
            <p>Room Status: {room.roomStatus}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
