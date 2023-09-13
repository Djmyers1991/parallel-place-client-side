import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token  
              ?
              <>
                <Link to="/words" className="navbar-item">Vocab Words</Link>
                <Link to="/wordsform" className="navbar-item">Vocab Word Form</Link>

                <Link to="/my-posts" className="navbar-item">My Posts</Link>
                <Link to="/studentnamelist" className="navbar-item">Students</Link>
                <Link to="/teachernamelist" className="navbar-item">Teachers</Link>
                <Link to="/assignmentlist" className="navbar-item">Assignments</Link>

                <Link to="/standardsubmissionslist" className="navbar-item">Submissions</Link>





              </>
              :
              ""
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    navigate('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>

                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
