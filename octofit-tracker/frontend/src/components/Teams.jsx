import { useEffect, useState } from 'react'
import { getResource } from '../api.js'
import { DataState, ResourcePage } from './ui.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getResource('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage eyebrow="Community" title="Teams" summary="Find your crew, compare momentum, and make consistency social."><DataState error={error} empty={!teams.length} /><div className="card-grid">{teams.map((team) => <article className="data-card" key={team._id || team.id}><span className="card-kicker">TEAM</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'A new training collective.'}</p><footer>{Array.isArray(team.members) ? team.members.length : 0} members</footer></article>)}</div></ResourcePage>
}

export default Teams