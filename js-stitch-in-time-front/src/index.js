let currentUser = "";

function topDivText(text) {
  document.querySelector("#top-caption").innerHTML = `<p>${text}</p>`;
};

document.addEventListener('DOMContentLoaded', (event) => {

  PageAdapter.getAll()
    .then((pages) => {
      pages.forEach((pageInfo) => {
        debugger
        const newPage = new Page(pageInfo);
      })

    });


  // const containerTag = document.querySelector('#main-container')
  // const divTag = document.createElement("DIV");
  // let imgTag = document.querySelector('.center-fit')
  // containerTag.appendChild(divTag)
  // divTag.className = 'greeting'
  // divTag.innerHTML = `<p>Welcome</p>
  // <input type="text">Hi! What's your name?</input>
  // <input id="start-btn" type="button" value="Let's Read!"></input>`
  //
  // document.querySelector('#start-btn').addEventListener('click', (e) => {
  //   event.preventDefault();
  //   if (e.target.previousElementSibling.value != "") {
  //     // set username = value
  //     imgTag.src = "./images/a-stitch-in-time_2.png"
  //     fetch('http://localhost:3000/users', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         "name": `${e.target.previousElementSibling.value}`,
  //         "progress": 0
  //       })
  //     }).then((response) => {
  //       return response.json();
  //     }).then((user) => {
  //       currentUser = user;
  //       document.querySelector('.greeting').remove();
  //       window.setTimeout(topDivText("Khrrrrrr....."), 1000 );
  //       // let topCaption = document.querySelector("#top-caption");
  //       let bottomCaption = document.querySelector("#bottom-caption");
  //
  //       // topCaption.innerHTML = `<p>Khrrrrrr...</p>`;
  //       bottomCaption.innerHTML = `<p>"Oh no," wails Shyam. The seams of his favorite shirt have come apart</p>`;
  //       let nxtbtn = document.createElement('INPUT');
  //       nxtbtn.className = "next-button";
  //       nxtbtn.src = "./images/recycle-btn.png"
  //       nxtbtn.type = "image";
  //       document.querySelector('#main-container').appendChild(nxtbtn);
  //     })
  //   }
  // })


}) // end of DOMContentLoaded
