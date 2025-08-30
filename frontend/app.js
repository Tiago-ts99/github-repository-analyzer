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
            const res = await fetch('http://localhost:8080/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoUrl })
            });
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } catch (err) {
            resultDiv.innerHTML = 'Error: ' + err;
        }
    }, 500);
});