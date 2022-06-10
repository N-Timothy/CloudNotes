import dynamic from 'next/dynamic'

let LoginComponent = dynamic(
  () => import('../../components/auth/login/index'),
)

let RegisterComponent = dynamic(
  () => import('../../components/auth/register/index'),
)

function auth() {
  function handleAuthMode(e: any) {
    let login = document.getElementById('loginComponent')
    let register = document.getElementById('registerComponent')
    if (e.target.checked) {
      if (login != null && register != null) {
        login.classList.remove('in')
        register.classList.remove('out')
        login.classList.add('out')
        register.classList.add('in')
      }
    } else {
      if (login != null && register != null) {
        login.classList.remove('out')
        register.classList.remove('in')
        register.classList.add('out')
        login.classList.add('in')
      }
    }
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
            <input type="checkbox" onChange={handleAuthMode} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <i id="loginComponent" className="login-component">
        <LoginComponent />
      </i>
      <i id="registerComponent" className="register-component">
        <RegisterComponent />
      </i>
    </div>
  )
}

export default auth
