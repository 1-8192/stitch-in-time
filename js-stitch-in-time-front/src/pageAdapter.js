class PageAdapter {

  static getAll() {
    return fetch('http://localhost:3000/pages')
      .then(res => res.json())
  }

};
