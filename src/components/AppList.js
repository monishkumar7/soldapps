import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiExternalLink } from 'react-icons/fi';
import { BsArrowUpCircleFill } from 'react-icons/bs';

import InputForm from './InputForm';
import LoadingIndicator from './LoadingIndicator';

const AppList = ({ projectList, sendProject, loading }) => {
  const [showForm, setShowForm] = useState(false);

  const submitProject = async (values) => {
    sendProject(values);
    if (values.submitted) {
      setShowForm(false);
    }
  };

  return (
    <div className="p-4">
      <Transition.Root show={showForm} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setShowForm}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full sm:p-6">
                <InputForm submitProject={(values) => submitProject(values)} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-extrabold">Solana DApps List</h1>
            <button
              className="bg-purple-600 text-white font-medium rounded-md p-2"
              onClick={() => setShowForm(!showForm)}
            >
              Submit DApp
            </button>
          </div>
          {projectList &&
            projectList.map((project, projectIndex) => (
              <div key={projectIndex} className="p-4 rounded my-4 bg-white">
                <div className="flex justify-between mb-2">
                  <div className="flex">
                    <span className="text-xl font-medium text-gray-700 mr-4">
                      {project.projectName}
                    </span>
                    <a
                      href={project.projectLink}
                      className="text-gray-500 hover:text-purple-600 flex items-center"
                      target={'_blank'}
                      nofollow
                      rel="noreferrer"
                    >
                      <FiExternalLink className="inline w-3 h-3 mr-1 text-gray-400" />
                      {project.projectLink}
                    </a>
                  </div>
                  {project.projectVotes && (
                    <div className="flex items-center">
                      <BsArrowUpCircleFill className="inline w-5 h-5 mr-1 text-gray-700" />
                      <span className="text-xl">{project.votes}</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-gray-700">{project.projectDescription}</p>
                  {project.category && (
                    <span className="px-2 py-1 bg-gray-300 text-xs rounded text-gray-700">
                      #{project.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default AppList;
