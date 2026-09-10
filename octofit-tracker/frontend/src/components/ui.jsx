export function ResourcePage({ eyebrow, title, summary, children }) {
  return <section className="resource-page"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-summary">{summary}</p></div><span className="record-badge">Live data</span></div>{children}</section>
}

export function DataState({ error, empty }) {
  if (error) return <div className="notice warning"><strong>API connection unavailable.</strong> {error} Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code> and restart Vite.</div>
  if (empty) return <div className="notice">No records yet. Your next session will appear here.</div>
  return null
}