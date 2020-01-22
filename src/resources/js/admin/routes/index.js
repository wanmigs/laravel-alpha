import React, { lazy } from "react";

const Roles = lazy(() => import("~/pages/roles"));
const CreateRole = lazy(() => import("~/pages/roles/create"));
const EditRole = lazy(() => import("~/pages/roles/edit"));

const Permission = lazy(() => import("~/pages/permission"));
const CreatePermission = lazy(() => import("~/pages/permission/create"));
const EditPermission = lazy(() => import("~/pages/permission/edit"));

const RolesPermissions = lazy(() => import("~/pages/roles-permission"));

const Resrource = lazy(() => import("~/pages/resource"));
const CreateResrource = lazy(() => import("~/pages/resource/create"));
const EditResrource = lazy(() => import("~/pages/resource/edit"));

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
    path: "/role/create",
    exact: true,
    component: () => <CreateRole />
  },
  {
    path: "/role/edit/:id",
    component: () => <EditRole />
  },
  {
    path: "/permissions",
    exact: true,
    component: () => <Permission />
  },
  {
    path: "/permission/create",
    exact: true,
    component: () => <CreatePermission />
  },
  {
    path: "/permission/edit/:id",
    exact: true,
    component: () => <EditPermission />
  },
  {
    path: "/roles-permissions",
    exact: true,
    component: () => <RolesPermissions />
  },
  {
    path: "/resource/:slug",
    exact: true,
    component: () => <Resrource />
  },
  {
    path: "/resource/:slug/create",
    exact: true,
    component: () => <CreateResrource />
  },
  {
    path: "/resource/:slug/edit/:id",
    exact: true,
    component: () => <EditResrource />
  }
];
export default routes;
