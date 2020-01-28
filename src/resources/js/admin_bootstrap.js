import Cookie from "js-cookie";

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require("axios");

let token = Cookie.get("oToken_admin");

if (token) {
  axios.interceptors.request.use(
    config => {
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (401 === error.response.status) {
        logout();
      } else {
        return Promise.reject(error);
      }
    }
  );
} else {
  window.location = "/admin/login";
}

const logout = async () => {
  Cookie.set("oToken_admin", "");
  await axios.post("/api/logout");
  window.location = "/admin/login";
};

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
