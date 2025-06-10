import { StatsCard, TripCard } from 'components'
import Header from 'components/Header'
import React from 'react'
import { allTrips, users,dashboardStats } from '~/constants'

const dashboard = () => {
  return (
    <main className='dashboard wrapper'>
      <Header
        title={`Welcome ${users?.name ?? 'Guest'}`}
        description="Track activity,trends and popular destination"
      />
      <section className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.lastMonth}

          />
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}

          />
          <StatsCard
            headerTitle="Active User"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}

          />
        </div>
      </section>
      <section className='container'>
        <h1 className='text-xl font-semibold text-dark-100'>
          Created Trips
        </h1>
        <div className='trip-grid'>
          {allTrips.slice(0,4).map((trip)=>(
              <TripCard
               key={trip.id}
               id={trip.id.toString()}
               name={trip.name}
               imageUrl={trip.imageUrls[0]}
               location={trip.itinerary?.[0]?.location ?? ''}
               tags={trip.tags}
               price={trip.estimatedPrice}

               />
          ))}
        </div>
      </section>
    </main>
  )
}

export default dashboard