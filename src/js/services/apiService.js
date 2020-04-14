import refs from '../refs';

const baseUrl = 'https://pixabay.com/api/';
const apiKey = '16022511-43fa01566a8e8c2e5e497e2d2';

export default {
  page: 1,
  query: '',
  fetchImage() {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;

    return fetch(baseUrl + requestParams)
      .then(response => response.json())
      .then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
    refs.loadMoreBtn.style.visibility = 'visible';
  },
  resetPage() {
    this.page = 1;
  },
};
