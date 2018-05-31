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
        },
        {
          memberName: 'Eric Burger',
          playerName: 'Klay Thompson',
          tiebreaker: 213
        },
        {
          memberName: 'Andrew Ryu',
          playerName: 'Jose Calderon',
          tiebreaker: 220
        },
        {
          memberName: 'Ray Wu',
          playerName: 'Javale McGee',
          tiebreaker: 209
        },
        {
          memberName: 'Ahir Bala',
          playerName: 'JR Smith',
          tiebreaker: 203
        },
        {
          memberName: 'Michael Asensio',
          playerName: 'Kevin Durant',
          tiebreaker: 211
        },
        {
          memberName: 'Peter Park',
          playerName: 'Kyle Korver',
          tiebreaker: 188
        },
        {
          memberName: 'Anthony Bae',
          playerName: 'Steph Curry',
          tiebreaker: 192
        },
        {
          memberName: 'Jason Wang',
          playerName: 'Kendrick Perkins',
          tiebreaker: 216
        },
        {
          memberName: 'Nikhil Bansal',
          playerName: 'Shaun Livingston',
          tiebreaker: 193
        },
        {
          memberName: 'Jonathan Weber',
          playerName: 'Jeff Green',
          tiebreaker: 201
        },
        {
          memberName: 'Matt Frisbie',
          playerName: 'Kevon Looney',
          tiebreaker: 207
        }
      ];
      
      this.init();
    }

    init() {
      // Initialize navbar link buttons
      for (const navbarLink of this.navbarLinks) {
        navbarLink.addEventListener('click', (e) => {
          for (const navbarLink of this.navbarLinks) {
            navbarLink.parentElement.className = 'nav-item';
          }
          e.target.parentElement.className = 'nav-item active';
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
        tiebreakerTd.innerHTML = memberSelection.tiebreaker;
        
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
