import '../bootstrap';
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { setToken } from '../helpers/auth';

const App = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const form = useRef(null);

  const handleSubmit = async evt => {
    evt.preventDefault();
    setLoading(true)

    let formData = new FormData(form.current);
    let errors = "";

    try {
      let { data } = await axios.post("/api/register", formData);
      setToken(data.access_token);

      window.location.href = '/';
    } catch (error) {
      let { data } = error.response;
      errors = data.errors;
    }

    setErrors(errors || {});
    setLoading(false)
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          ref={form}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Name</label>
            <input
              name="name"
              className={
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline
                ${errors.name ? "border-red-500 mb-3" : ""}`
              }
              id="name"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Email</label>
            <input
              name="email"
              className={
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline
                ${errors.email ? "border-red-500 mb-3" : ""}`
              }
              id="email"
              type="text"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              name="password"
              className={
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline
                ${errors.password ? "border-red-500 mb-3" : ""}`
              }
              id="password"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
            <input
              name="password_confirmation"
              className={
                `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline
                ${errors.password ? "border-red-500 mb-3" : ""}`
              }
              id="password_confirmation"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={
                `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
                px-4 rounded focus:outline-none focus:shadow-outline
                flex items-center`
              }
              type="submit"
              disabled={loading}
            >
              {loading && <i className="fa fa-circle-notch fa-spin mr-2"/>} Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;{new Date().getFullYear()} Wanskie Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
