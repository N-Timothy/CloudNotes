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
  }

  return (
    <div className="auth-grid">
      <h2 className="app-title"> Cloud Notes </h2>
      <div className="auth-mode">
        <div className="auth-mode-label">
          <label className="auth-mode-login"> LOGIN </label>
          <label className="auth-mode-signup"> SIGN UP </label>
        </div>
        <div className="auth-toggle">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="register-form">
        <form onSubmit={handleRegister}>
          <h4 className="auth-title"> SIGN IN </h4>
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
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </i>
                </span>
              </div>
              <input
                className="auth-input"
                type="text"
                placeholder="Name..."
                name="name"
                required
              />
            </div>
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
              <div className="flex -mr-px"></div>
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
                placeholder="Confirm Password..."
                name="password_confirmation"
                required
              />
              <div className="flex -mr-px"></div>
            </div>
          </div>
          <div className="auth-button-placement">
            <button type="submit" className="auth-button">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default register
