import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import lottie from 'lottie-web';

const App = () => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('');
  const animation = React.useRef(null);
  const statusClass = {
    success: 'text-base text-green-600',
    failed: 'text-base text-red-600'
  };

  React.useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      animationData: require('./animations/coming-soon.json'),
      autoplay: true,
      loop: true
    });
  });

  const submit = async () => {
    setLoading(true);

    try {
      await axios.post('/api/newsletters', { email });

      setStatus('success');
      setMessage(
        'Thank you! You will get notified when our website is launched.'
      );
      setEmail('');
    } catch (error) {
      console.log(error.response);
      setStatus('failed');
      setMessage('Oops! Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="full-height flex">
      <div className={"md:w-1/2 xl:w-2/5 z-10 items-center flex"}>
        <div className={"flex flex-col justify-center px-20"}>
          <h1 className={"font-bold leading-none text-6xl text-black"}>
            Our new website is on its way
          </h1>

          <span className={"mt-10 text-2xl text-black"}>
            Sign up to be the first one to know when we launch.
          </span>

          <div className="flex flex-col items-center mt-10">
            <input
              type="text"
              name="email"
              placeholder="Enter your email here..."
              onChange={event => setEmail(event.target.value)}
              className="border-2 w-full p-2 rounded text-lg focus:outline-none"
              style={styles.input}
            />
            <button
              type="button"
              className="border-2 py-2 mt-2 shadow-md rounded text-lg text-white w-full hover:bg-red-600"
              style={styles.button}
              onClick={submit}
            >
              {loading ? <i className="fa fa-spinner fa-spin" /> : "Let me know"}
            </button>
          </div>

          <div className="mt-4">
            {message !== "" && (
              <span className={statusClass[status]}>{message}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 relative items-center flex">
        <svg
          id="e424aa24-0cd6-43e1-b34b-165f9f847eac"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          width="746"
          height="768"
          viewBox="0 0 746 768"
          className={"absolute right-0"}
          style={{ transform: "scale(1.5)" }}
        >
          <path
            fill="#F26C5D"
            d="M746,0H80S48-4,38,46,17,184,120,274C203.52,347,221.73,363,256,444c52,123,184,160,293,130,120.52-33.17,197,167,197,130Z"
          />
        </svg>

        <div ref={animation} className={"flex-1 absolute inset-0"} />
      </div>
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: '#F26C5D',
    borderColor: '#F26C5D',
  },
  input: {
    borderColor: '#F26C5D'
  }
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
