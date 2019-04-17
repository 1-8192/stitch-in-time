// sets user for session
let currentUser = "";

//functions to populate story text on page
function topDivText(text) {
  document.querySelector("#top-caption").innerHTML = `<p>${text}</p>`;
};

function bottomDivText(text) {
  document.querySelector("#bottom-caption").innerHTML = `<p>${text}</p>`;
};


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
    event.preventDefault();
    if (e.target.previousElementSibling.value != "") {
      // set username = value
      fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": `${e.target.previousElementSibling.value}`,
          "progress": 0
        })
      }).then((response) => {
        return response.json();
      }).then((user) => {
        currentUser = user;
        if (currentUser.progress === 0) {
          currentUser.progress = 32;
        }
        document.querySelector('.greeting').remove();

        PageAdapter.getPage(currentUser.progress)
          .then((pageInfo) => {
            let currentPage = new Page(pageInfo);
            document.querySelector('.center-fit').src = currentPage.imageUrl;
            document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
            setTimeout(function() {topDivText(currentPage.topText)}, 2000);
            setTimeout(function() {bottomDivText(currentPage.bottomText)}, 4000);
          })

        let nxtbtn = document.createElement('INPUT');
        nxtbtn.className = "next-button";
        nxtbtn.src = "./images/recycle-btn.png"
        nxtbtn.type = "image";
        document.querySelector('#main-container').appendChild(nxtbtn);

        nxtbtn.addEventListener('click', (event) => {
          if (currentUser.progress === 52) {
            topDivText("Thanks for reading!");
            bottomDivText("");
            nxtbtn.remove();
          } else {
            currentUser.progress += 1;
            topDivText("");
            bottomDivText("");
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                let currentPage = new Page(pageInfo);
                document.querySelector('.center-fit').src = currentPage.imageUrl;
                document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
                setTimeout(function() {topDivText(currentPage.topText)}, 2000);
                setTimeout(function() {bottomDivText(currentPage.bottomText)}, 4000);
              }) // PageAdapter
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                "progress": currentUser.progress
              })
            }) // end of fetch
            .catch((error) => {
              console.log(error)
            })
          }
        }) //nxtbtn event listener
      })
    }
  })


}) // end of DOMContentLoaded
