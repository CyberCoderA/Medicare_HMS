import { useEffect } from "react";

export default function Toast({ onClose, children }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);
    
    return (
        <div className="fixed inset-0 z-50">
            <div className=" flex min-h-screen items-end justify-end">
                    <div className="bg-gray-50 h-1/2 w-1/4 rounded-lg m-5 p-6 shadow-black shadow-md border-l-6 border-l-green-400">
                        {children}
                    </div>
                </div>
        </div>
    )
}