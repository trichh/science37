require('dotenv').config();
const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/searchTweets', (req, res) => {
  const keyword = req.body.keyword;
  const url = process.env.TWITTER_SEARCH_ENDPOINT + '?q=' + keyword + '&result_type=popular&count=100';
  const token = process.env.TWITTER_TOKEN;
  const options = {
    url: url,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  request(options, (error, response, body) => {
    const tweetsResponse = JSON.parse(body);
    let data = {
      hashtags: [],
      tweets: []
    };
    for (const [index, tweet] of tweetsResponse.statuses.entries()) {
      let hashtags = [];
      for (const hashtag of tweet.entities.hashtags) {
        hashtags.push("#" + hashtag.text);
        data.hashtags.push({
          itemIteration: index,
          text: "#" + hashtag.text
        });
      }
      data.tweets.push({
        active: true,
        hashtags: hashtags,
        link: (tweet.entities.urls.length > 0) ? tweet.entities.urls[0].url : null,
        photo: tweet.user.profile_image_url,
        tweet: tweet.text.slice(0, tweet.text.indexOf('https://t.co/')),
        username: "@" + tweet.user.screen_name
      });
    }
    res.status(200).send(data);
  });
});

module.exports = router;
