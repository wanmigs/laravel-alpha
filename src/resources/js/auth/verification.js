import '../bootstrap'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { isLoggedIn, logout, setToken } from '../helpers/auth'

const App = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      const url = new URL(window.location.href);
      const id = url.searchParams.get('id');
      const hash = url.searchParams.get('hash');

      const { data } = await axios.get(`/api/email/verify/${id}/${hash}`);
      setMessage(data.message);
      setLoading(false);
    }

    fetchData();
  }, [])

  return (
    <div className="flex-center position-ref full-height">
      <div className="top-right links">
        <a href="/">Home</a>
        { isLoggedIn()
          ? (
            <a href="#" onClick={() => logout()}>Logout</a>
          )
          : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )
        }

      </div>

      <div className="content">
        <div className="title m-b-md">
          { loading ? 'Verifying...' : message }
        </div>

        <div className="links">
          <a href="https://laravel.com/docs">Docs</a>
          <a href="https://laracasts.com">Laracasts</a>
          <a href="https://laravel-news.com">News</a>
          <a href="https://blog.laravel.com">Blog</a>
          <a href="https://nova.laravel.com">Nova</a>
          <a href="https://forge.laravel.com">Forge</a>
          <a href="https://vapor.laravel.com">Vapor</a>
          <a href="https://github.com/laravel/laravel">GitHub</a>
        </div>
      </div>
    </div>
  );
};

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
