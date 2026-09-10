const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : ''

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload

  const candidates = [
    payload?.data,
    payload?.results,
    payload?.items,
    payload?.docs,
    payload?.data?.items,
    payload?.results?.items,
  ]

  return candidates.find(Array.isArray) || []
}

export async function getResource(resource) {
  if (!API_BASE_URL) {
    throw new Error('VITE_CODESPACE_NAME is not configured.')
  }

  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status}).`)
  }

  return normalizeCollection(await response.json())
}

export function formatDate(value) {
  if (!value) return 'Not recorded'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}