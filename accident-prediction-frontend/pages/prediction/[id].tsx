import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useAccident } from '../../context/accidentContext'

const SinglePrediciton = () => {
  const [data, setData] = useState<any>(undefined)
  const router = useRouter()
  const { id } = router.query as any
  const { list, loading } = useAccident()

  useEffect(() => {
    if (!list || list.length === 0 || !id) return
    const filteredIndex = list.findIndex(
      (item: any) => item._id.toString() == id.toString()
    )
    console.log(list[filteredIndex], filteredIndex, loading, list.length)
    setData(list[filteredIndex])
  }, [list, id])

  return (
    <Fragment>
      <NavBar />
      <div className="single-prediction-wrapper ">
        <div className="single-prediction">
          {data ? (
            <Fragment>
              <p>
                <span className="bold">Prediction is:&nbsp;</span> Yes, There is
                a Chance Of Road Accident! Be Careful.
              </p>
              <p>
                <span className="bold">Cause:&nbsp;</span>
                {data.causes}
              </p>
              <p>
                <span className="bold">Summary:&nbsp;</span>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Light Condition</th>
                    <th>Weather Condition</th>
                    <th>Visiblilty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> {data.date || '-'}</td>
                    <td> {data.time || '-'}</td>
                    <td> {data.latitude || '-'}</td>
                    <td> {data.longitude || '-'}</td>
                    <td> {data.light_condition || '-'}</td>
                    <td> {data.weather_condition || '-'}</td>
                    <td> {data.visibility || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </Fragment>
          ) : (
            <p>
              <span className="bold">Prediction is:&nbsp;</span> No, There is no
              chance of road accidents!
            </p>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default SinglePrediciton
