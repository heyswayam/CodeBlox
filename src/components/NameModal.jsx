import React, { useState, useEffect, useRef } from "react";

export default function NameModal({ isOpen, onSave }) {
    const [name, setName] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSave = () => {
        if (name.trim()) {
            onSave(name);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto bg-black/30 backdrop-blur-sm ">
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-100 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl pointer-events-auto mt-52">
                    <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 id="hs-focus-management-modal-label" className="font-bold text-gray-800 dark:text-white">
                            Complete Your Profile
                        </h3>

                    </div>
                    <div className="p-4 overflow-y-auto">
                        <label htmlFor="name-input" className="block text-sm font-medium mb-2 text-gray-800 dark:text-white">Name</label>
                        <input
                            type="text"
                            id="name-input"
                            ref={inputRef}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="py-3 px-4 block w-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <button 
                            onClick={handleSave}
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600/80 backdrop-blur-sm text-white hover:bg-blue-700/80 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}