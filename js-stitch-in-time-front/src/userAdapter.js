class UserAdapter {

//Posts user name to server and creates new instance if doesn't already exist (confirmed in back end) //
  static postUser(name) {
    return fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${name}`,
        "progress": 0
      })
    });
  };

//updates the user's progress through the story //
  static updateProgress(user) {
    return fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "progress": user.progress
        })
      })
  };

}
