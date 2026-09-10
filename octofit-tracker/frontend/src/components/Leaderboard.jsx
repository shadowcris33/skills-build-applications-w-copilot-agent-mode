import { useEffect, useState } from 'react'
import { getResource } from '../api.js'
import { DataState, ResourcePage } from './ui.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getResource('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage eyebrow="Team pulse" title="Leaderboard" summary="A quick read on who is setting the pace this week."><DataState error={error} empty={!entries.length} /><div className="leaderboard-list">{entries.map((entry, index) => <div className="leader-row" key={entry._id || entry.id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="avatar">{String(entry.userId || 'A').slice(0, 2).toUpperCase()}</span><strong>{entry.userId || 'Athlete'}</strong><span className="points">{entry.points ?? 0} <small>pts</small></span></div>)}</div></ResourcePage>
}

export default Leaderboard