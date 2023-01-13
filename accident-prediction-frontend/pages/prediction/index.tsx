import axios from 'axios'
import { useRouter } from 'next/router'
import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'

const Dropdown = ({
  title,
  value,
  setValue,
  data,
  inputType,
  loading,
}: {
  title: string
  data: Array<any>
  value: any
  setValue: (val: any) => void
  inputType: React.HTMLInputTypeAttribute
  loading: boolean
}) => {
  const [open, setopen] = useState(false)

  return (
    <div
      className="input-wrapper"
      onFocus={() => setopen(true)}
      onMouseLeave={() => setopen(false)}
    >
      <label>{title}</label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {open && (
        <div className="childrens">
          {loading ? (
            <p>Loading</p>
          ) : data && data.length > 0 ? (
            <Fragment>
              {data
                .filter((v, i) => data.indexOf(v) == i)
                .map((item, i) => (
                  <p
                    key={0}
                    onClick={() => {
                      setValue(item)
                      setopen(false)
                    }}
                  >
                    {item}
                  </p>
                ))}
            </Fragment>
          ) : (
            <p>Data not found</p>
          )}
        </div>
      )}
    </div>
  )
}

const Prediction = () => {
  const [latitude, setlatitude] = useState(0)
  const [longitude, setlongitude] = useState(0)
  const [weather_condition, setweather_condition] = useState('')
  const [date, setdate] = useState('')
  const [light_condition, setlight_condition] = useState('')
  const [visibility, setvisibility] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handlePredict = () => {
    if (!data || data.length === 0 || !data[0] || !(data[0] as any)._id) return
    router.push(`prediction/${(data[0] as any)._id}`)
  }

  const fetchData = () => {
    setLoading(true)
    axios
      .request({
        method: 'GET',
        url: 'http://localhost:4000/accidents',
        params: {
          latitude,
          longitude,
          weather_condition,
          date,
          light_condition,
          visibility,
        },
      })
      .then((res) => {
        if (!res || !res.data) return
        return setData((res.data.result && res.data.result) || [])
      })
      .catch((err) => {
        console.log(err)
        return null
      })
    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    latitude,
    longitude,
    weather_condition,
    date,
    light_condition,
    visibility,
  ])

  return (
    <Fragment>
      <NavBar />
      <div className="predition-wrapper">
        <Dropdown
          title="LATITUDE"
          value={latitude}
          setValue={setlatitude}
          inputType="number"
          data={data && data.map((item: any) => item.latitude)}
          loading={loading}
        />

        <Dropdown
          title="LONGITUDE"
          value={longitude}
          setValue={setlongitude}
          inputType="number"
          data={data && data.map((item: any) => item.longitude)}
          loading={loading}
        />

        <Dropdown
          title="DATE"
          value={date}
          setValue={setdate}
          inputType="text"
          data={data && data.map((item: any) => item.date)}
          loading={loading}
        />

        <Dropdown
          title="WEATHER CONDITION"
          value={weather_condition}
          setValue={setweather_condition}
          inputType="text"
          data={data && data.map((item: any) => item.weather_condition)}
          loading={loading}
        />

        <Dropdown
          title="LIGHT CONDITION"
          value={light_condition}
          setValue={setlight_condition}
          inputType="text"
          data={data && data.map((item: any) => item.light_condition)}
          loading={loading}
        />
        <Dropdown
          title="VISIBILITY"
          value={visibility}
          setValue={setvisibility}
          inputType="number"
          data={data && data.map((item: any) => item.visibility)}
          loading={loading}
        />
      </div>
      <button className="hero-button" onClick={() => handlePredict()}>
        Start Prediction
      </button>
    </Fragment>
  )
}

export default Prediction
