// declares variable for current user and the bookend pages //
let currentUser = "";
let firstPage;
let lastPage;

// toggles overlay for questions and final message //
function quizOn() {
  document.getElementById("overlay").style.display = "block";
}

function quizOff() {
  document.getElementById("overlay").style.display = "none";
}

//functions to populate story text on page //
function topDivText(text) {
  document.querySelector("#top-caption").innerHTML = `<p>${text}</p>`;
};

function bottomDivText(text) {
  document.querySelector("#bottom-caption").innerHTML = `<p>${text}</p>`;
};

//function to populate quiz divs //
function makeQuiz(question, answer1, answer2) {
  document.querySelector("#overlay-p").textContent = question;
  document.querySelector("#overlay-button-1").textContent = answer1;
  document.querySelector("#overlay-button-2").textContent = answer2;
}

//functions to build timers on diplays //
function displayTopText(topText, time = 1000) {
  fadeInImage();
  setTimeout(function() {
    topDivText(topText);
  }, time);
}

function displayBottomText(bottomText, time = 2000) {
  setTimeout(function() {
    bottomDivText(bottomText);
  }, time);
}

//toggles diplay button on and off //
function displayNextButton(time = 3000) {
  let nxtbtn = document.querySelector(".next-button");
  setTimeout(function() {
    nxtbtn.style.display = "block";
  }, time);
}

// functions for fading in and out images
function resetFadeInImage() {
  document.querySelector(".center-fit").classList.remove("fade-me-in")
}

function fadeInImage() {
  document.querySelector(".center-fit").classList.add("fade-me-in")
}

//Main flow of app once DOM is loaded //
document.addEventListener('DOMContentLoaded', (event) => {
  const containerTag = document.querySelector('#main-container')
  const divTag = document.createElement("DIV");
  let imgTag = document.querySelector('.center-fit')
  let button1 = document.querySelector("#overlay-button-1");
  let button2 = document.querySelector("#overlay-button-2");
  containerTag.appendChild(divTag)
  divTag.className = 'greeting'
  divTag.innerHTML = `<p>Welcome</p>
  <input type="text">Hi! What's your name?</input>
  <input id="start-btn" type="button" value="Let's Read!"></input>`

  //Find the first and last id's of the Pages //
  PageAdapter.getAll()
    .then(allPages => {
      let indexOfLastPage = allPages.length - 1;
      firstPage = allPages[0].id
      lastPage = allPages[indexOfLastPage].id
    })

 //click event to sign user in and start telling story //
  document.querySelector('#start-btn').addEventListener('click', (e) => {
    event.preventDefault();
    resetFadeInImage();
    if (e.target.previousElementSibling.value != "") {
      UserAdapter.postUser(e.target.previousElementSibling.value)
        .then((response) => {
        return response.json();
      }).then((user) => {
        currentUser = user;
        if (currentUser.progress === 0) {
          currentUser.progress = firstPage;
        }
        alert(`Welcome, ${currentUser.name}!`)
        document.querySelector('.greeting').remove();

        //Loads first page of story //
        PageAdapter.getPage(currentUser.progress)
          .then((pageInfo) => {
            let currentPage = new Page(pageInfo);
            document.querySelector(".center-fit").src = currentPage.imageUrl;
            displayTopText(currentPage.topText);
            displayBottomText(currentPage.bottomText, 2000);
          })

        let nxtbtn = document.createElement('INPUT');
        nxtbtn.className = "next-button";
        nxtbtn.src = "./images/recycle-btn.png"
        nxtbtn.type = "image";
        document.querySelector('#main-container').appendChild(nxtbtn);
        displayNextButton();

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
            UserAdapter.updateProgress(currentUser);
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
                let question = "Oh, no! Shyam's in quite the pickle. What should he do? Drop everything and leave with a rumpled shirt, or see if there's any way to repair the clothes iron?";
                let answer1 = "Leave anyway, his mom can buy a new iron.";
                let answer2 = "There must be a way to fix the problem, let's work on it together!";
                makeQuiz(question, answer1, answer2);
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1) {
                    alert('Metal should not be tossed away if it can be avoided, let\'s see if there\'s a better solution!')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNextButton();
                  } else if (event.target === button2) {
                    alert('Good instinct! I bet we can fix the iron if we ask the right person.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNextButton();
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
                let question = "Wow, another pickle! What should our boy Shyam do, try to fix the broken tire tube, or just buy a new one? ";
                let answer1 = "Rubber pollutes, if we can fix the tire, it would be better";
                let answer2 = "New tires are cheap, let's buy one and forget the old one!";
                makeQuiz(question, answer1, answer2);w
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1) {
                    alert('Oh yeah! I bet we can fix this issue, too.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNextButton();
                  } else if (event.target === button2) {
                    alert('New tires might be cheap, but throwing old ones away costs a lot for the ecology.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNextButton();
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
                document.querySelector(".center-fit").src = currentPage.imageUrl;
                displayTopText(currentPage.topText);
                displayBottomText(currentPage.bottomText, 2000);
                displayNextButton();
              }) // PageAdapter
            UserAdapter.updateProgress(currentUser)
            .catch((error) => {
              console.log(error)
            })
          }
        }) //nxtbtn event listener
      })
    }
  })


}) // end of DOMContentLoaded
