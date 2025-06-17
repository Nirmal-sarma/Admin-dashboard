import {Header, TripCard} from "../../../components";
import {type LoaderFunctionArgs, useSearchParams} from "react-router";
import {getAllTrips, getTripById} from "~/appwrite/trips";
import {parseTripData} from "~/lib/utils";
import type {Route} from './+types/trips'
import {useState} from "react";


const Trips = () => {
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

               

               
            </section>
        </main>
    )
}
export default Trips