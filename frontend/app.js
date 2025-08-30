const repoInput = document.getElementById('repoUrl');
const resultDiv = document.getElementById('result');

let timeoutId;
repoInput.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        const repoUrl = repoInput.value.trim();
        if (!repoUrl) {
            resultDiv.innerHTML = 'Results will appear here...';
            return;
        }

        try {
            const res = await fetch('/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoUrl })
            });

            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            resultDiv.innerHTML = formatRepoData(data);
        } catch (err) {
            resultDiv.innerHTML = `<p style="color:red;">Error: ${err}</p>`;
        }
    }, 500);
});

function formatRepoData(data) {
    var allBytes = 0;
    const calculateBytes = Object.entries(data.languages).map(([lang, bytes]) => {
        allBytes = allBytes + bytes
    })
    const languages = Object.entries(data.languages)
        .map(([lang, bytes]) => `<li>${lang}: ${((bytes / allBytes) * 100).toFixed(2) }%</li>`)
        .join('');

    return `
    <h2>${data.name}</h2>
    <p>${data.description || ''}</p>
    <div class="stats">
      <span>⭐ Stars: ${data.stars}</span>
      <span>🍴 Forks: ${data.forks}</span>
      <span>👀 Watchers: ${data.watchers}</span>
      <span>📄 Commits: ${data.totalCommits}</span>
      <span>🔀 PRs: ${data.totalPRs}</span>
      <span>❗ Issues: ${data.totalIssues}</span>
    </div>
    <h3>Languages</h3>
    <ul>${languages}</ul>
  `;
}
