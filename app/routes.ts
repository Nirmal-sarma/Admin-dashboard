import { type RouteConfig,route,layout } from "@react-router/dev/routes";

export default [
    route("signIn","routes/root/signIn.tsx"),
    layout("routes/admin/admin-layout.tsx",[
        route('dashboard','routes/admin/dashboard.tsx'),
        route('allUser','routes/admin/allUser.tsx'),
    ]),
] satisfies RouteConfig;