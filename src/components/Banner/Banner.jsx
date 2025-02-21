import { Link } from "react-router";

const Banner = () => {
    return (
        <div
            className="hero h-[400px]"
            style={{
                backgroundImage: "url(https://i.ibb.co.com/SX7C8gLB/24817783-77z-2203-w009-n001-117a-p25-117.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Task Manager</h1>
                    <p className="mb-5"> Stay organized and boost productivity with Task Manager. Effortlessly track your tasks, prioritize work, and seamlessly move tasks between categories. Manage your workflow with ease and never miss a deadline! </p>
                    <Link to='/add-task' className="btn btn-primary">Get Task</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;