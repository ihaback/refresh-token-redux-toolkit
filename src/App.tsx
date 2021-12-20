import React from "react";
import { Navbar, Layout } from "components";
import { Login, Users } from "views";
import { useAppSelector } from "store";

function App() {
  const user = useAppSelector((state) => state?.userData?.user);
  return (
    <div className="bg-gray-100 h-full">
      <Navbar />
      <Layout>
        {!user && <Login />}
        {user && <Users />}
      </Layout>
    </div>
  );
}

export default App;
