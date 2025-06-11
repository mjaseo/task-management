import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const TaskItem = ({ task, onDelete }) => {
    return (
        <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between items-start">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">{task.description}</p>
                <StatusBadge status={task.status} />
            </div>
            <div className="flex flex-col gap-2 items-end">
                <Link
                    to={`/tasks/${task.id}/edit`}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TaskItem;
