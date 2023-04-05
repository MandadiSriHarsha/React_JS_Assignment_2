import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const profileColors = [
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
  '#0b69ff',
]

const starsUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const starsAltText = 'stars'

const deleteUrl =
  'https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'

const deleteAltText = 'delete'

const CreateList = props => {
  const {data, isPasswordCheckboxTicked, deletePassword} = props
  const {
    id,
    websiteName,
    profilePicClassName,
    userName,
    userPassword,
    maskedPassword,
    deleteLogo,
    profilePicText,
  } = data
  const remove = () => {
    deletePassword(id)
  }
  return (
    <li className="list-item">
      <div className="profile-pic-container">
        <p className={`profile-pic-text-style ${profilePicClassName}`}>
          {profilePicText}
        </p>
      </div>
      <div className="list-item-data-card">
        <p className="website-url-style">{websiteName}</p>
        <p className="username-style">{userName}</p>
        {!isPasswordCheckboxTicked ? (
          <img
            src={maskedPassword}
            alt={starsAltText}
            className="stars-style"
          />
        ) : (
          <p className="password-style">{userPassword}</p>
        )}
      </div>
      <div className="delete-button-container">
        <button type="button" className="delete-button" onClick={remove}>
          <img src={deleteLogo} alt={deleteAltText} className="delete-logo" />
        </button>
      </div>
    </li>
  )
}

class App extends Component {
  state = {
    noOfPasswords: 0,
    websiteUrl: '',
    username: '',
    password: '',
    usersPasswordsList: [],
    isPasswordCheckboxTicked: false,
    searchText: '',
  }

  addWebsiteUrl = event => {
    this.setState({websiteUrl: event.target.value})
  }

  addUsername = event => {
    this.setState({username: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  tickCheckbox = event => {
    this.setState({isPasswordCheckboxTicked: event.target.checked})
  }

  addEntireDetails = event => {
    event.preventDefault()
    const {
      username,
      password,
      websiteUrl,
      usersPasswordsList,
      noOfPasswords,
    } = this.state
    const randomNumber = Math.ceil(Math.random() * profileColors.length)
    const profilePicStyleClassName = `profile-style-${randomNumber}`
    const newObject = {
      id: uuidv4(),
      profilePicClassName: profilePicStyleClassName,
      profilePicText: websiteUrl.slice(0, 1),
      websiteName: websiteUrl,
      userName: username,
      maskedPassword: starsUrl,
      userPassword: password,
      deleteLogo: deleteUrl,
    }
    const newList = [...usersPasswordsList, newObject]
    this.setState({
      usersPasswordsList: newList,
      noOfPasswords: noOfPasswords + 1,
      username: '',
      websiteUrl: '',
      password: '',
    })
  }

  searchPassword = event => {
    this.setState({searchText: event.target.value})
  }

  deletePassword = id => {
    const {usersPasswordsList, noOfPasswords} = this.state
    const newList = usersPasswordsList.filter(eachitem => eachitem.id !== id)
    this.setState({
      usersPasswordsList: newList,
      noOfPasswords: noOfPasswords - 1,
    })
  }

  render() {
    const {
      username,
      password,
      websiteUrl,
      noOfPasswords,
      usersPasswordsList,
      isPasswordCheckboxTicked,
      searchText,
    } = this.state
    const newList = usersPasswordsList.filter(eachitem =>
      eachitem.websiteName.toLowerCase().includes(searchText.toLowerCase()),
    )
    return (
      <div className="password-manager-bg-container">
        <div className="password-manager-heading-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="card-1">
          <div className="card-1-image-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-logo"
            />
          </div>
          <form className="add-passwords-form">
            <h1 className="form-heading">Add New Password</h1>
            <div className="password-input-container">
              <div className="enter-website-container-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-logo"
                />
              </div>
              <div className="enter-website-container-input-container">
                <input
                  type="text"
                  className="website-text-box"
                  placeholder="Enter Website"
                  onChange={this.addWebsiteUrl}
                  value={websiteUrl}
                />
              </div>
            </div>
            <div className="password-input-container">
              <div className="enter-username-container-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="username-logo"
                />
              </div>
              <div className="enter-username-container-input-container">
                <input
                  type="text"
                  className="username-text-box"
                  placeholder="Enter Username"
                  onChange={this.addUsername}
                  value={username}
                />
              </div>
            </div>
            <div className="password-input-container">
              <div className="enter-password-container-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="password-logo"
                />
              </div>
              <div className="enter-password-container-input-container">
                <input
                  type="password"
                  className="password-text-box"
                  placeholder="Enter Password"
                  onChange={this.addPassword}
                  value={password}
                />
              </div>
            </div>
            <div className="form-button-container">
              <button
                className="form-button"
                type="submit"
                onClick={this.addEntireDetails}
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="card-2">
          <div className="card-2-heading-card">
            <h1 className="card-2-heading-card-text-1">
              Your Passwords <p className="passwords-count">{noOfPasswords}</p>
            </h1>
            <div className="search-password-card">
              <div className="search-password-card-image-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <input
                type="search"
                className="input-box"
                placeholder="Search"
                onChange={this.searchPassword}
                value={searchText}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords-checkbox-card">
            <input
              type="checkbox"
              id="displayPasswords"
              className="show-passwords-checkbox"
              onChange={this.tickCheckbox}
            />
            <label htmlFor="displayPasswords">Show Passwords</label>
          </div>
          {newList.length !== 0 ? (
            <>
              <ul className="unordered-list">
                {newList.map(eachitem => (
                  <CreateList
                    data={eachitem}
                    key={eachitem.id}
                    isPasswordCheckboxTicked={isPasswordCheckboxTicked}
                    deletePassword={this.deletePassword}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="empty-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-image"
                />
                <p className="no-password-text">No Passwords</p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App
