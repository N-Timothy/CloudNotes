import {getCookie} from 'cookies-next'
import {useEffect, useState} from 'react'

type Response<T extends object = object> = {
  data: T[]
  errors: []
}

type User = {
  name: string
  email: string
}

function UserPage() {
  let [data, setData] = useState<Response<User>>()
  let [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${getCookie('auth_token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  return (
    <div>
      {data.data.map((value, key) => {
        return (
          <div key={key}>
            <div>{value.email}</div>
            <div> {value.name} </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserPage
