import { useEffect, useState } from 'react'
import { getResource } from '../api.js'
import { DataState, ResourcePage } from './ui.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getResource('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourcePage eyebrow="Suggested sessions" title="Workouts" summary="Choose a session that fits the energy you have today."><DataState error={error} empty={!workouts.length} /><div className="card-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id || workout.id}><span className="card-kicker">{workout.difficulty || 'SESSION'}</span><h2>{workout.name || 'Untitled workout'}</h2><p>{workout.description || 'Build a little more momentum.'}</p><footer>{workout.durationMinutes ?? 0} min</footer></article>)}</div></ResourcePage>
}

export default Workouts