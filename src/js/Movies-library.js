export default class MoviesLibrary {
  constructor(container, createMarkup) {
    this.container = container;
    this.storageName = '';
    this.page = 1;
    this.pages = 1;
    this.createMarkup = createMarkup;
  }

  render() {
    const moviesData = JSON.parse(localStorage.getItem(this.storageName));
    if (!moviesData) return;
    this.pages = Math.ceil(moviesData.length / 20);
    const currentPageMoviesData = moviesData.reduce((acc, movie, index) => {
      if (index < this.page * 20 && index >= (this.page - 1) * 20) {
        return [...acc, movie];
      } else {
        return acc;
      }
    }, []);
    const markup = this.createMarkup(currentPageMoviesData);
    this.container.innerHTML = markup;
  }
}
