# GitHub Repository Analyzer in Typescript

![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)  ![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## Overview

A modern **GitHub repository analyzer** built with TypeScript, Node.js, and Express.
Enter any public GitHub repository URL and get detailed statistics including commits, stars, forks, watchers, PRs, issues, and language breakdown.

---

## Features

* Analyze any GitHub repository in real-time
* Show repo stats: stars, forks, watchers, commits, PRs, issues
* Display used languages and bytes
* Live preview on frontend
* Easy integration for dashboards or readmes

---

## Technologies Used

* **Backend:** Node.js, TypeScript, Express, Octokit
* **Frontend:** HTML, CSS, JavaScript
* **Code Quality:** TypeScript strict mode
* **Deployment:** Optional Docker

---

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

---

### Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/firatmio/github-repo-analyzer.git
cd github-repo-analyzer/backend
```

2. Install dependencies:

```bash
npm install
```

3. Run in development mode:

```bash
npm run dev
```

4. Open frontend:

```text
http://localhost:8080
```

5. Build & run in production:

```bash
npm run build
npm start
```

---

## Example Usage

1. Open `http://localhost:8080` in your browser
2. Enter a GitHub repo URL (e.g., `https://github.com/firatmio/markdown-to-html-api-rust`)
3. See live statistics in a clean frontend

---

## Project Structure

```
github-repo-analyzer/
├── backend/
│   ├── src/
│   │   ├── index.ts           # Express server entry point
│   │   ├── githubService.ts   # GitHub API service
│   │   └── models.ts          # TypeScript models
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── index.html              # UI page
│   ├── style.css               # Styling
│   └── app.js                  # Frontend logic
├── README.md
└── LICENSE
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
