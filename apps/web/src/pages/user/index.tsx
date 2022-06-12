import {useEffect, useState} from 'react'

function user() {
  let [data, setData] = useState()
  let [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  let users: any = data
  if (isLoading) return <p>Loading...</p>
  if (!users) return <p>No profile data</p>
  return (
    <div>
      {Object.entries(data.data).map(([key, value]) => {
        return (
          <div key={key}>
            <h1>{key}</h1>
            <div>{JSON.stringify(value)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default user
