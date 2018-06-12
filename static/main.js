/*
Example tweet:

{
  "source": "Twitter for iPhone", 
  "id_str": "1006648161538961408", 
  "text": "Here is the video, \u201cA Story of Opportunity\u201d that I shared with Kim Jong-un at the #SingaporeSummit\n\u27a1\ufe0fhttps://t.co/43oOci4jvo https://t.co/xBKFkDLtj7", 
  "created_at": "Tue Jun 12 21:23:18 +0000 2018", 
  "retweet_count": 7233, 
  "in_reply_to_user_id_str": null, 
  "favorite_count": 23517, 
  "is_retweet": false
}
*/

(() => {
  const JSON_PATH = './tweets.json';
  const TWEET_CONTAINER_SELECTOR = '#tweetcontainer';
  const PLAYER_SELECTION_CONTAINER_SELECTOR = '#selectioncontainer';
  const FIRST_TWEET_ID_AFTER_GAME_4 = 1005550889422110721;
  
  class Matcher {
    constructor(identifier, re) {
      this.identifier = identifier;
      this.re = re;
    }
    
    check(string) {
      
    }
    
    static isCountableTweet(tweet) {
      return !tweet.is_retweet && 
             parseInt(tweet.id_str) >= FIRST_TWEET_ID_AFTER_GAME_4;
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
          tiebreaker: 225,
          wordAssignment: 'President'
        },
        {
          memberName: 'Eric Burger',
          playerName: 'Klay Thompson',
          tiebreaker: 213,
          wordAssignment: 'Economy'
        },
        {
          memberName: 'Andrew Ryu',
          playerName: 'Jose Calderon',
          tiebreaker: 220,
          wordAssignment: 'Trump'
        },
        {
          memberName: 'Ray Wu',
          playerName: 'Javale McGee',
          tiebreaker: 209,
          wordAssignment: 'FBI'
        },
        {
          memberName: 'Ahir Bala',
          playerName: 'JR Smith',
          tiebreaker: 203,
          wordAssignment: 'Fake'
        },
        {
          memberName: 'Michael Asensio',
          playerName: 'Kevin Durant',
          tiebreaker: 211,
          wordAssignment: 'China'
        },
        {
          memberName: 'Peter Park',
          playerName: 'Kyle Korver',
          tiebreaker: 188,
          wordAssignment: 'Really'
        },
        {
          memberName: 'Anthony Bae',
          playerName: 'Steph Curry',
          tiebreaker: 192,
          wordAssignment: 'Country'
        },
        {
          memberName: 'Jason Wang',
          playerName: 'Kendrick Perkins',
          tiebreaker: 216,
          wordAssignment: 'And'
        },
        {
          memberName: 'Nikhil Bansal',
          playerName: 'Shaun Livingston',
          tiebreaker: 193,
          wordAssignment: 'Job'
        },
        {
          memberName: 'Jonathan Weber',
          playerName: 'Jeff Green',
          tiebreaker: 201,
          wordAssignment: 'MS-13'
        },
        {
          memberName: 'Matt Frisbie',
          playerName: 'Kevon Looney',
          tiebreaker: 207,
          wordAssignment: 'Obama'
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
                  wordTd = document.createElement('td'),
                  playerNameTd = document.createElement('td'),
                  tiebreakerTd = document.createElement('td');
        
        memberTh.setAttribute('scope', 'row');
        
        memberTh.innerHTML = memberSelection.memberName;
        wordTd.innerHTML = memberSelection.wordAssignment;
        playerNameTd.innerHTML = memberSelection.playerName;
        tiebreakerTd.innerHTML = memberSelection.tiebreaker;
        
        tr.appendChild(memberTh);
        tr.appendChild(wordTd);
        tr.appendChild(playerNameTd);
        tr.appendChild(tiebreakerTd);
        
        this.playerSelectionContainer.appendChild(tr);
      }
      
      // Initialize trump tweet list
      fetch(JSON_PATH).then((response) => {
        console.log('Fetched tweets!');
        response.json().then((tweets) => {
          console.log('Got JSON of tweets!', tweets.length);
          for (const tweet of tweets) {
            if (tweet.id_str === FIRST_TWEET_ID_AFTER_GAME_4.toString()) {
              console.log(tweet);
            }
            
            if (!Matcher.isCountableTweet(tweet)) {
              continue;
            }
            
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
