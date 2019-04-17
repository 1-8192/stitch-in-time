// sets user for session
let currentUser = "";
let firstPage;
let lastPage;

// toggles overlay for questions and final message
function quizOn() {
  document.getElementById("overlay").style.display = "block";
}

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

//Main flow of app once DOM is loaded
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
        alert(`Welcome, ${currentUser.name}!`)
        document.querySelector('.greeting').remove();

        PageAdapter.getPage(currentUser.progress)
          .then((pageInfo) => {
            let currentPage = new Page(pageInfo);
            document.querySelector('.center-fit').src = currentPage.imageUrl;
            document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
            setTimeout(function() {topDivText(currentPage.topText)}, 1000);
            setTimeout(function() {bottomDivText(currentPage.bottomText)}, 3000);
          })

        let nxtbtn = document.createElement('INPUT');
        nxtbtn.className = "next-button";
        nxtbtn.src = "./images/recycle-btn.png"
        nxtbtn.type = "image";
        document.querySelector('#main-container').appendChild(nxtbtn);
        setTimeout(function() {
          nxtbtn.style.display = "block";
        }, 4000);

        nxtbtn.addEventListener('click', (event) => {
          ///End of line////
          if (currentUser.progress === lastPage) {
            topDivText("");
            bottomDivText("");
            nxtbtn.remove();
            document.querySelector('#overlay-p').textContent = "Thanks for reading! Keep conserving and repairing items to save our planet!";
            quizOn();
            document.querySelector('#overlay-button-1').style.display = "none";
            document.querySelector('#overlay-button-2').style.display = "none";
            currentUser.progress = 0;
            //update server
          } else if (currentUser.progress === firstPage + 1) {
            //////////////// QUIZ 1 TIME!!!!! /////////////////////
            currentUser.progress += 1;
            topDivText("");
            bottomDivText("");
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                quizOff();
                let currentPage = new Page(pageInfo);
                document.querySelector('.center-fit').src = currentPage.imageUrl;
                document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
                nxtbtn.style.display = "none"
                setTimeout(function() {topDivText(currentPage.topText)}, 1000);
                // this is where quiz comes in
                setTimeout(function() {quizOn()}, 2000);
                document.querySelector('#overlay-p').textContent = "Oh, no! Shyam's in quite the pickle. What should he do? Drop everything and leave with a rumpled shirt, or see if there's any way to repair the clothes iron?";
                let button1 = document.querySelector('#overlay-button-1')
                document.querySelector('#overlay-button-1').textContent = "Leave anyway, his mom can buy a new iron.";
                let button2 = document.querySelector('#overlay-button-2')
                document.querySelector('#overlay-button-2').textContent = "There must be a way to fix the problem, let's work on it together!";
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1) {
                    alert('Metal should not be tossed away if it can be avoided, let\'s see if there\'s a better solution!')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    setTimeout(function() {
                      nxtbtn.style.display = "block";
                    }, 2000);
                  } else if (event.target === button2) {
                    alert('Good instinct! I bet we can fix the iron if we ask the right person.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    setTimeout(function() {
                      nxtbtn.style.display = "block";
                    }, 2000);
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
                setTimeout(function() {topDivText(currentPage.topText)}, 1000);
                // this is where quiz comes in
                setTimeout(function() {quizOn()}, 2000);
                nxtbtn.style.display = "none"
                document.querySelector('#overlay-p').textContent = "Wow, another pickle! What should our boy Shyam do, try to fix the broken tire tube, or just buy a new one? ";
                let button1 = document.querySelector('#overlay-button-1')
                document.querySelector('#overlay-button-1').textContent = "Rubber pollutes, if we can fix the tire, it would be better";
                let button2 = document.querySelector('#overlay-button-2')
                document.querySelector('#overlay-button-2').textContent = "New tires are cheap, let's buy one and forget the old one!";
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1) {
                    alert('Oh yeah! I bet we can fix this issue, too.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    setTimeout(function() {
                      nxtbtn.style.display = "block";
                    }, 2000);
                  } else if (event.target === button2) {
                    alert('New tires might be cheap, but throwing old ones away costs a lot for the ecology.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    setTimeout(function() {
                      nxtbtn.style.display = "block";
                    }, 2000);
                  }
                })
              }) // PageAdapter
          }
          else {
            currentUser.progress += 1;
            topDivText("");
            bottomDivText("");
            nxtbtn.style.display = "none"
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                let currentPage = new Page(pageInfo);
                document.querySelector('.center-fit').src = currentPage.imageUrl;
                document.querySelector('.center-fit').dataset.id = `${currentPage.id}`
                setTimeout(function() {topDivText(currentPage.topText)}, 1000);
                setTimeout(function() {bottomDivText(currentPage.bottomText)}, 3000);
                setTimeout(function() {
                  nxtbtn.style.display = "block";
                }, 4000);
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
