import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

const UserList = () => {
  return (
    <div className="max-w-2xl">
      <div className="p-4 max-w-md bg-white text-black rounded-lg border sm:p-8 border-gray-500 shadow-[0_4px_30px_rgba(147,51,234,0.6)] ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none">User List</h3>
          <a
            href="#"
            className="font-bold text-xl text-black"
          >
            <HiDotsVertical />
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-700 h-[300px] overflow-y-scroll ">
            <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium truncate">Neil Sims</p>
                  <p className="text-md text-gray-400 truncate">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer">
                  <FaPlus />
                </div>
              </div>
            </li>
            <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium truncate">Neil Sims</p>
                  <p className="text-md text-gray-400 truncate">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer">
                  <FaPlus />
                </div>
              </div>
            </li>
            <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium truncate">Neil Sims</p>
                  <p className="text-md text-gray-400 truncate">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer">
                  <FaPlus />
                </div>
              </div>
            </li>
            <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium truncate">Neil Sims</p>
                  <p className="text-md text-gray-400 truncate">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer">
                  <FaPlus />
                </div>
              </div>
            </li>
            <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium truncate">Neil Sims</p>
                  <p className="text-md text-gray-400 truncate">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer">
                  <FaPlus />
                </div>
              </div>
            </li>
            <li className="py-3 mb-2 sm:py-4 hover:bg-black hover:text-white rounded-md px-3 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium truncate">Neil Sims</p>
                  <p className="text-md text-gray-400 truncate">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold bg-stone-500 hover:bg-white hover:text-black transition text-white p-1.5 rounded-md cursor-pointer">
                  <FaPlus />
                </div>
              </div>
            </li>
           
            
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserList;
