document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from reloading page

    // Collect quiz answers
    const answers = {
        skinColor: document.querySelector('input[name="skin-color"]:checked')?.value || null,
        skinType: document.querySelector('input[name="skin-type"]:checked')?.value || null,
        skinIssues: Array.from(document.querySelectorAll('input[name="skin-issue"]:checked')).map(el => el.value),
        undertone: document.querySelector('input[name="undertone"]:checked')?.value || null,
        coverage: Array.from(document.querySelectorAll('input[name="coverage"]:checked')).map(el => el.value),
        finish: document.querySelector('input[name="finish"]:checked')?.value || null
    };

    console.log("Submitting quiz answers:", answers);
    // Send answers to the backend
    const response = await fetch('https://cosmiratest.onrender.com/api/match-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
    });

    const data = await response.json();

    // Redirect user to results.html and pass product data in URL
    window.location.href = `/results.html?products=${encodeURIComponent(JSON.stringify(data.products))}`;
});
