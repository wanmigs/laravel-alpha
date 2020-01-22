import "../bootstrap";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Sidebar, Content } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Home = () => {
  return (
    <Router basename="/admin">
      <div className="h-screen flex">
        <Sidebar />
        <div className="bg-gray-200 flex flex-1 flex-col min-w-0">
          <header className="bg-white border-b-2 px-6 py-3">
            <div className="flex-1">
              <div className="relative w-64">
                <span className="absolute flex inset-y-0 items-center left-0 pl-2 text-gray-600 ">
                  <i className="fa fa-search"></i>
                </span>
                <input
                  className="block w-full rounded-lg border border-gray-400 outline-none pl-10 pr-4 py-1 text-gray-900"
                  placeholder="Search"
                />
              </div>
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
