import React, { useState } from "react";
import DataTable from "~/Layout/DataTable";

const columns = {
  name: {
    label: "Name"
  }
};

const title = {
  singular: "Permission",
  plural: "Permissions"
};

const Permissions = () => (
  <DataTable
    columns={columns}
    endpoint="/api/permission"
    title={title}
    editLink="/permissions/edit"
    options={{
      order: "asc",
      sort: "created_at"
    }}
  />
);

export default Permissions;
