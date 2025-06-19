import { type RouteConfig,route,layout, index } from "@react-router/dev/routes";

export default [
    route("signIn","routes/root/signIn.tsx"),
    route("api/create-trip","routes/api/create-trip.ts"),
    route("","routes/root/Home.tsx"),
    layout("routes/admin/admin-layout.tsx",[
        route('dashboard','routes/admin/dashboard.tsx'),
        route('allUser','routes/admin/allUser.tsx'),
        route('trips','routes/admin/trips.tsx'),
        route('createTrip/create','routes/admin/create-trip.tsx'),
        route('trips/:tripId','routes/admin/trip-detail.tsx'),
    ]),
    // layout("routes/root/page-layout.tsx",[
    //     index("routes/root/travel-page.tsx"),
    // ])

] satisfies RouteConfig;