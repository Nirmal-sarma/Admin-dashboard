import { type RouteConfig,route,layout } from "@react-router/dev/routes";

export default [
    route("signIn","routes/root/signIn.tsx"),
    layout("routes/admin/admin-layout.tsx",[
        route('dashboard','routes/admin/dashboard.tsx'),
        route('allUser','routes/admin/allUser.tsx'),
        route('trips','routes/admin/trips.tsx'),
        route('createTrip/create','routes/admin/create-trip.tsx'),
    ]),
] satisfies RouteConfig;