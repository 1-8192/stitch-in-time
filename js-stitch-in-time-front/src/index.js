document.addEventListener('DOMContentLoaded', (event) => {
  const containerTag = document.querySelector('#main-container')
  const divTag = document.createElement("DIV");
  let imgTag = document.querySelector('.center-fit')
  containerTag.appendChild(divTag)
  divTag.className = 'greeting'
  divTag.innerHTML = `<p>Welcome</p>
  <input type="text">Hi! What's your name?</input>
  <input id="start-btn" type="button" value="Let's Read!"></input>`
  
  document.querySelector('#start-btn').addEventListener('click', (e) => {
    if (e.target.previousElementSibling.value != "") {
      // set username = value
      imgTag.src = "./images/a-stitch-in-time_2.png"
      fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepted: "application/json"
        },
        body: JSON.stringify({
          "name": `${e.target.previousElementSibling.value}`,
          "progress": 0
        })
      }) // end of fetch
    }
  })


}) // end of DOMContentLoaded












