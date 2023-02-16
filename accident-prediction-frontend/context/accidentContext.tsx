import axios from 'axios'
import React, { ReactNode, useContext, useEffect, useState } from 'react'

const values = {
  loading: false,
  list: [],
}
const Context = React.createContext(values)

const AccidentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const handleList = async () => {
    if (loading) return
    setLoading(true)
    await axios
      .request({
        method: 'GET',
        url: `/api/import`,
      })
      .then((res) => {
        if (!res || !res.data) return
        return setData((res && res.data) || [])
      })
      .catch((err) => {
        return setData([])
      })
    setLoading(false)
  }

  useEffect(() => {
    handleList()
  }, [])

  if (loading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  if (!data)
    return (
      <div className="center">
        <h4>Accidents Data Not Uploaded...</h4>
      </div>
    )
  // console.log(data)
  return (
    <Context.Provider
      value={{
        list: data,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AccidentProvider

export const useAccident = () => {
  return useContext(Context)
}
