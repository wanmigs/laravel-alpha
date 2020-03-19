import React, { useState, useRef, useEffect } from 'react';
import { Button, Form } from '~/components';
import { FETCHING, LOADING } from '~/helpers/status';
import { formSubmit } from "~/helpers/utilities";

const Settings = () => {
  const form = useRef(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('FETCHING');
  const [errors, setErrors] = useState({});
  const formFields = {
    coming_soon_email_subject: {
      'label': 'Email Subject *',
      'type': 'text'
    },
    coming_soon_email_content: {
      'label': 'Email Content *',
      'type': 'textarea',
      'rows': 10,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setStatus(FETCHING);

      try {
        const { data } = await axios.get('/api/app-settings/email');
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }

      setStatus('');
    };

    fetchData();
  }, []);

  const handleSubmit = async evt => {
    evt.preventDefault();

    let formData = new FormData(form.current);
    formData.append("_method", "PATCH");
    window.loadingStatus = `Saving data...`;
    setStatus(LOADING);

    try {
      await axios.post('/api/app-settings/email', formData);
    } catch (error) {
      console.log(error.response);
    }

    setStatus('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Settings</h2>

      {status !== FETCHING && (
        <form ref={form} onSubmit={handleSubmit} className={'mt-8'}>
          <Form errors={errors} formFields={formFields} data={data} />
          <div className={`items-center lg:flex mb-4 lg:mb-5 mt-12`}>
            <span className={`lg:w-48`}/>
            <Button
              disabled={status === LOADING}
              className={`bg-blue-500 hover:bg-blue-700 text-white mr-4`}
            >
              {status === LOADING && <i className="fa fa-circle-notch fa-spin mr-2" />}{" "}
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Settings;
