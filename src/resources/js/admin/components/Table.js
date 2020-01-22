import React, { useState, useEffect } from "react";
import Pagination from "./table/Pagination";
import PageSelectSize from "./table/PageSelectSize";

const Table = ({
  className,
  header,
  content,
  url,
  keyword = "",
  order = "",
  sort = "",
  queryParams = ``,
  getData,
  toggleFetch,
  showFooter = true
}) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchResults() {
      let { data } = await axios.get(getFetchUrl());
      setTotal(data.total);
      getData(data.data);
    }

    function getFetchUrl() {
      queryParams = queryParams ? `&${queryParams}` : "";
      return (
        url +
        "?keyword=" +
        keyword +
        "&limit=" +
        limit +
        "&offset=" +
        offset +
        "&order=" +
        order +
        "&sort=" +
        (sort || "") +
        queryParams
      );
    }

    fetchResults();
  }, [offset, limit, keyword, toggleFetch]); // ✅ Refetch on change

  const changeLimit = evt => {
    setOffset(0);
    setLimit(evt.target.value);
  };

  return (
    <>
      <section className={`overflow-auto`}>
        <table className={`table-fixed text-left w-full ${className}`}>
          {header}
          {content}
        </table>
      </section>
      {showFooter && (
        <section
          className={`${
            !total ? "bg-white" : "bg-blue-100"
          } table-footer px-6 py-3 flex items-center justify-between py-3 px-6 border-t shadow`}
        >
          {!total ? (
            <div className="block flex flex-col h-64 items-center justify-center text-base text-gray-400 w-full ">
              <span className="block mt-2">No results found</span>
            </div>
          ) : (
            <PageSelectSize total={total} onChange={changeLimit} />
          )}

          <Pagination
            onPageChange={setOffset}
            limit={limit}
            offset={offset}
            total={total}
          />
        </section>
      )}
    </>
  );
};

export default Table;
