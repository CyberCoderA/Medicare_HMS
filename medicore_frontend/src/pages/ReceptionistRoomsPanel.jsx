import axios from "axios";
import { useEffect, useState } from "react";
import TableOfRooms from "../components/TableOfRooms";

export default function ReceptionistRoomsPanel() {
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

  return (
    <div className="h-screen flex flex-col gap-10 p-5">
      <h1 className="text-4xl text-gray-700 font-semibold">Rooms</h1>
      <TableOfRooms roomsData={roomsData} />
    </div>
  )
}
