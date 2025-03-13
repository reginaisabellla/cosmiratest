const form = document.getElementById('quiz-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  
    let skinColor = document.forms["quiz-form"]["skin-colortest"].value;
    if (skinColor == "") {
        let errorSpan = document.getElementById("skin-color-error");
        errorSpan.textContent = "Please choose a skin color.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
        return false;
    }
    let skinType = document.forms["quiz-form"]["skin-type"].value;
    if (skinType== "") {
        let errorSpan = document.getElementById("skin-type-error");
        errorSpan.textContent = "Please choose a skin type.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
        return false;
    }
    let skinIssue = document.forms["quiz-form"]["skin-issue"].value;
    if (skinIssue== "") {
        let errorSpan = document.getElementById("skin-issue-error");
        errorSpan.textContent = "Please choose a skin issue.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
  
      return false;
    }
    let undertone = document.forms["quiz-form"]["undertone"].value;
    if (undertone== "") {
        let errorSpan = document.getElementById("undertone-error");
        errorSpan.textContent = "Please choose an undertone.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
  
      return false;
    }
    let coverage = document.forms["quiz-form"]["coverage"].value
    if (coverage== "") {
        let errorSpan = document.getElementById("coverage-error");
        errorSpan.textContent = "Please choose a coverage.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
      return false;
    }
    let finish = document.forms["quiz-form"]["finish"].value;  
    if (finish== "") {
        let errorSpan = document.getElementById("finish-error");
        errorSpan.textContent = "Please choose a finish.";
        errorSpan.style.display = "block";
        errorSpan.style.textAlign = "center";
        errorSpan.style.color = "red";
      return false;
    }
    


    




/*fetch('/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });.*/


});



