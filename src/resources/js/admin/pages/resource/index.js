import React, { useState, useEffect } from "react";
import DataTable from "~/Layout/DataTable";
import { useParams } from "react-router-dom";
const columns = {
  name: {
    label: "Name"
  }
};

const title = {
  singular: "Role",
  plural: "Roles"
};

const Roles = () => {
  const [title, setTitle] = useState({});
  const [columns, setColumns] = useState({});
  const [isFetching, setFetching] = useState(true);

  let { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/resource/${slug}`);
      setTitle(data.title);
      setColumns(data.columns);
      setFetching(false);
    };
    fetchData();
  }, []);

  if (isFetching) return null;

  return (
    <DataTable
      columns={columns}
      endpoint={`/api/resource/data/${slug}`}
      title={title}
      baseLink="/resource"
      editLink={`/resource/${slug}/edit`}
      options={{
        order: "asc",
        sort: "created_at"
      }}
    />
  );
};

export default Roles;
