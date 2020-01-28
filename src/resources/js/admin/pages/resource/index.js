import React, { useState, useEffect } from "react";
import DataTable from "~/Layout/DataTable";
import { useParams } from "react-router-dom";
import { Loader } from "~/components";

const Resource = () => {
  const [isFetching, setFetching] = useState(true);
  const [data, setData] = useState({});

  let { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/resource/${slug}`);
      setData(data);
      setFetching(false);
    };
    setFetching(true);
    fetchData();
  }, [slug]);

  if (isFetching) return <Loader />;

  return (
    <DataTable
      columns={data.columns}
      endpoint={`/api/resource/data/${slug}`}
      title={data.title}
      baseLink="/resource"
      editLink={`/resource/${slug}/edit`}
      options={{
        order: "asc",
        sort: "created_at"
      }}
      row={data.rowComponent}
    />
  );
};

export default React.memo(Resource);
