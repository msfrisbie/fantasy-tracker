(() => {
  const JSON_PATH = './tweets.json';

  class TrackerApp {
    constructor() {
      this.tweetContainer = document.querySelector('#tweetcontainer');

      this.init();
    }

    init() {
      fetch(JSON_PATH).then((response) => {
        response.json().then((tweets) => {
          for (const tweet of tweets) {
            const tr = document.createElement('tr'),
                  idTh = document.createElement('th'),
                  textTd = document.createElement('td');

            idTh.setAttribute('scope', 'row');

            idTh.innerHTML = tweet.id_str;
            textTd.innerHTML = tweet.text;

            tr.appendChild(idTh);
            tr.appendChild(textTd);

            this.tweetContainer.appendChild(tr);
          }
        });
      });
    }
  }

  new TrackerApp();
})();
