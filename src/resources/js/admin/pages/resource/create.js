import React, { useRef, useState, useEffect } from "react";
import { Button, Form } from "~/components";
import { NavLink, useParams } from "react-router-dom";
import { formSubmit } from "~/helpers/utilities";

const Create = () => {
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState({});
  const [isFetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(false);
  const [endpoint, setEndpoint] = useState({});
  const form = useRef(null);

  let { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/resource/${slug}`);
      setTitle(data.title);
      setFormFields(data.form);
      setEndpoint(data.endpoint);
      setFetching(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async evt => {
    evt.preventDefault();
    let formData = new FormData(form.current);
    window.loadingStatus = `Saving data...`;
    setLoading(true);

    let api = endpoint.store || `/api/resource/${slug}`;

    let errors = await formSubmit(
      `post`,
      api,
      formData,
      `${title.singular} successfully added`,
      `/admin/resource/${slug}`
    );
    setLoading(false);
    setErrors(errors || {});
  };

  if (isFetching) return null;

  return (
    <div>
      <span
        className={`block border-b font-black mb-4 pb-2 text-blue-900 text-lg w-full`}
      >
        Create {title.singular}
      </span>
      <form ref={form} onSubmit={handleSubmit}>
        <Form errors={errors} formFields={formFields} />
        <div className={`items-center lg:flex mb-4 lg:mb-5 mt-12`}>
          <span className={`lg:w-48`}></span>
          <Button
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white mr-4`}
          >
            {loading && <i className="fa fa-circle-notch fa-spin mr-2" />}{" "}
            Submit
          </Button>
          <NavLink to={`/resource/${slug}`}>
            <Button className={`bg-white border hover:bg-gray-100`}>
              Cancel
            </Button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Create;
