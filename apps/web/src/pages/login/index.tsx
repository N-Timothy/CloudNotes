function login() {
  async function handleLogin(e: any) {
    e.preventDefault()

    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    let res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    let data = await res.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleLogin}>
      <h2> This is a login form </h2>
      <div> Email : </div>
      <input
        type="email"
        placeholder="Email..."
        name="email"
        required
      ></input>
      <div>Password : </div>
      <input
        type="password"
        placeholder="Password..."
        name="password"
        required
      ></input>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default login
