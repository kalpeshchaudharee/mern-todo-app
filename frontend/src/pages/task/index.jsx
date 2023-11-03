import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { toast } from 'react-toastify';
import CreateTask from "./create";
const backendUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const TaskList = () => {

    // table elements with page and size
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    // set loading on table while fetching data
    const [loading, setLoading] = useState(false);

    // task modal open or close
    const [taskFormModal, setTaskFormModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");

    // Colors for task status
    const statusColor = {
        'To Do': 'bg-blue-600',
        'In Progress': 'bg-yellow-600',
        'Done': 'bg-green-600',
    }
    // fetch tasks on initial render and (page or page size) change
    useEffect(() => {
        fetchTasks();
    }, [page, size, statusFilter]);

    function fetchTasks() {
        setLoading(true);

        // clear old data from table
        setTasks([]);
        setTotalElements(0);
        setTotalPages(1);

        console.log(statusFilter);

        fetch(`${backendUrl}/task?page=${page}&size=${size}&statusFilter=${statusFilter}`)
        .then((response) => {
            response.json().then(result => {

                if(response.ok) {
                    // set new data in table
                    setTasks(result?.data?.result || []);
    
                    if(result?.data?.page != page) {
                        setPage(result?.data?.page || 1);
                    }
    
                    if(result?.data?.size != size) {
                        setSize(result?.data?.size || 10);
                    }
    
                    setTotalElements(result?.data?.totalElements || 0);
                    setTotalPages(result?.data?.totalPages || 1);
                } else {
                    toast.error(result.message);
                }
            })
        })
        .finally(() => {
            setLoading(false)
        })
    }

    // open form on edit task
    function editTask(item) {
        setEditItem(item);
        setTaskFormModal(true);
    }

    function deleteTask(id) {
        const request = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }

        fetch(`${backendUrl}/task/delete/${id}`, request)
        .then((response) => {
            response.json().then(result => {
                if(response.ok) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
                fetchTasks();
            })
        })
    }

    // close modal and reset modal, fetch tasks
    function closeForm() {
        setEditItem(null);
        setTaskFormModal(false);
        fetchTasks();
    }

    function updateStatus(id, status) {
        const request = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status: status})
        }

        fetch(`${backendUrl}/task/update/${id}`, request)
        .then((response) => {
            response.json().then(result => {
                if(response.ok) {
                    toast.success('Task status Updated');
                } else {
                    toast.error(result.message);
                }
                fetchTasks()
            })
        })
    }

    return (
        <>
        <div className="md:w-9/12 mx-5 md:mx-auto mt-5 border border-border-gray rounded p-5">
            <div className="flex justify-between flex-wrap">
                {/* page size */}
                <select
                    name="size"
                    id="size"
                    value={size}
                    onInput={(e) => setSize(e.target.value)}
                    className="w-2/12 rounded border border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-auto"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>

                {/* filter by status */}
                <div className="my-auto">
                    <label htmlFor="statusFilter" className="text-sm font-medium leading-6 mr-2">
                        Status:
                    </label>
                    <select
                        name="statusFilter"
                        id="statusFilter"
                        value={statusFilter}
                        onInput={(e) => setStatusFilter(e.target.value)}
                        className="rounded border border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-auto"
                    >
                        <option value="">All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {/* create new task */}
                <button onClick={() => setTaskFormModal(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-5 text-center" type="button">
                    + Create Task
                </button>
            </div>

            {/* create task form */}
            <CreateTask open={taskFormModal} closeForm={closeForm} editItem={editItem} />

            <div className="overflow-y-auto" style={{height: '65vh'}}>
                <table className="w-full table-auto text-center overflow-y-auto overflow-x-auto mx-auto">
                    <thead className="bg-zinc-400 text-white h-12 sticky top-0">
                        <tr>
                            <th className="rounded-l-lg whitespace-nowrap px-12">Created Date</th>
                            <th className="px-12">Task</th>
                            <th className="px-12">Description</th>
                            <th className="px-12">Status</th>
                            <th className="rounded-r-lg px-12">Action</th>
                        </tr>
                    </thead>
                    <tbody className="h-2/4 overflow-y-auto">
                    {
                        tasks.map((task, index) => (
                            <tr key={index} className="h-14 border-b hover:bg-zinc-100">
                                <td>
                                    <p>{moment(task.createdAt).format('MMM Do YYYY')}</p>
                                    <p className="text-sm text-zinc-500">at {moment(task.createdAt).format('h:mm a')}</p>
                                </td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <select
                                        name="statusFilter"
                                        id="statusFilter"
                                        value={task.status}
                                        onInput={(e) => updateStatus(task._id, e.target.value)}
                                        className="rounded border border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-auto"
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                    {/* task status in pill */}
                                    {/* <span className={`text-white text-sm px-2 py-1 rounded-full ${statusColor[task.status]}`}>{task.status}</span> */}
                                </td>
                                <td>
                                    {/* edit button for edit task */}
                                    <button onClick={() => editTask(task)} className="text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1 text-center" type="button">Edit</button>
                                    {/* delete button */}
                                    <button onClick={() => deleteTask(task._id)} className="ml-4 text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-3 py-1 text-center" type="button">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {/* loader for fetching table data */}
                {
                    loading &&
                    <svg className="animate-spin h-12 w-5 mx-auto text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                }
            </div>

            <div className="flex justify-between flex-wrap">
                {/* page result and count of elements show */}
                <p className="text-sm text-gray-700 my-auto">
                    Showing <span className="font-medium">{((page - 1) * size) + 1}</span> to <span className="font-medium">{((page - 1) * size) + tasks.length}</span> of{' '}
                    <span className="font-medium">{totalElements}</span> results
                </p>

                {/* pagination */}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm my-5"
                    disabledLinkClassName="cursor-default"
                    disabledClassName="hover:bg-white opacity-75 text-gray-300"
                    previousClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                    nextClassName="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                    activeClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-400"
                    breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                    pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                    onPageChange={(e) => setPage(e.selected + 1)}
                    pageRangeDisplayed={size}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
        </>
    )
}

export default TaskList;