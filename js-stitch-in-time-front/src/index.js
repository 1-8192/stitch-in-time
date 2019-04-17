// sets user for session
let currentUser = "";
let firstPage;
let lastPage;

// toggles overlay on
function quizOn() {
  document.getElementById("overlay").style.display = "block";
}

// toggles overlay off
function quizOff() {
  document.getElementById("overlay").style.display = "none";
}
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

  PageAdapter.getAll()
    .then(allPages => {
      let indexOfLastPage = allPages.length - 1;
      firstPage = allPages[0].id
      lastPage = allPages[indexOfLastPage].id
    })

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
          currentUser.progress = firstPage;
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
          if (currentUser.progress === lastPage) {
            topDivText("Thanks for reading!");
            bottomDivText("");
            nxtbtn.remove();
          } else if (currentUser.progress === firstPage + 1) {
            //////////////// QUIZ 1 TIME!!!!! /////////////////////
            currentUser.progress += 1;
            topDivText("");
            bottomDivText("");
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                let currentPage = new Page(pageInfo);
                document.querySelector('.center-fit').src = currentPage.imageUrl;
                document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
                setTimeout(function() {topDivText(currentPage.topText)}, 2000);
                // this is where quiz comes in
                quizOn();
                nxtbtn.style.display = "none"
                document.querySelector('#overlay-p').textContent = "quiz1 question";
                let button1 = document.querySelector('#overlay-button-1')
                document.querySelector('#overlay-button-1').textContent = "test answer 1";
                let button2 = document.querySelector('#overlay-button-2')
                document.querySelector('#overlay-button-2').textContent = "test answer 2";
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1) {
                    alert('wrong')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 4000);
                    nxtbtn.style.display = "block"
                  } else if (event.target === button2) {
                    alert('right')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 4000);
                    nxtbtn.style.display = "block"
                  }
                })
              }) // PageAdapter
          } else if (currentUser.progress === firstPage + 11) {
            //////////////// QUIZ 2 TIME!!!!! /////////////////////
            currentUser.progress += 1;
            topDivText("");
            bottomDivText("");
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                let currentPage = new Page(pageInfo);
                document.querySelector('.center-fit').src = currentPage.imageUrl;
                document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
                setTimeout(function() {topDivText(currentPage.topText)}, 2000);
                // this is where quiz comes in
                quizOn();
                nxtbtn.style.display = "none"
                document.querySelector('#overlay-p').textContent = "quiz2 question";
                let button1 = document.querySelector('#overlay-button-1')
                document.querySelector('#overlay-button-1').textContent = "test answer 1";
                let button2 = document.querySelector('#overlay-button-2')
                document.querySelector('#overlay-button-2').textContent = "test answer 2";
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1) {
                    alert('wrong')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 4000);
                    nxtbtn.style.display = "block"
                  } else if (event.target === button2) {
                    alert('right')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 4000);
                    nxtbtn.style.display = "block"
                  }
                })
              }) // PageAdapter
          }
          else {
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
