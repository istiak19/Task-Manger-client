import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddTask = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const time = new Date().toISOString();

        const taskData = {
            title,
            description,
            category,
            timestamp: time,
        };
        const res = await axios.post('https://taskmanager-server-three.vercel.app/tasks', taskData);
        const data = res.data;
        if (data.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Task create successful!",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/task');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Create a New Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        maxLength="50"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        maxLength="200"
                        className="w-full p-2 border rounded-md"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
