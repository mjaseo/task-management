const statusStyles = {
    to_do: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800',
};

const StatusBadge = ({ status }) => {
    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
        >
            {status.replace('_', ' ')}
        </span>
    );
};

export default StatusBadge;
