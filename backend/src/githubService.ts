import { Octokit } from '@octokit/rest'
import { RepoStats } from './models'


const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function analyzeRepo(repoUrl: string): Promise<RepoStats> {
  const parts = repoUrl.replace('https://github.com/', '').split('/')
  if (parts.length !== 2) throw new Error('Invalid GitHub repo URL')
  const [owner, repo] = parts

  const repoInfo = await octokit.repos.get({ owner, repo })
  const languages = await octokit.repos.listLanguages({ owner, repo })
  const commits = await octokit.repos.listCommits({ owner, repo, per_page: 1 })
  const pulls = await octokit.pulls.list({ owner, repo, state: 'all' })
  const issues = await octokit.issues.listForRepo({ owner, repo, state: 'all' })

  return {
    name: repoInfo.data.name,
    description: repoInfo.data.description,
    stars: repoInfo.data.stargazers_count,
    forks: repoInfo.data.forks_count,
    watchers: repoInfo.data.watchers_count,
    languages: languages.data,
    totalCommits: commits.headers['link']
      ? parseInt(commits.headers['link'].split('page=')[1].split('>')[0])
      : commits.data.length,
    totalPRs: pulls.data.length,
    totalIssues: issues.data.length,
  }
}
