import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { logout } from "features";

export const Navbar = () => {
  const user = useAppSelector((state) => state?.userData?.user);
  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch justify-between">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            {user && (
              <div>
                <div className="flex space-x-4">
                  <button
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => handleLogOut()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
