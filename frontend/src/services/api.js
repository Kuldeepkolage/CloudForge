import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function getApps() {
  const { data } = await client.get('/apps')
  return data
}

export async function createApp(payload) {
  const { data } = await client.post('/apps', payload)
  return data
}

export async function deleteApp(id) {
  const { data } = await client.delete(`/apps/${id}`)
  return data
}

export default client