import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const roles_permission_links = [
  { to: "/roles", title: "Roles" },
  { to: "/permissions", title: "Permission" },
  { to: "/roles-permissions", title: "Assign Roles Permission" }
];

const Sidebar = () => {
  const [resource, setResource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/resource");
      setResource(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-64 bg-gray-700 border-r">
      <div className="bg-gray-800 border-b-2 border-gray-800 flex items-center px-8 py-3 text-white">
        <img className="h-8 w-8 mr-3" src="/img/logo.svg" />
        <span className="font-bold mr-2 text-lg">Laravel</span>
        <span className="text-lg">Fligno</span>
      </div>

      <nav className="px-8 py-4 text-gray-300">
        <h2 className="flex font-semibold items-center">
          <i className="fa fa-th-large"></i>
          <span className="ml-3">Resources</span>
        </h2>
        <div className="ml-4 mt-2 text-sm">
          {resource.map(resource => (
            <NavLink
              key={resource.slug}
              to={`/resource/${resource.slug}`}
              activeClassName="font-bold text-white"
              className="flex items-center ml-3 py-1"
            >
              {resource.title}
            </NavLink>
          ))}
        </div>
        <h2 className="flex font-semibold items-center mt-3">
          <i className="fa fa-user-shield"></i>
          <span className="ml-3">Roles and Permission</span>
        </h2>
        <div className="ml-4 mt-2 text-sm">
          {roles_permission_links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              activeClassName="font-bold text-white"
              className="flex items-center ml-3 py-1"
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
