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
  const WORD_COUNT_CONTAINER_SELECTOR = '#countcontainer';
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
      this.wordCountContainer = document.querySelector(WORD_COUNT_CONTAINER_SELECTOR);

      this.navbarLinks = document.querySelectorAll('[data-link]');
      this.views = document.querySelectorAll('[data-view]');
      
      this.memberSelections = [
        {
          memberName: 'Patrick Hamann',
          playerName: 'Zaza Pachulia',
          tiebreaker: 225,
          wordAssignment: 'President',
          regex: /(\W|^)president(\W|$|s)/mig
        },
        {
          memberName: 'Eric Burger',
          playerName: 'Klay Thompson',
          tiebreaker: 213,
          wordAssignment: 'Economy',
          regex: /(\W|^)economy(\W|$|s)/mig
        },
        {
          memberName: 'Andrew Ryu',
          playerName: 'Jose Calderon',
          tiebreaker: 220,
          wordAssignment: 'Trump',
          regex: /(\W|^)trump(\W|$|s)/mig
        },
        {
          memberName: 'Ray Wu',
          playerName: 'Javale McGee',
          tiebreaker: 209,
          wordAssignment: 'FBI',
          regex: /(\W|^)fbi(\W|$|s)/mig
        },
        {
          memberName: 'Ahir Bala',
          playerName: 'JR Smith',
          tiebreaker: 203,
          wordAssignment: 'Fake',
          regex: /(\W|^)fake(\W|$|s)/mig
        },
        {
          memberName: 'Michael Asensio',
          playerName: 'Kevin Durant',
          tiebreaker: 211,
          wordAssignment: 'China',
          regex: /(\W|^)china(\W|$|s)/mig
        },
        {
          memberName: 'Peter Park',
          playerName: 'Kyle Korver',
          tiebreaker: 188,
          wordAssignment: 'Really',
          regex: /(\W|^)really(\W|$|s)/mig
        },
        {
          memberName: 'Anthony Bae',
          playerName: 'Steph Curry',
          tiebreaker: 192,
          wordAssignment: 'Country',
          regex: /(\W|^)country(\W|$|s)/mig
        },
        {
          memberName: 'Jason Wang',
          playerName: 'Kendrick Perkins',
          tiebreaker: 216,
          wordAssignment: 'And',
          regex: /(\W|^)and(\W|$|s)/mig
        },
        {
          memberName: 'Nikhil Bansal',
          playerName: 'Shaun Livingston',
          tiebreaker: 193,
          wordAssignment: 'Job',
          regex: /(\W|^)job(\W|$|s)/mig
        },
        {
          memberName: 'Jonathan Weber',
          playerName: 'Jeff Green',
          tiebreaker: 201,
          wordAssignment: 'MS-13',
          regex: /(\W|^)ms-13(\W|$|s)/mig
        },
        {
          memberName: 'Matt Frisbie',
          playerName: 'Kevon Looney',
          tiebreaker: 207,
          wordAssignment: 'Obama',
          regex: /(\W|^)obama(\W|$|s)/mig
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
        memberSelection.count = 0;
        memberSelection.matchingTweetIds = [];
        
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
            if (!Matcher.isCountableTweet(tweet)) {
              continue;
            }
            
            for (const memberSelection of this.memberSelections) {
              const matches = (tweet.text.match(memberSelection.regex) || []).length;
              if (matches > 0) {
                memberSelection.count += matches;
                memberSelection.matchingTweetIds.push(tweet.id_str);
              }
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
          
          // Counts are ready for rendering
          console.log(this.memberSelections);
          
          for (const memberSelection of this.memberSelections.sort((a, b) => a.count > b.count ? 1 : -1 )) {

            const tr = document.createElement('tr'),
                  memberTh = document.createElement('th'),
                  wordTd = document.createElement('td'),
                  countTd = document.createElement('td'),
                  tweetsTd = document.createElement('td');

            memberTh.setAttribute('scope', 'row');

            memberTh.innerHTML = memberSelection.memberName;
            wordTd.innerHTML = memberSelection.wordAssignment;
            countTd.innerHTML = memberSelection.count;
            tweetsTd.innerHTML = '';
            for (const matchingTweetId of memberSelection.matchingTweetIds) {
              tweetsTd.innerHTML += `<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/realDonaldTrump/status/${matchingTweetId}"></a></blockquote>`;
            }
              
            tr.appendChild(memberTh);
            tr.appendChild(wordTd);
            tr.appendChild(countTd);
            tr.appendChild(tweetsTd);

            this.wordCountContainer.appendChild(tr);
          }
          
          this.navbarLinks[0].click();
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
