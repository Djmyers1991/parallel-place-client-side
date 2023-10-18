import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"

export const Register = ({ setToken, setStaff }) => {
  const firstName = useRef()
  const accountType = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const profileImageUrl = useRef()
  const favoriteBook = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const iq = useRef()
  const potential = useRef()
  const [passwordDialogue, setShowDialogue] = useState(false)
  const navigate = useNavigate()
  const [account, setAccountType] = useState({ type: ""})

  const handleRegister = (e) => {
    e.preventDefault()
    
    if (password.current.value === verifyPassword.current.value && account.type === "student") {
      const newStudent = {
        account_type: accountType.current.value,
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        perceived_iq: iq.current.value,
        overall_potential: potential.current.value
      }
    
      registerUser(newStudent)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
            setStaff(res.staff)
            navigate("/")
          }
        })
    } else {
      setShowDialogue(true)
    }

    if (password.current.value === verifyPassword.current.value && account.type === "teacher") {
      const newTeacher = {
        account_type: accountType.current.value,
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        representing_image: profileImageUrl.current.value,
        favorite_book: favoriteBook.current.value
      }
    
      registerUser(newTeacher)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token)
            setStaff(res.staff)
            navigate("/")
          }
        })
    } else {
      setShowDialogue(true)
    }
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
        <h1 className="title">Parallel Place Book Club</h1>
        <header className="title is-4">Create an Account</header>
        <div className="field">
          <label className="label">Account Type</label>
          <div className="control">
            <input onChange={(event) => {
              const copy = {...account}
              copy.type = event.target.value
              setAccountType(copy)
            }} className="input" type="text" ref={accountType} />
          </div>
        </div>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>
        {account.type === "teacher" ? (
          <>
            <div className="field">
              <label className="label">Favorite Book</label>
              <div className="control">
                <input className="input" type="text" ref={favoriteBook} />
              </div>
            </div>

            <div className="field">
              <label className="label">Profile Image</label>
              <div className="control">
                <input className="input" placeholder="Add a link to an image for your profile" ref={profileImageUrl}/>
              </div>
            </div>

            <div className="field">
              <label className="label">Bio</label>
              <div className="control">
                <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <label className="label">IQ</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="0.01" // Allow floating-point numbers
                  ref={iq}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Potential</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="0.01" // Allow floating-point numbers
                  ref={potential}
                />
              </div>
            </div>
          </>
        )}

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>
      </form>
    </section>
  )
}