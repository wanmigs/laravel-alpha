import React, { useState } from "react";
import { Button, Table, Header, Row } from "~/components";
import { NavLink } from "react-router-dom";
import { swalDelete } from "~/helpers/utilities";
let debounce = require("lodash.debounce");

const columns = {
  name: {
    label: "Name"
  }
};

const DataTable = ({
  columns,
  endpoint,
  title,
  editLink,
  options = {},
  baseLink = ""
}) => {
  const [keyword, setKeyword] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [toggleFetch, setToggleFetch] = useState(false);

  const handleSearch = debounce(keyword => {
    setKeyword(keyword);
  }, 800);

  const handleSelectAll = () => {
    let ids = tableData.map(data => data.id);

    if (!checked)
      setSelected(Array.from(new Set([...(selected || []), ...ids])));
    else setSelected([]);

    setChecked(!checked);
  };

  const handleSelected = id => {
    let row = [...selected];
    let index = row.indexOf(id);
    index !== -1 ? row.splice(index, 1) : row.push(id);
    setSelected(row);
  };

  const handleDelete = async () => {
    if (!selected.length) return;

    swalDelete(endpoint, selected, {
      singular: title.singular,
      plural: title.plural
    }).then(() => {
      setSelected([]);
      setToggleFetch(!toggleFetch);
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{title.plural}</h2>
      <div className="flex justify-between mb-4">
        <div className={`flex items-center justify-center`}>
          <div className="relative w-64">
            <span className="absolute flex inset-y-0 items-center left-0 pl-2 text-gray-600 ">
              <i className="fa fa-search"></i>
            </span>
            <input
              className="block w-full rounded-lg border border-gray-400 outline-none pl-10 pr-4 py-1 text-gray-900"
              placeholder="Search"
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          {!selected.length || (
            <span className="text-sm text-gray-600 hidden lg:block">
              {selected.length} item(s) selected
            </span>
          )}
          <span className="text-grey-darker mr-4"></span>
          <NavLink to={`${baseLink}/${title.singular.toLowerCase()}/create`}>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white">
              Create {title.singular}
            </Button>
          </NavLink>
          <Button
            className="text-white bg-red-500 hover:bg-red-700"
            onClick={handleDelete}
            disabled={!selected.length}
          >
            <i className="fa fa-trash"></i>
          </Button>
        </div>
      </div>
      <div>
        <Table
          url={endpoint}
          toggleFetch={toggleFetch}
          keyword={keyword}
          getData={setTableData}
          order={options.order || ""}
          sort={options.sort || ""}
          queryParams={options.queryParams || ""}
          header={
            <Header
              onSelect={handleSelectAll}
              checked={checked}
              columns={columns}
            />
          }
          content={
            <Row
              columns={columns}
              data={tableData}
              onSelect={handleSelected}
              selected={selected}
              link={editLink}
            />
          }
        />
      </div>
    </div>
  );
};

export default DataTable;
