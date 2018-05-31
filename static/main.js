(() => {
  const JSON_PATH = './tweets.json';
  const TWEET_CONTAINER_SELECTOR = '#tweetcontainer';
  const PLAYER_SELECTION_CONTAINER_SELECTOR = '#selectioncontainer';
  
  class Matcher {
    constructor(identifier, re) {
      this.identifier = identifier;
      this.re = re;
    }
    
    check(string) {
      
    }
  }
  
  class TrackerApp {
    constructor() {
      this.tweetContainer = document.querySelector(TWEET_CONTAINER_SELECTOR);
      this.playerSelectionContainer = document.querySelector(PLAYER_SELECTION_CONTAINER_SELECTOR);

      this.navbarLinks = document.querySelectorAll('[data-link]');
      this.views = document.querySelectorAll('[data-view]');
      
      this.memberSelections = [
        {
          memberName: 'Patrick Hamann',
          playerName: 'Zaza Pachulia',
          tiebreaker: 225
        }
      ];
      
      this.init();
    }

    init() {
      // Initialize navbar link buttons
      for (const navbarLink of this.navbarLinks) {
        navbarLink.addEventListener('click', (e) => {
          this.showView(e.target.getAttribute('data-link'));
        });
      }
      
      // Initialize player selections
      for (const memberSelection of this.memberSelections) {
            const tr = document.createElement('tr'),
                  memberTh = document.createElement('th'),
                  playerNameTd = document.createElement('td'),
                  tiebreakerTd = document.createElement('td');
        
        memberTh.setAttribute('scope', 'row');
        
        memberTh.innerHTML = memberSelection.memberName;
        playerNameTd.innerHTML = memberSelection.playerName;
        tiebreakerTd = memberSelection.tiebreaker;
        
        tr.appendChild(memberTh);
        tr.appendChild(playerNameTd);
        tr.appendChild(tiebreakerTd);
        
        this.playerSelectionContainer.appendChild(tr);
      }
      
      // Initialize trump tweet list
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
      
    showView(viewId) {
      for (const view of this.views) {
        view.style.display = view.getAttribute('data-view') === viewId ? 'block' : 'none';
      }
    }
  }

  new TrackerApp();
})();
