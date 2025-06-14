import { Header } from 'components'
import React from 'react'

const trips = () => {
  return (
    <main className='all-users wrapper'>
      <Header
        title="Manage Users"
        description="View and edit AI-Generated travel plans"
        ctaText="Create a Trip"
        cta="/createTrip/create"
      />
      </main>
  )
}

export default trips