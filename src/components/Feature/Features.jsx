const Features = () => {
    return (
        <section id="features" className="py-20 bg-white text-center">
            <div className="max-w-screen-lg mx-auto">
                <h2 className="text-3xl font-semibold">Features</h2>
                <p className="mt-4 text-lg text-gray-700">Discover all the features that make task management simple and efficient.</p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-indigo-600">Task Categories</h3>
                        <p className="mt-4">Organize tasks into categories like 'To-Do', 'In Progress', and 'Done' for better management.</p>
                    </div>

                    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-indigo-600">Real-Time Sync</h3>
                        <p className="mt-4">All your tasks are synced in real-time, so you're always up-to-date on your progress.</p>
                    </div>

                    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-indigo-600">Drag & Drop</h3>
                        <p className="mt-4">Easily move tasks between categories with a simple drag-and-drop interface.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;