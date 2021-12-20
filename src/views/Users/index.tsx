import React, { FC, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "store";
import { deleteUser } from "features";

export const Users: FC = () => {
  const user = useAppSelector((state) => state?.userData?.user);
  const success = useAppSelector((state) => state?.userData?.success);
  const error = useAppSelector((state) => state?.userData?.error);
  const dispatch = useAppDispatch();

  const handleDeleteUser = useCallback(
    (id: number) => dispatch(deleteUser(id)),
    [dispatch]
  );

  return (
    <div>
      <p>
        Welcome <b>{user?.username}</b>. You have access to the
        <b> {user?.isAdmin ? "admin" : "user"}</b> role.
      </p>
      <p className="text-center pt-2">Delete Users:</p>
      <div className="flex pt-6">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2 flex-1"
          onClick={() => handleDeleteUser(1)}
        >
          Delete Admin
        </button>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2 flex-1"
          onClick={() => handleDeleteUser(2)}
        >
          Delete User
        </button>
      </div>
      <div className="pt-4">
        {success && (
          <p className="text-green-600">
            User has been deleted successfully...
          </p>
        )}
        {error && (
          <p className="text-red-600">
            You are not allowed to delete this user!
          </p>
        )}
      </div>
    </div>
  );
};
