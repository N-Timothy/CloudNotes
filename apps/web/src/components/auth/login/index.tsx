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
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <h4 className="auth-title"> LOG IN </h4>
        <div>
          <div className="auth-input-grid">
            <div>
              <span className="auth-icon">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </i>
              </span>
            </div>
            <input
              className="auth-input"
              type="email"
              placeholder="Email..."
              name="email"
              required
            />
          </div>
        </div>
        <div>
          <div className="auth-input-grid">
            <div>
              <span className="auth-icon">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </i>
              </span>
            </div>
            <input
              className="auth-input"
              type="password"
              placeholder="Password..."
              name="password"
              required
            />
            <div className="flex -mr-px">
              <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"></span>
            </div>
          </div>
        </div>
        <div className="auth-button-placement">
          <button type="submit" className="auth-button">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  )
}

export default login
