import "../admin_bootstrap";
import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom";
import { Sidebar, Content, Loader } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import Cookie from "js-cookie";

const Login = lazy(() => import("~/pages/login"));

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  if (window.location.pathname.includes("/admin/login")) {
    return (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    );
  }

  const logout = async () => {
    Cookie.set("oToken_admin", "");
    await axios.post("/api/logout");
    window.location = "/admin/login";
  };

  return (
    <Router basename="/admin">
      <div className="h-screen flex">
        <Sidebar />
        <div className="bg-gray-200 flex flex-1 flex-col min-w-0">
          <header className="bg-white border-b-2 flex justify-end px-6 py-3">
            <div className="flex relative leading-none">
              <button
                className="h-8 rounded-full w-8 overflow-hidden"
                onClick={() => setOpen(true)}
              >
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=5&w=144&h=144&q=80" />
              </button>

              {isOpen && (
                <>
                  <button
                    className="fixed h-full inset-0 w-full z-10"
                    onClick={() => setOpen(false)}
                  ></button>
                  <div className="absolute bg-white mt-10 rounded-lg shadow text-sm right-0 w-40 z-20">
                    <button
                      onClick={logout}
                      className="block outline-none px-4 py-2 text-gray-800 text-left w-full"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>
          <Content />
        </div>
      </div>
    </Router>
  );
};

if (document.getElementById("app")) {
  ReactDOM.render(<Home />, document.getElementById("app"));
}
