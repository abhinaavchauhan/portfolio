import React, { useState } from 'react';
import { projects } from '../../data/projects';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminProjects = () => {
    const [projectList, setProjectList] = useState(projects);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            setProjectList(projectList.filter(p => p.id !== id));
            toast.success("Project deleted successfully");
        }
    };

    const handleEdit = (id) => {
        toast.info(`Edit functionality for ID ${id} (Mock)`);
    };

    const handleAdd = () => {
        toast.info("Add Project functionality (Mock)");
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Projects</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <FaPlus /> Add New Project
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300">
                        <tr>
                            <th className="p-4">Project Name</th>
                            <th className="p-4 hidden md:table-cell">Category</th>
                            <th className="p-4 hidden sm:table-cell">Tech Stack</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {projectList.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                                <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{project.title}</td>
                                <td className="p-4 hidden md:table-cell text-gray-600 dark:text-gray-400">{project.category}</td>
                                <td className="p-4 hidden sm:table-cell">
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 2).map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">{tech}</span>
                                        ))}
                                        {project.technologies.length > 2 && <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full">+{project.technologies.length - 2}</span>}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <button onClick={() => handleEdit(project.id)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                                        <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProjects;
