import '../bootstrap'
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { setToken } from '../helpers/auth';

const App = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [tokenError, setTokenError] = useState('');
  const form = useRef(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setMessage('');
    setTokenError('');


    let formData = new FormData(form.current);
    let errors = "";

    try {
      let { data } = await axios.post("/api/password/email", formData);
      setMessage(data.message);

    } catch (error) {
      let { data, status } = error.response;

      if (status === 422) {
        errors = data.errors;
      }

      if (status === 401) {
        setTokenError(data.email)
      }
    }

    setErrors(errors || {});
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-full max-w-sm">
        <form ref={form} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          {message && (<div className="bg-blue-200 flex font-semibold items-center mb-3 p-3 rounded text-blue-900 text-xs">
            <i className="fa fa-info-circle mr-3 text-2xl" />
            <span>
              { message }
            </span>
          </div>)}

          {tokenError && (<div className="bg-red-200 flex font-semibold items-center mb-3 p-3 rounded text-red-900 text-xs">
            <i className="fa fa-exclamation-circle mr-3 text-xl" />
            <div className={'flex justify-between items-center w-full'}>
              <span>{ tokenError }</span>
            </div>
          </div>)}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              name="email"
              className={`
                shadow appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.email ? "border-red-500 mb-3" : ""}
              `}
              id="email"
              type="text"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading && <i className="fa fa-circle-notch fa-spin mr-2" />} Send Password Reset Email
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
