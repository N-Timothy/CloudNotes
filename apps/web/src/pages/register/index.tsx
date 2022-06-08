type User = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

function register() {
  async function handleRegister(e: any) {
    e.preventDefault()
    let user: User = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value,
    }
    let res = await fetch('http://localhost:3000/api/auth/register', {
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
    <form onSubmit={handleRegister}>
      <h2>This is a registeration form</h2>
      <div>Name : </div>
      <input type="text" placeholder="Name..." name="name" required />
      <div>Email : </div>
      <input
        type="email"
        placeholder="Email..."
        name="email"
        required
      />
      <div>Password : </div>
      <input
        type="password"
        placeholder="Password..."
        name="password"
        required
      />
      <div>Re-Password : </div>
      <input
        type="password"
        placeholder="Password..."
        name="password_confirmation"
        required
      />
      <div>
        <button type="submit">Confirm</button>
      </div>
    </form>
  )
}

export default register
