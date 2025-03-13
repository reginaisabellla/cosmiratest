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
    
    


    
    window.location.href = "../results/result.html";



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



