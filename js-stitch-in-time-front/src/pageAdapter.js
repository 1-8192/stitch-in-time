class PageAdapter {

  static getAll() {
    return fetch('http://localhost:3000/pages')
      .then(res => res.json());
  };

  static getPage(id) {
    return fetch(`http://localhost:3000/pages/${id}`)
      .then(res => res.json());
  };

};
