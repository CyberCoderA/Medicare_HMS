export default function TableOfRooms({ roomsData, children }) {
    const renderRoomStatus = (status) => {
        switch (status) {
            case "OCCUPIED":
                return "bg-blue-200"
            case "FULLY_OCCUPIED":
                return "bg-yellow-200"
            case "MAINTENANCE":
                return "bg-red-200"
            default:
                return "bg-green-200"
        }
    }

    return (
        <div className="flex flex-row gap-3 flex-wrap">
            {roomsData.map((room) => (
                <div key={room.roomId} className={`${renderRoomStatus(room.roomStatus)} h-60 w-56 p-4 rounded border flex flex-col justify-center items-center gap-2`}>
                    <h2 className="text-lg font-semibold">{room.roomId}</h2>
                    <p>Type: {room.roomType}</p>
                    <p>Status: {room.roomStatus}</p>
                    <p>Occupants: {room.roomOccupants}/{room.roomCapacity}</p>

                    {typeof children === "function" ? children(room) : children}
                </div>
            ))}
        </div>
    )
}
