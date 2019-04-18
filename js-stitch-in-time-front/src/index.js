// declares variable for current user and the bookend pages //
let currentUser = "";
let firstPage;
let lastPage;

//Sets up the divTag for the welcome page//
function populateDivTag(divTag) {
  divTag.className = 'greeting'
  divTag.innerHTML = `<p>Welcome</p>
  <input type="text">Hi! What's your name?</input>
  <a class="waves-effect grey darken-2 btn" id="start-btn">Let's read!</a>`
};


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
  document.querySelector("#overlay-button-1").style.display = "block";
  document.querySelector("#overlay-button-2").style.display = "block";
}

//functions to build timers on diplays //
function displayTopText(topText, time = 1000) {
  fadeInImage();
  setTimeout(function() {
    topDivText(topText);
  }, time);
}

function displayBottomText(bottomText, time = 5000) {
  setTimeout(function() {
    bottomDivText(bottomText);
  }, time);
}


//toggles diplay button on and off //
function displayNavButton(time = 6000) {
  let navBtn = document.querySelector("#nav-button");
  setTimeout(function() {
    navBtn.style.display = "block";
  }, time);
}


// functions for fading in and out images
function resetFadeInImage() {
  document.querySelector(".center-fit").classList.remove("fade-me-in")
}

function fadeInImage() {
  document.querySelector(".center-fit").classList.add("fade-me-in")
}

//function to populate the main nav button//
function populateNavBtn(navbtn) {
  navbtn.innerHTML = `<a class="btn-floating btn-large brown lighten-4 pulse">
                      <i class="small material-icons">adjust</i>
                      </a>
                      <ul class="arrows">
                      <li><a class="btn-floating light-green lighten-3" id="next"><i class="material-icons">arrow_forward</i></a></li>

                      <li><a class="btn-floating red lighten-3" id="back"><i class="material-icons">arrow_back</i></a></li>
                      </ul>`
};

//click sound//
function playSound() {
          var sound = document.querySelector("#click-sound");
          sound.play();
      }

//////////////// ***********Main flow of app once DOM is loaded***********////////////
document.addEventListener('DOMContentLoaded', (event) => {
  quizOff();
  const containerTag = document.querySelector('#main-container')
  const divTag = document.createElement("DIV");
  let imgTag = document.querySelector('.center-fit')
  let button1 = document.querySelector("#overlay-button-1");
  let button2 = document.querySelector("#overlay-button-2");
  containerTag.appendChild(divTag)
  populateDivTag(divTag);

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
        document.querySelector('.greeting').remove();
        document.querySelector("#overlay-p").textContent = `welcome, ${currentUser.name}!`;
        quizOn();
        button1.style.display = "none";
        button2.style.display = "none";

        //Loads first page of story //
        setTimeout(function() {PageAdapter.getPage(currentUser.progress)
          .then((pageInfo) => {
            quizOff();
            let currentPage = new Page(pageInfo);
            document.querySelector(".center-fit").src = currentPage.imageUrl;
            displayTopText(currentPage.topText);
            displayBottomText(currentPage.bottomText);
          })}, 3000);

        let navBtn = document.querySelector('#nav-button');
        populateNavBtn(navBtn);
        let instances = M.FloatingActionButton.init(navBtn, {});
        let nxtBtn = document.querySelector("#next");
        let backBtn = document.querySelector("#back");
        displayNavButton();

        nxtBtn.addEventListener('click', (event) => {
          playSound();
          resetFadeInImage();
          ///End of line////
          if (currentUser.progress === lastPage) {
            topDivText("");
            bottomDivText("");
            navBtn.innerHML = "";
            ocument.querySelector("#overlay-p").textContent = `Thanks for reading! Keep recylcing!`;
            quizOn();
            button1.style.display = "none";
            button2.style.display = "none";
            currentUser.progress = firstPage;
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
                navBtn.style.display = "none"
                displayTopText(currentPage.topText);

                // this is where quiz comes in
                setTimeout(function() {quizOn()}, 2000);
                let question = "Oh, no! Shyam's in quite the pickle. What should he do? Drop everything and leave with a rumpled shirt, or see if there's any way to repair the clothes iron?";
                let answer1 = "Leave anyway, his mom can buy a new iron.";
                let answer2 = "There must be a way to fix the problem, let's work on it together!";
                makeQuiz(question, answer1, answer2);
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1 && (currentUser.progress-1) === firstPage + 1) {
                    alert('Metal should not be tossed away if it can be avoided, let\'s see if there\'s a better solution!')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 100);
                    displayNavButton();
                  } else if (event.target === button2 && (currentUser.progress-1) === firstPage + 1) {
                    alert('Good instinct! I bet we can fix the iron if we ask the right person.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNavButton();
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
                navBtn.style.display = "none"
                let question = "Wow, another pickle! What should our boy Shyam do, try to fix the broken tire tube, or just buy a new one? ";
                let answer1 = "Rubber pollutes, if we can fix the tire, it would be better";
                let answer2 = "New tires are cheap, let's buy one and forget the old one!";
                makeQuiz(question, answer1, answer2);
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1 && (currentUser.progress-1) === firstPage + 11) {
                    alert('Oh yeah! I bet we can fix this issue, too.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNavButton();
                  } else if (event.target === button2 && (currentUser.progress-1) === firstPage + 11) {
                    alert('New tires might be cheap, but throwing old ones away costs a lot for the ecology.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNavButton();
                  }
                })
              })
          } else if (currentUser.progress === firstPage + 18) {
            ////QUIZ 3 TIME /////
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
                navBtn.style.display = "none"
                let question = "Why do you think it's so important to recycle?";
                let answer1 = "Recycling encourages more efficient use of resources and harms the planet less.";
                let answer2 = "It's not.";
                makeQuiz(question, answer1, answer2);
                document.querySelector("#overlay").addEventListener('click', (event) => {
                  if (event.target === button1 && (currentUser.progress-1) === firstPage + 18) {
                    alert("Right on! Let\'s keep recycling!")
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNavButton();
                  } else if (event.target === button2 && (currentUser.progress-1) === firstPage + 18) {
                    alert('It may not seem important, but our actions have big effects on the planet.')
                    quizOff();
                    setTimeout(function() {bottomDivText(currentPage.bottomText)}, 1000);
                    displayNavButton();
                  }
                })
              })
          }
          else {
            currentUser.progress += 1;
            topDivText("");
            bottomDivText("");
            navBtn.style.display = "none"
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                let currentPage = new Page(pageInfo);
                document.querySelector(".center-fit").src = currentPage.imageUrl;
                displayTopText(currentPage.topText);
                displayBottomText(currentPage.bottomText);
                displayNavButton();
              }) // PageAdapter
            UserAdapter.updateProgress(currentUser)
            .catch((error) => {
              console.log(error)
            })
          }
        }) //nxtBtn event listener

        /// Back Button functionality ///////
        backBtn.addEventListener('click', (event) => {
          playSound();
          resetFadeInImage();
          ///Beginning of line////
          if (currentUser.progress === firstPage) {
            backBtn.style.display = "none";
            currentUser.progress = firstPage;
            UserAdapter.updateProgress(currentUser);
          } else {
            currentUser.progress -= 1;
            topDivText("");
            bottomDivText("");
            navBtn.style.display = "none"
            PageAdapter.getPage(currentUser.progress)
              .then((pageInfo) => {
                let currentPage = new Page(pageInfo);
                document.querySelector(".center-fit").src = currentPage.imageUrl;
                displayTopText(currentPage.topText);
                displayBottomText(currentPage.bottomText);
                displayNavButton();
              }) // PageAdapter
            UserAdapter.updateProgress(currentUser)
            .catch((error) => {
              console.log(error)
            })
          }
        });

      })
    }
  })


}) // end of DOMContentLoaded
