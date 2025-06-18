import { Header, TripCard } from "../../../components";
import { type LoaderFunctionArgs, useSearchParams } from "react-router";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import type { Route } from './+types/trips'
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";
import { load } from "@syncfusion/ej2-react-charts";
export const loader = async ({ request }: LoaderFunctionArgs) => {
    const limit = 4;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') ?? '1') || 1;
    const offset = (page - 1) * limit;

    const { allTrips, total } = await getAllTrips(limit, offset);

    return {
        trips: allTrips.map(({ $id, tripDetail, imageUrl }) => ({
            id: $id,
            tripDetail: parseTripData(tripDetail),
            imageUrl: imageUrl ?? [],
        })),
        total
    };
}

const Trips = ({ loaderData }: Route.ComponentProps) => {
   const { trips, total } = loaderData;
   const [searchParams]=useSearchParams();
   const initialPage = Number(searchParams.get('page')) || 1;
   const [curentPage, setCurentPage] = useState(initialPage)
   
    const handlePageChange = (page: number) => {
         console.log('Page changed to:', page);
          setCurentPage(page);
          window.location.search = `?page=${page}`;
     }

    return (
        <main className="all-users wrapper">
            <Header
                title="Trips"
                description="View and edit AI-generated travel plans"
                ctaText="Create a trip"
                cta="/createTrip/create"
            />

            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">
                    Manage Created Trips
                </h1>
                <section className='flex flex-col gap-6'>
                    <h2 className='p-24-semibold text-dark-100'> Popular Trips</h2>
                    <div className='trip-grid mb-4'>
                        {trips.map((trip: any) => (
                            <TripCard
                                key={trip.id}
                                id={trip.id.toString()}
                                name={trip.name}
                                imageUrl={trip.imageUrl[0]}
                                location={trip.tripDetail.itinerary?.[0]?.location || ''}
                                tags={[trip.tripDetail.travelStyle, trip.tripDetail.groupType]}
                                price={trip.estimatedPrice}
                            />
                        ))}
                    </div>
                    <PagerComponent
                         totalRecordsCount={loaderData.total}
                         pageSize={4}
                         currentPage={curentPage}
                         click={(args)=>handlePageChange(args.currentPage)}
                         cssClass="!mb-4"
                    />
                </section>
                
            </section>
        </main>
    )
}
export default Trips