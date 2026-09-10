import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
        <header className="app-header">
          <NavLink className="brand" to="/activities">
            <span className="brand-mark">OF</span>
            <span><strong>Octofit</strong><small>Tracker</small></span>
          </NavLink>
          <nav className="main-nav" aria-label="Primary navigation">
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Users</NavLink>
          </nav>
          <span className="status-dot">LIVE</span>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Activities />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
    </div>
  )
}

export default App
