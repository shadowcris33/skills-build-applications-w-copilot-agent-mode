import { useEffect, useState } from 'react'
import { getResource } from '../api.js'
import { DataState, ResourcePage } from './ui.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : ''

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getResource('users', usersEndpoint).then(setUsers).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage eyebrow="Roster" title="Users" summary="The people behind every rep, route, and recovery day."><DataState error={error} empty={!users.length} /><div className="card-grid">{users.map((user) => <article className="data-card user-card" key={user._id || user.id}><span className="avatar large">{String(user.name || user.username || 'A').slice(0, 2).toUpperCase()}</span><h2>{user.name || user.username || 'Unnamed athlete'}</h2><p>@{user.username || 'athlete'}</p><footer>{user.email || 'No email listed'}</footer></article>)}</div></ResourcePage>
}

export default Users