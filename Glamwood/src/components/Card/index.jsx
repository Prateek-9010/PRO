import React from 'react'

const Card = ({firstName , employeeStatus}) => {
  return (
    <div className="mt-5">
          <div className="w-1/4 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col mt-4 items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {firstName}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {employeeStatus}
              </span>
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs font-medium">
                  <svg
                    className="w-2 h-2 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Active
                </span>
              </div>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Card