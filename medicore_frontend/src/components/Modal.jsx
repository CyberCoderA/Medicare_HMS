import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm">
                <div className="relative flex min-h-screen items-center justify-center">
                    <div className="bg-white h-1/2 w-1/3 rounded-lg p-6 shadow-xl flex flex-col gap-5">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-gray-800 text-2xl font-bold">{title}</h2>
                            <button onClick={onClose}><XMarkIcon className="size-8 text-gray-600 hover:text-gray-800 hover:cursor-pointer" /></button>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}