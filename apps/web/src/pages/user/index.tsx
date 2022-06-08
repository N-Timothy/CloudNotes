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
      {Object.entries(data).map(([key, value]) => {
        if (key === 'data') {
          return (
            <div key={key}>
              <h1>{key}</h1>
              <div>
                {Object.entries(value).map(([key2, value2]) => {
                  return (
                    <div key={key2}>
                      <div style={{paddingTop: '20px'}}>
                        {Object.entries(value2).map(
                          ([key3, value3]) => {
                            if (
                              key3 === 'id' ||
                              key3 === 'name' ||
                              key3 === 'email'
                            ) {
                              return (
                                <div key={key3}>
                                  <h3>
                                    {key3} : {value3}
                                  </h3>
                                </div>
                              )
                            }
                          },
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default user
