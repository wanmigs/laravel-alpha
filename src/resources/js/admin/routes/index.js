import React, { lazy } from "react";

const Roles = lazy(() => import("~/pages/roles"));
const CreateRole = lazy(() => import("~/pages/roles/create"));
const EditRole = lazy(() => import("~/pages/roles/edit"));

const Permission = lazy(() => import("~/pages/permission"));
const CreatePermission = lazy(() => import("~/pages/permission/create"));
const EditPermission = lazy(() => import("~/pages/permission/edit"));

const RolesPermissions = lazy(() => import("~/pages/roles-permission"));

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <h2>Home2</h2>
  },
  {
    path: "/roles",
    exact: true,
    component: () => <Roles />
  },
  {
    path: "/roles/create",
    exact: true,
    component: () => <CreateRole />
  },
  {
    path: "/roles/edit/:id",
    component: () => <EditRole />
  },
  {
    path: "/permissions",
    exact: true,
    component: () => <Permission />
  },
  {
    path: "/permissions/create",
    exact: true,
    component: () => <CreatePermission />
  },
  {
    path: "/permissions/edit/:id",
    exact: true,
    component: () => <EditPermission />
  },
  {
    path: "/roles-permissions",
    exact: true,
    component: () => <RolesPermissions />
  }
];
export default routes;
