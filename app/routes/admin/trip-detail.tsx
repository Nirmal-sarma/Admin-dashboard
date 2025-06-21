import React from 'react'
import { useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { getAllTrips, getTripById } from '../../appwrite/trips';
import type { Route } from './+types/dashboard';
import { cn, getFirstWord, parseTripData } from '../../lib/utils';
import  Header from 'components/Header';
import InfoPill from 'components/InfoPill';
import TripCard  from 'components/TripCard';

import { load } from '@syncfusion/ej2-react-charts';
import { ChipDirective, ChipListComponent, ChipsDirective } from '@syncfusion/ej2-react-buttons';

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    if (!tripId) {
        throw new Error('Trip ID is required');
    }
    const [trip, trips] = await Promise.all([
         getTripById(tripId),
         getAllTrips(4, 0),
    ])

return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrl }) => ({
        id: $id,
        tripDetail: parseTripData(tripDetail),
        imageUrl: imageUrl ?? '',
    }))
};
}

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    // console.log({get:{loaderData}});
    const { trip, allTrips } = useLoaderData<typeof loader>();
    // console.log(trip);
    // console.log(allTrips);
    const tripData=parseTripData(trip?.tripDetail);
    console.log({'get':trip})
    const { name,
        description,
        estimatedPrice,
        duration,
        budget,
        travelStyle,
        country,
        interests,
        groupType,
        bestTimeToVisit,
        weatherInfo,
        location,
        itinerary,
    } = tripData || {};
    const pillItems = [
        { text: travelStyle, bg: '!bg-pink-50 !text-pink-500' },
        { text: groupType, bg: '!bg-primary-50 !text-primary-500' },
        { text: budget, bg: '!bg-success-50 !text-success-700' },
        { text: interests, bg: '!bg-navy-50 !text-navy-500' }
    ]

    const visitTimeAndWhetherInfo = [
        { title: 'Best Time to Visit', items: bestTimeToVisit },
        { title: 'Weather Info', items: weatherInfo }
    ];

    return (
        <main className="travel-detail wrapper">
            <Header
                title='Trip Detail'
                description="View and edit AI-generated travel plans"
            />
            <section className="container wrapper-md">
                <header>
                    <h1 className="p-40-semibold text-dark-100">
                        {name}
                    </h1>
                    <div className='flex items-center gap-5'>
                        <InfoPill text={`${duration} day plan`}
                            image="/assets/icons/calendar.svg"
                        />
                        <InfoPill text={itinerary?.slice(0, 3).map((item: any) => item.location).join(',') || ''}
                            image="/assets/icons/location-mark.svg"
                        />
                    </div>
                </header>
                <section className="gallery">
                    {trip?.imageUrl?.map((url: any, index: any) => (
                        <img src={url}
                            key={index}
                            className={cn('w-full rounded-xl object-cover', index === 0 ? 'md:col-span-2 md:row-span-2 h-[330px]' : 'md:row-span-1 h-[150px]')} />
                    ))}
                </section>
                <section className="flex gap-5 md:gap-5 items-center flex-wrap">
                    <ChipListComponent id="travel-chip">
                        <ChipsDirective>
                            {pillItems.map((item, index) => (
                                <ChipDirective
                                    key={index}
                                    text={getFirstWord(item.text)}
                                    cssClass={`${item.bg} !text-base !font-medium !px-4`}
                                />
                            ))}
                        </ChipsDirective>
                    </ChipListComponent>
                    <ul className='flex gap-1 items-center'>
                        {Array(5).fill('null').map((_, index) => (
                            <li key={index}>
                                <img src="/assets/icons/star.svg"
                                    alt="star"
                                    className='size-[18px]' />

                            </li>
                        ))}
                        <li className='ml-1'>
                            <ChipListComponent>
                                <ChipsDirective>
                                    <ChipDirective
                                        text="4.9/5"
                                        cssClass='!bg-yellow-50 !text-yellow-700 !text-base !font-medium !px-4'
                                    />


                                </ChipsDirective>
                            </ChipListComponent>
                        </li>
                    </ul>
                </section>
                <section className="title">
                    <article className='text-dark-100 p-4'>
                        <h3>
                            {duration}-Day {country} {travelStyle} Trip
                        </h3>
                        <p>
                            {budget},{groupType} and {interests}
                        </p>
                    </article>
                    <h2>{estimatedPrice}</h2>

                </section>
                <p className='text-sm md:text-lg font-normal text-dark-400'>
                    {description}
                </p>
                <ul className='itinerary'>
                    {itinerary?.map((dayPlan: DayPlan, index: number) => (
                        <li key={index}>
                            <h3> Day {dayPlan.day} : {dayPlan.location}</h3>

                            <ul>
                                {dayPlan.activities.map((activity, index: number) => (
                                    <li key={index}>
                                        <span className='flex-shring-0 p-18-semibold'>{activity.time}</span>
                                        <p className='flex-grow'>{activity.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                </ul>
                {visitTimeAndWhetherInfo.map((info, index) => (
                    <section key={index} className='visit'>
                        <div>
                            <h3 className='p-40-semibold text-dark-100'>
                                {info.title}
                            </h3>
                            <ul>
                                {info.items?.map((item, index) => (
                                    <li key={index} className='flex items-center gap-2'>
                                        <p key={item} className='flex-grow'>{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}

            </section>
            <section className='flex flex-col gap-6'>
                <h2 className='p-24-semibold text-dark-100'> Popular Trips</h2>
                <div className='trip-grid'>
                    {allTrips.map((trip: any) => (
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
            </section>
        </main>
    )
}
export default TripDetail;