import { useForm } from 'react-hook-form';
import Modal from "../../components/Modal";
const backendUrl = import.meta.env.VITE_BACKEND_SERVER_URL;

const CreateTask = ({open, closeForm}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
      } = useForm();

      function closeAndReset() {
        closeForm();
        reset();
        clearErrors();
      }

      async function submitForm (data) {
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch(`${backendUrl}/task/create`, request)
        .then((response) => {
            response.json().then(result => {
                console.log(result.data);
            })
            closeAndReset()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Modal open={open} closeModal={closeAndReset} title="Create Task">
                <form onSubmit={handleSubmit(submitForm)} className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6">
                            Title <span className="text-gray-400">(Required)</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            {...register('title', { required: true })}
                            className={`w-full flex-1 rounded border ${errors.title ? 'border-red-400' : 'border-gray-300'} bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            placeholder="title goes here..."
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-2">This field is required</p>}
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="description" className="block text-sm font-medium leading-6">
                            Description <span className="text-gray-400">(Required)</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            {...register('description', { required: true })}
                            className={`w-full flex-1 rounded border ${errors.description ? 'border-red-400' : 'border-gray-300'} bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            placeholder="description goes here..."
                        />
                        {errors.description && <p className="text-red-400 text-sm">This field is required</p>}
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="status" className="block text-sm font-medium leading-6">
                            Status <span className="text-gray-400">(Required)</span>
                        </label>
                        <select
                            name="status"
                            id="status"
                            {...register('status', { required: true })}
                            className={`w-full flex-1 rounded border ${errors.status ? 'border-red-400' : 'border-gray-300'} bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        {errors.status && <p className="text-red-400 text-sm mt-2">This field is required</p>}
                    </div>

                    <div className="sm:col-span-4 space-x-2">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                        <button onClick={closeAndReset} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Close</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default CreateTask;