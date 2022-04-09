import React, { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 lg:pt-24">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-8 shadow rounded-lg">{children}</div>
      </div>
    </div>
  );
};
