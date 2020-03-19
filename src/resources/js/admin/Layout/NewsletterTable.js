import React, { useState, useEffect } from 'react';
import { Button, Table, Header, Row } from '~/components';
import Rows from '~/pages/resource/rows';
import { NavLink } from 'react-router-dom';
import { swalDelete } from '~/helpers/utilities';
let debounce = require('lodash.debounce');

const columns = {
  name: {
    label: 'Email'
  }
};

const NewsletterTable = ({
  columns,
  endpoint,
  title,
  editLink,
  options = {},
  baseLink = '',
  row = ''
}) => {
  const [keyword, setKeyword] = useState('');
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [toggleFetch, setToggleFetch] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [sending, setSending] = useState(false);

  let TableRow = Rows.hasOwnProperty(row) ? Rows[row] : Row;

  useEffect(() => {
    const fetchAppSetting = async () => {
      const { data } = await axios.get('/api/app-settings/coming-soon');
      setComingSoon(data.coming_soon);
    };

    fetchAppSetting();
  }, []);

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

  const handleSettingChange = async () => {
    try {
      await axios.patch('/api/app-settings/coming-soon');
      setComingSoon(!comingSoon);
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async () => {
    setSending(true);
    try {
      await axios.post('/api/newsletters/mail/send');

      Swal.fire({
        icon: 'success',
        title: 'Success',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong while sending the emails.'
      });
    }
    setSending(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">{title.plural}</h2>
      <div className="flex justify-between mb-4">
        <div className={`flex items-center justify-center`}>
          <div className="relative w-64">
            <span className="absolute flex inset-y-0 items-center left-0 pl-2 text-gray-600 ">
              <i className="fa fa-search"/>
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
          <span className="text-grey-darker mr-4" />
          <div className="flex items-center mx-3">
            <span className="font-semibold mr-2">Coming Soon</span>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={comingSoon}
                  value={comingSoon}
                  onChange={evt => handleSettingChange()}
                />
                <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
                <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0" />
              </div>
            </label>
          </div>
          <Button
            className="bg-green-500 hover:bg-blue-700 text-white"
            disabled={comingSoon || sending}
            onClick={sendEmail}
          >
            {sending && <i className="fa fa-circle-notch fa-spin mr-2" />} Send Email
          </Button>
          <NavLink to={`${baseLink}/${title.singular.toLowerCase()}/create`}>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white">
              Add Email
            </Button>
          </NavLink>
          <Button
            className="text-white bg-red-500 hover:bg-red-700"
            onClick={handleDelete}
            disabled={!selected.length}
          >
            <i className="fa fa-trash" />
          </Button>
        </div>
      </div>
      <div>
        <Table
          url={endpoint}
          toggleFetch={toggleFetch}
          keyword={keyword}
          getData={setTableData}
          order={options.order || ''}
          sort={options.sort || ''}
          queryParams={options.queryParams || ''}
          header={
            <Header
              onSelect={handleSelectAll}
              checked={checked}
              columns={columns}
            />
          }
          content={
            <TableRow
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

export default React.memo(NewsletterTable);
