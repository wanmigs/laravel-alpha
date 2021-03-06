import React, { useState } from "react";
import DataTable from "~/Layout/DataTable";

const columns = {
  name: {
    label: "Name"
  }
};

const title = {
  singular: "Role",
  plural: "Roles"
};

const Roles = () => (
  <DataTable
    columns={columns}
    endpoint="/api/newsletter"
    title={title}
    editLink=""
    options={{
      order: "asc",
      sort: "created_at"
    }}
  />
);

export default Roles;
