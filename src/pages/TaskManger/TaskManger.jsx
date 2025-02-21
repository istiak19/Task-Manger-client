import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

const fetchTasks = async () => {
    const res = await fetch('https://taskmanager-server-three.vercel.app/tasks');
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const data = await res.json();
    return {
        'To-Do': data.filter(task => task.category === 'To-Do'),
        'In Progress': data.filter(task => task.category === 'In Progress'),
        'Done': data.filter(task => task.category === 'Done'),
    };
};

const TaskManager = () => {
    const queryClient = useQueryClient();
    const { data: tasks, isLoading, error } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

    const deleteMutation = useMutation({
        mutationFn: async (taskId) => {
            await fetch(`https://taskmanager-server-three.vercel.app/tasks/${taskId}`, { method: 'DELETE' });
        },
        onSuccess: () => queryClient.invalidateQueries(['tasks']),
    });

    const updateMutation = useMutation({
        mutationFn: async ({ taskId, updatedData }) => {
            await fetch(`https://taskmanager-server-three.vercel.app/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
        },
        onSuccess: () => queryClient.invalidateQueries(['tasks']),
    });

    const moveMutation = useMutation({
        mutationFn: async ({ taskId, fromCategory, toCategory }) => {
            const updateInfo = { taskId, fromCategory, toCategory }; // Ensure taskId is sent
            await fetch(`https://taskmanager-server-three.vercel.app/tasks/move/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateInfo),
            });
        },
        onMutate: async ({ taskId, fromCategory, toCategory }) => {
            await queryClient.cancelQueries(['tasks']);
            const previousTasks = queryClient.getQueryData(['tasks']);
            const taskToMove = previousTasks[fromCategory]?.find(task => task._id === taskId);
            if (taskToMove) {
                queryClient.setQueryData(['tasks'], {
                    ...previousTasks,
                    [fromCategory]: previousTasks[fromCategory].filter(task => task._id !== taskId),
                    [toCategory]: [...previousTasks[toCategory], taskToMove],
                });
            }
    
            return { previousTasks };
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });
    

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>Error loading tasks: {error.message}</div>;
    if (!tasks) return <div>No tasks found</div>;

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="task-manager grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {['To-Do', 'In Progress', 'Done'].map(category => (
                    <TaskList
                        key={category}
                        category={category}
                        tasks={tasks[category]}
                        onDelete={deleteMutation.mutate}
                        onMove={moveMutation.mutate}
                        onUpdate={updateMutation.mutate}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

const TaskList = ({ category, tasks, onDelete, onMove, onUpdate }) => {
    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (draggedItem) => {
            if (draggedItem.category !== category) {
                onMove({ taskId: draggedItem.id, fromCategory: draggedItem.category, toCategory: category });
                draggedItem.category = category;
            }
        },
    });

    return (
        <div ref={drop} className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[250px] md:min-h-[300px]">
            <h2 className="text-lg font-semibold mb-2 text-center md:text-left">{category}</h2>
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks</p>
            ) : (
                tasks.map((task, index) => (
                    <Task
                        key={task?._id}
                        task={task}
                        category={category}
                        onDelete={onDelete}
                        onMove={onMove}
                        onUpdate={onUpdate}
                        index={index}
                    />
                ))
            )}
        </div>
    );
};

const Task = ({ task, category, onDelete, onMove, onUpdate, index }) => {
    const [, drag] = useDrag({
        type: 'TASK',
        item: { id: task?._id, index, category },
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task?.title);
    const [editedDescription, setEditedDescription] = useState(task?.description);

    const handleEdit = () => {
        onUpdate({ taskId: task?._id, updatedData: { title: editedTitle, description: editedDescription } });
        setIsEditing(false);
    };

    const formattedTime = new Date(task?.timestamp).toLocaleString();

    return (
        <div ref={drag} className="bg-white p-3 rounded-md shadow-md mb-2 cursor-pointer hover:bg-gray-200 transition duration-300">
            {isEditing ? (
                <div>
                    <input
                        className="border p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto" onClick={handleEdit}>
                            Save
                        </button>
                        <button className="text-gray-600 w-full sm:w-auto" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="font-semibold text-lg sm:text-xl">{task?.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base"><span className='font-semibold'>Description:</span> {task?.description}</p>
                    <p className="text-gray-500 text-xs sm:text-sm"><span className='font-semibold'>Created:</span> {formattedTime}</p>
                    <div className="flex gap-2 mt-2 flex-col sm:flex-row">
                        <button className="text-blue-500 hover:underline" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="text-red-500 hover:underline" onClick={() => onDelete(task?._id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskManager;