console.log("quiz.js is loaded!");

document.getElementById("quiz-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading

    // Collect quiz answers
    const answers = {
        skinColor: document.querySelector('input[name="skin-color"]:checked')?.value || null,
        skinType: document.querySelector('input[name="skin-type"]:checked')?.value || null
    };

    console.log("Submitting quiz answers:", answers);

    try {
        const response = await fetch("https://cosmiratest.onrender.com/api/match-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(answers)
        });

        if (!response.ok) throw new Error("Failed to fetch match results.");

        const data = await response.json();
        console.log("Received match results:", data);

        // Redirect user to results.html with product data
        window.location.href = `../results/results.html?products=${encodeURIComponent(JSON.stringify(data.products))}`;
    } catch (error) {
        console.error("Error fetching match results:", error);
        alert("There was an error fetching match results. Please try again.");
    }
});
