import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'

const SinglePrediciton = () => {
  const router = useRouter()
  const { id } = router.query
  const [loadiing, setLoading] = useState(false)
  const [data, setData] = useState<any>(undefined)
  const fetchData = (data_id: string) => {
    setLoading(true)
    axios
      .request({
        method: 'GET',
        url: `http://localhost:4000/accidents/${data_id}`,
      })
      .then((res) => {
        if (!res || !res.data) return
        return setData(res.data)
      })
      .catch((err) => {
        console.log(err)
        return null
      })
    setLoading(false)
  }

  useEffect(() => {
    if (!id) return
    fetchData(id as string)
  }, [id])
  console.log(data)
  return (
    <Fragment>
      <NavBar />
      <div className="single-prediction-wrapper ">
        <div className="single-prediction">
          {loadiing ? (
            <p>Fetching Data</p>
          ) : data ? (
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
