import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { analyzeRepo } from './githubService'

const app = express()
const PORT = 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/analyze', async (req, res) => {
  const { repoUrl } = req.body
  if (!repoUrl) return res.status(400).json({ error: 'repoUrl is required' })

  try {
    const data = await analyzeRepo(repoUrl)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
)
