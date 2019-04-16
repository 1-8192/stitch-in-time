class Page {
  constructor({ id, image_url, top_text, bottom_text, next_page_id}) {
    this.id = id
    this.imageUrl= image_url
    this.topText = top_text
    this.bottomText = bottom_text
    this.nextPageId = next_page_id

    Page.all.push(this)
  }

};

Page.all = [];
