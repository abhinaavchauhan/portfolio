import React, { useState } from 'react';
import { FaTrash, FaEnvelopeOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminMessages = () => {
    // Mock messages
    const [messages, setMessages] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", message: "Hi, I'd like to discuss a project.", date: "2024-02-15", read: false },
        { id: 2, name: "Jane Smith", email: "jane@test.com", message: "Love your portfolio design!", date: "2024-02-14", read: true },
        { id: 3, name: "Recruiter Bob", email: "bob@tech.com", message: "We have an opening for React Dev.", date: "2024-02-13", read: false },
    ]);

    const handleDelete = (id) => {
        setMessages(messages.filter(m => m.id !== id));
        toast.success("Message deleted");
    };

    const toggleRead = (id) => {
        setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Messages</h1>

            <div className="space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border ${msg.read ? 'border-gray-100 dark:border-gray-700' : 'border-l-4 border-l-blue-500 border-y-gray-100 border-r-gray-100 dark:border-y-gray-700 dark:border-r-gray-700'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{msg.name} <span className="text-xs font-normal text-gray-500 ml-2">&lt;{msg.email}&gt;</span></h3>
                                <p className="text-xs text-gray-400">{msg.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => toggleRead(msg.id)}
                                    className={`p-2 rounded-full ${msg.read ? 'text-gray-400 bg-gray-100 dark:bg-slate-700' : 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'}`}
                                    title={msg.read ? "Mark as Unread" : "Mark as Read"}
                                >
                                    <FaEnvelopeOpen />
                                </button>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                            {msg.message}
                        </p>
                    </div>
                ))}

                {messages.length === 0 && <p className="text-center text-gray-500">No messages found.</p>}
            </div>
        </div>
    );
};

export default AdminMessages;
