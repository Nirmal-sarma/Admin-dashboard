import { StatsCard, TripCard } from 'components'
import Header from 'components/Header'
import React from 'react'
import { getAllUsers, getUser } from '~/appwrite/auth'
import type { Route } from './+types/dashboard'
import { getTripsByTravelStyle, getUserGrowthPerDay, getUsersAndTripsStats } from '~/appwrite/dashboard'
import { Category, ChartComponent, ColumnSeries, DataLabel, Inject, load, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Tooltip } from '@syncfusion/ej2-react-charts'
import { getAllTrips } from '~/appwrite/trips'
import { parseTripData } from '~/lib/utils'
import { userXAxis, useryAxis } from '~/constants'
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids'



export const clientLoader = async () => {
  const [user, dashboardStats, trips, tripsByTravelStyle, userGrowth, allUsers] = await Promise.all([
    await getUser(),
    await getUsersAndTripsStats(),
    await getAllTrips(4, 0),
    await getTripsByTravelStyle(),
    await getUserGrowthPerDay(),
    await getAllUsers(4, 0),

  ]);
  const alltrips = trips.allTrips.map(({ $id, tripDetail, imageUrl }) => ({
    id: $id,
    tripDetail: parseTripData(tripDetail),
    imageUrl: imageUrl ?? [],
  }));

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user: any) => (
    {
      imageUrl: user?.imageUrl,
      name: user?.name,
      count: user?.itineraryCount ?? Math.floor(Math.random()*10 + 1),
    }
  ));

  return {
    user,
    dashboardStats,
    alltrips,
    tripsByTravelStyle,
    userGrowth,
    allUsers: mappedUsers
  }
}


const Dashboard = ({ loaderData }: Route.ComponentProps) => {

  // throw new Error("some error thrown in a dashboard");

  const user = loaderData.user as unknown as User | null;
  const { dashboardStats, alltrips, tripsByTravelStyle, userGrowth, allUsers } = loaderData;
  const trips = alltrips.map((trip) => ({
    imageUrl: trip.imageUrl[0],
    name: trip.tripDetail?.name,
    interest: trip.tripDetail?.interests,
  }))
  const usersAndTrips = [
    {
      title: 'Latest user signUps',
      dataSources: allUsers,
      field: 'count',
      headerText: 'Trips created'

    },
    {
      title: 'Latest trips on interests',
      dataSources: trips,
      field: 'interest',
      headerText: 'Interests'

    }
  ]
  return (
    <main className='dashboard wrapper'>
      <Header
        title={`Welcome ${user?.name ?? 'Guest'}`}
        description="Track activity,trends and popular destination"
      />
      <section className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}

          />
          <StatsCard
            headerTitle="Total Trips"
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
          {alltrips.map((item: any) => (
            <TripCard
              key={item.id}
              id={item.id.toString()}
              name={item.tripDetail.name!}
              imageUrl={item.imageUrl[0]}
              location={item.tripDetail.itinerary?.[0]?.location || ''}
              tags={[item.tripDetail.interests!, item.tripDetail.travelStyle!, item.tripDetail.groupType]}
              price={item.tripDetail.estimatedPrice!}

            />
          ))}
        </div>
      </section>
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <ChartComponent
          id='charts'
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          tooltip={{ enable: true }}
          title="User Growth"
        >
          <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName='day'
              yName='count'
              type='Column'
              columnWidth={0.3}
              cornerRadius={{
                topLeft: 10, topRight: 10
              }}
            />
            <SeriesDirective
              dataSource={userGrowth}
              xName='day'
              yName='count'
              type='SplineArea'
              name='Wave'
              fill="rgba(71,132,238,0.3)"
              columnWidth={0.3}
              cornerRadius={{
                topLeft: 10, topRight: 10
              }}
            />
          </SeriesCollectionDirective>

        </ChartComponent>
        <ChartComponent
          id='charts-2'
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          tooltip={{ enable: true }}
          title="Travel Style"
        >
          <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={tripsByTravelStyle}
              xName='travelStyle'
              yName='count'
              type='Column'
              name='day'
              columnWidth={0.3}
              cornerRadius={{
                topLeft: 10, topRight: 10
              }}
            />

          </SeriesCollectionDirective>

        </ChartComponent>
      </section>
      <section className='user-trip-wrapper'>
        {usersAndTrips.map(({ title, dataSources, field, headerText, i }) => (

          <div key={i} className='flex flex-col gap-5'>
            <h3 className='p-20-semibold text-dark-100'>{title}</h3>
            <GridComponent dataSource={dataSources} gridLines='None'>
              <ColumnsDirective>
                <ColumnDirective
                  field="name"
                  headerText="Name"
                  width="200"
                  textAlign='Left'
                  template={(props: any) => (
                    <div className='flex items-center gap-1.5 px-4'>
                      <img src={props.imageUrl}
                        alt='user'
                        className='rounded-full size-8 aspect-square'
                        referrerPolicy='no-referrer' />
                      <span>{props.name}</span>
                    </div>
                  )}
                />
                <ColumnDirective
                  field={field}
                  headerText={headerText}
                  width='150'
                  textAlign='Left'
                />
              </ColumnsDirective>
            </GridComponent>
          </div>

        ))}
      </section>

    </main>
  )
}

export default Dashboard