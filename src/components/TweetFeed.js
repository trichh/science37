import { useSelector } from 'react-redux'

import { getActiveTweets } from '../helpers'

import Tweet from './Tweet';

const TweetFeed = () => {
  const tweets = useSelector((state) => state.tweet.tweets);
  const tweetCount = useSelector((state) => state.tweet.tweetCount);
  const activeTweets = getActiveTweets(tweets);

  return (
    <div className="tweetContainer">
      { (activeTweets.length > 0) ? activeTweets.slice(0, tweetCount).map((value, iteration) =>
          <Tweet iteration={iteration} tweet={value} key={iteration} />
        ) : <div className="tweet">
          <p style={{marginLeft: 0, marginBottom: '1rem'}}>No tweets found</p>
        </div>
      }
    </div>
  )
}

export default TweetFeed;
