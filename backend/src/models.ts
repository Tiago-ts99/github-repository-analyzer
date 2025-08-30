export interface RepoStats {
  name: string
  description: string | null
  stars: number
  forks: number
  watchers: number
  languages: Record<string, number>
  totalCommits: number
  totalPRs: number
  totalIssues: number
}
