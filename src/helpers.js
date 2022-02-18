// Returns the tweets and hashtags for a searched keyword
export const searchTweets = (keyword) => {
  return fetch(
    '/api/searchTweets',
    {
      method: 'POST',
      body: JSON.stringify({
        keyword: keyword
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }
  )
  .then(res => res.json())
  .then(response => {
    return {
      hashtags: response.hashtags,
      tweets: response.tweets
    }
  })
  .catch(error => alert(error));
};
// Sets the active tweets
export const getActiveTweets = (tweets) => {
  let activeTweets = [];
  for (const tweet of tweets) {
    if (tweet.active) {
      activeTweets.push(tweet);
    }
  }
  return activeTweets;
};
// Sets the hashtag filters only available from the active tweets
export const getHashtags = (activeTweets, tweetCount) => {
  let hashtags = [];
  for (const [index, tweet] of activeTweets.entries()) {
    if (index < tweetCount) {
      for (const hashtag of tweet.hashtags) {
        hashtags.push(hashtag);
      }
    }
  }
  // Removes any duplicate hashtags
  hashtags = hashtags.filter( ( item, index, array ) => {
    return array.indexOf(item) === index;
  });
  return hashtags;
};
// Filters out tweets that do not include the selected hashtag
export const filterTweets = (tweets, hashtag) => {
  let filteredTweets = JSON.parse(JSON.stringify(tweets));
  for (let tweet of filteredTweets) {
    if (!tweet.hashtags.includes(hashtag)) {
      tweet.active = false;
    }
  }
  return filteredTweets;
};
// Adds back in tweets that do not include the selected hashtag
export const removeFilter = (tweets, hashtag, selectedFilters) => {
  let filteredTweets = JSON.parse(JSON.stringify(tweets));
  for (let tweet of filteredTweets) {
    if (!tweet.hashtags.includes(hashtag)) {
      // If no other filters are set, add back in all tweets
      // If there are other filters selected, check if the tweet has any of them before adding the tweet back in
      if (selectedFilters.length !== 1) {
        for (const filter of selectedFilters) {
          if (tweet.hashtags.includes(filter)) {
            tweet.active = true;
          }
        }
      } else {
        tweet.active = true;
      }
    }
  }
  return filteredTweets;
};
