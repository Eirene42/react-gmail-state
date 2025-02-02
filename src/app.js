import Header from './components/header'

import initialEmails from './data/emails'
import { useEffect, useState } from 'react'

import './styles/app.css'

function App() {
  
  const [emails, setEmails] = useState(initialEmails)
  const [totalEmails, setTotalEmails] = useState([])
  const [hideReadEmails, setHideReadEmails] = useState(false);

  useEffect(() => {
    setTotalEmails(emails);
  }, [emails]);

  const toggleRead = (event, emailId) => {
    const isChecked = event.target.checked;
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, read: isChecked } : email
    );
    setEmails(updatedEmails);
  };

  const toggleStar = (event, emailId) => {
    const isChecked = event.target.checked;
    const updatedEmails = emails.map(email =>
      email.id === emailId ? { ...email, starred: isChecked } : email
    )
    setEmails(updatedEmails)
  }

  const getReadEmails = (emails) => {
      return emails.filter(email => !email.read);
  }

  const unreads = totalEmails.filter(email => email.read === false)
  const stars = totalEmails.filter(email => email.starred === true)

  const showUnreadEmails = () => {
    setTotalEmails(unreads)
  }

  const showStarredEmails = () => {
    setTotalEmails(stars)
  }

  const hidesEmails = () => {
    if (hideReadEmails) {
      setTotalEmails(emails);
    } else {
      setTotalEmails(getReadEmails(totalEmails));
    }
    setHideReadEmails(!hideReadEmails);
  };

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={showUnreadEmails}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreads.length}</span>
          </li>
          <li
            className="item"
            onClick={showStarredEmails}
          >
            <span className="label">Starred</span>
            <span className="count">{stars.length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadEmails}
              onChange={hidesEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{
        totalEmails.map((email) => (
        <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
          <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            onChange={(event) => toggleRead(event, email.id)}
            checked = {email.read}
            />
          </div>
          <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            onChange={(event) => toggleStar(event, email.id)}
            checked = {email.starred}
          />
          </div>
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>))
      }</main>
    </div>
  )
}

export default App
