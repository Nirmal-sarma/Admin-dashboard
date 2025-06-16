import { type RouteConfig,route,layout } from "@react-router/dev/routes";

export default [
    route("signIn","routes/root/signIn.tsx"),
    route("api/create-trip","routes/api/create-trip.ts"),
    layout("routes/admin/admin-layout.tsx",[
        route('dashboard','routes/admin/dashboard.tsx'),
        route('allUser','routes/admin/allUser.tsx'),
        route('trips','routes/admin/trips.tsx'),
        route('createTrip/create','routes/admin/create-trip.tsx'),
        route('trips/:tripId','routes/admin/trip-detail.tsx'),
    ]),
] satisfies RouteConfig;