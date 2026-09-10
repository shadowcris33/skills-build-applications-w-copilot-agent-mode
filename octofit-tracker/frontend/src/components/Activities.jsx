import { useEffect, useState } from 'react'
import { formatDate, getResource } from '../api.js'
import { DataState, ResourcePage } from './ui.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : ''

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getResource('activities', activitiesEndpoint).then(setActivities).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage eyebrow="Training log" title="Activities" summary="Keep the team moving with a clear view of recent effort."><DataState error={error} empty={!activities.length} /><div className="table-wrap"><table className="data-table"><thead><tr><th>Activity</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.type || 'Activity'}</strong><small>{activity.userId || 'Unassigned athlete'}</small></td><td>{activity.durationMinutes ?? 0} min</td><td className="accent-value">+{activity.points ?? 0}</td><td>{formatDate(activity.completedAt)}</td></tr>)}</tbody></table></div></ResourcePage>
}

export default Activities