const Modal = ({ open, closeModal, title, children }) => {

    return (
        // transition: opacity .15s linear;
        <div className={!open ? 'hidden': ''}>
            <div id="default-modal" className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-100 bg-opacity-50`}>
                <div className="relative w-full max-w-2xl max-h-full mx-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-25"></div>
        </div>

    )
}

export default Modal;