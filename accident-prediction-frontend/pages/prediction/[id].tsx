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
                <span className="bold">Prediction is:&nbsp;</span> Yes, There is a
                Chance Of Road Accident! Be Careful.
              </p>
              <p>
                <span className="bold">Cause:&nbsp;</span>High gradient of the
                road that causes vehicles to descend at full speed, especially
                when the driver turns off the ignition and engages the neutral
                gear.
              </p>
              <p>
                <span className="bold">Date:&nbsp;</span>
                {data.date || '-'}
              </p>
              <p>
                <span className="bold">Time:&nbsp;</span>
                {data.time || '-'}
              </p>
              <p>
                <span className="bold">Latitude:&nbsp;</span>
                {data.latitude || '-'}
              </p>
              <p>
                <span className="bold">Longitude:&nbsp;</span>
                {data.longitude || '-'}
              </p>
              <p>
                <span className="bold">Light_condition:&nbsp;</span>
                {data.light_condition || '-'}
              </p>
              <p>
                <span className="bold">Weather_condition:&nbsp;</span>
                {data.weather_condition || '-'}
              </p>
              <p>
                <span className="bold">Visibility:&nbsp;</span>
                {data.visibility || '-'}
              </p>
            </Fragment>
          ) : (
            <p>No Data Found!</p>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default SinglePrediciton
