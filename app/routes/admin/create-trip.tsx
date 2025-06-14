import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import { Header } from 'components'
import React from 'react'
import type { Route } from './+types/dashboard';
import { comboBoxItems, selectItems } from '~/constants';
import { formatKey } from '~/lib/utils';

export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=flag,name,latlng,maps');

  const data = await response.json()
  return data.map((country: any) => ({
    name: country.flag + country.name.common,
    coordinate: country.latlng,
    value: country?.name.common,
    openStreetMap: country.maps?.openStreetMap,
  }))

}

const createTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => { };
  const handleChange = async (key: keyof TripFormData, value: string | number) => { }
  const countries = loaderData as unknown as Country[];
  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }))


  return (
    <main className='flex flex-col gap-10 pb-10 wrapper'>
      <Header title="Add a new trip" description='View and edit AI Generated travel plans' />
      <section className='mt-2.5 wrapper-md'>
        <form className='trip-from' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='country'>
              Country
            </label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: 'name', value: 'value' }}
              placeholder='Select a Country'
              className='combo-box'
              change={(e: { value: string | undefined }) => {

                if (e.value) {
                  handleChange('country', e.value)
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();
                e.updateData(
                  countries.filter((country) => country.name.toLowerCase().includes(query))
                    .map((country) => (
                      {
                        text: country.name,
                        value: country.value
                      }
                    ))
                )
              }}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder='Enter The number of days'
              className='form-input placeholder:text-gray-100'
              onChange={(e) => handleChange('duration', Number(e.target.value))}
            />

          </div>
          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: 'text', value: 'value' }}
                placeholder={`Select ${key}`}
              />
            </div>
          ))}
        </form>
      </section>
    </main>
  )
}

export default createTrip