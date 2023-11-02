import { useEffect, useState } from "react";
import CreateTask from "./create";
const backendUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [taskFormModal, setTaskFormModal] = useState(false);

    function fetchTasks() {
        setLoading(true);
        fetch(`${backendUrl}/task`)
        .then((response) => {
            response.json().then(result => {
                setTasks(result.data);
            })
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    function closeForm() {
        setTaskFormModal(false)
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="md:w-6/12 mx-5 md:mx-auto mt-5 border border-border-gray rounded p-5">
            <button onClick={() => setTaskFormModal(true)} className="mx-auto mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                + Create Task
            </button>
            <CreateTask open={taskFormModal} closeForm={closeForm} />
            <div className="overflow-y-auto my-5" style={{height: '65vh'}}>
                <table className="w-full text-center overflow-y-auto mx-auto">
                    <thead className="bg-zinc-400 text-white h-12 sticky top-0">
                        <tr>
                            <th className="rounded-l-lg">Task</th>
                            <th>Description</th>
                            <th className="rounded-r-lg">Status</th>
                        </tr>
                    </thead>
                    <tbody className="h-2/4 overflow-y-auto">
                    {
                        tasks.map((task, index) => (
                            <tr key={index} className="h-12 border-b hover:bg-zinc-100">
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    loading &&
                    <svg className="animate-spin h-12 w-5 mx-auto text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                }
            </div>
        </div>
    )
}

export default TaskList;