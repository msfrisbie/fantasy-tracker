const tweetContainer = document.querySelector('#tweetcontainer');

fetch('./tweets.json').then((response) => {
  const tweetPromise = response.json();

  tweetPromise.then((tweets) => {
    for (const tweet of tweets) {
      const tr = document.createElement('tr'),
            idTh = document.createElement('th'),
            textTd = document.createElement('td');

      idTh.setAttribute('scope', 'row');

      idTh.innerHTML = tweet.id_str;
      textTd.innerHTML = tweet.text;

      tr.appendChild(idTh);
      tr.appendChild(textTd);

      tweetContainer.appendChild(tr);
    }
  });
});
