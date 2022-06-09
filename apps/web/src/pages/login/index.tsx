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
    <div className="login-grid">
      <h2 className="app-title"> Cloud Notes </h2>
      <div className="auth-mode">
        <div className="auth-mode-label">
          <label className="auth-mode-login"> LOGIN </label>
          <label className="auth-mode-signup"> SIGN UP </label>
        </div>
        <div className="auth-mode-toggle">
          <label>
            <div className="relative">
              <input
                id="authMode"
                type="checkbox"
                className="sr-only"
              />
              <div className="w-14 h-6 bg-[#ffeba7] rounded-full shadow-inner"></div>
              <div className="dot absolute w-8 h-8 bg-white rounded-full shadow -left-1 -top-1 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 auth-toggle-arrow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 7l4-4m0 0l4 4m-4-4v18"
                  />
                </svg>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h4 className="login-title"> LOG IN </h4>
          <div>
            <div className="login-input-box">
              <span className="login-icon">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </i>
              </span>

              <input
                className="login-email"
                type="email"
                placeholder="Email..."
                name="email"
                required
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-eye-slash"></i>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="login-input-box">
              <span className="login-icon">
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </i>
              </span>
              <input
                className="login-password"
                type="password"
                placeholder="Password..."
                name="password"
                required
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-eye-slash"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="login-button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default login
