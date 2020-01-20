import '../bootstrap';
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [tokenError, setTokenError] = useState('');
  const form = useRef(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    setToken(url.searchParams.get('token'));
    setEmail(url.searchParams.get('email'));
  }, []);

  const handleSubmit = async evt => {
    evt.preventDefault();
    setLoading(true);
    setMessage('');
    setTokenError('');

    let formData = new FormData(form.current);
    let errors = "";

    try {
      let { data } = await axios.post("/api/password/reset", formData);

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
            <i className="fa fa-info-circle mr-3 text-xl" />
            <div className={'flex justify-between items-center w-full'}>
              <span>{ message }</span>
              <a href="/login" className={'bg-blue-500 hover:bg-blue-700 p-2 rounded text-white text-xs'}>
                Login <i className="fa fa-long-arrow-alt-right ml-2" />
              </a>
            </div>
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
              defaultValue={email}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              className={`
                shadow appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.password ? "border-red-500 mb-3" : ""}
              `}
              id="password"
              type="password"
              placeholder=""
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              className={`
                shadow appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                ${errors.password ? "border-red-500 mb-3" : ""}
              `}
              id="password_confirmation"
              type="password"
              placeholder=""
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password[0]}</p>
            )}
          </div>

          <input name="token" defaultValue={token} id="token" type="hidden" />

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading && <i className="fa fa-circle-notch fa-spin mr-2" />} Reset Password
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
