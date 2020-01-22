import React, { useState, useEffect } from "react";
import { Checkbox } from "pretty-checkbox-react";

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchPermission = await axios.get(`/api/permission`, {
        params: { all: true }
      });
      const fetchRoles = await axios.get(`/api/roles-permissions`);

      let [{ data: permissionsData }, { data: rolesData }] = await Promise.all([
        fetchPermission,
        fetchRoles
      ]);

      setRoles(rolesData);
      setPermissions(permissionsData);
    };
    fetchData();
  }, []);

  const handleRolePermission = async (role, permission, evt) => {
    evt.persist();

    let payload = {
      isChecked: evt.target.checked
    };

    let { data } = await axios.post(
      `/api/roles-permissions/${role}/${permission}`,
      payload
    );

    let newRoles = roles;
    let index = newRoles.findIndex(role => role.id == data.id);

    newRoles[index] = data;
    setRoles(newRoles);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Roles Permissions</h2>

      <section className={`overflow-auto`}>
        <table className={`table-fixed text-left w-full`}>
          <thead>
            <tr className="table-head-row">
              <th className="border-b px-4 py-3 text-sm bg-blue-100 sticky left-0">
                Roles/Permissions
              </th>
              {permissions.map(permission => (
                <th
                  key={permission.id}
                  className="border-b bg-gray-100 px-4 py-3 text-sm"
                >
                  {permission.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map(role => {
              let rolePermissions = role.permissions.map(data => data.id);

              return (
                <tr className="border-b bg-white" key={role.id}>
                  <th className="bg-blue-100 text-sm p-4 sticky left-0">
                    {role.name}
                  </th>
                  {permissions.map(permission => (
                    <th
                      key={`permission_${permission.id}_${role.id}`}
                      className="text-sm p-4"
                    >
                      <Checkbox
                        inputProps={{
                          defaultChecked:
                            rolePermissions.indexOf(permission.id) !== -1
                        }}
                        shape="curve"
                        onChange={evt =>
                          handleRolePermission(role.id, permission.id, evt)
                        }
                        color="success-o"
                      ></Checkbox>
                    </th>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RolesPermissions;
