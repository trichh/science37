import { useSelector, useDispatch } from 'react-redux'

import { getActiveTweets } from '../helpers'
import { setTweetCount } from '../reducers/TweetReducer'

import Filter from './Filter';

const Tweet = (props) => {
  const tweets = useSelector((state) => state.tweet.tweets);
  const tweetCount = useSelector((state) => state.tweet.tweetCount);
  const selectedFilters = useSelector((state) => state.tweet.selectedHashtags);
  const activeTweets = getActiveTweets(tweets);
  const dispatch = useDispatch();

  return (
    <div className="tweet">
      <img src={props.tweet.photo} alt="Profile Pricture" />
      <p><b>{props.tweet.username}</b></p>
      <p>{props.tweet.tweet} <a href={props.tweet.link}>{props.tweet.link}</a></p>
      <div className="filterWrapper">
        { selectedFilters.map((value, iteration) => (selectedFilters.length > 0 && props.tweet.hashtags.includes(value)) ? <Filter hashtag={value} filterType={'selected'} key={iteration} /> : null) }
        { props.tweet.hashtags.map((value, iteration) => (props.tweet.hashtags.length > 0 && !selectedFilters.includes(value)) ? <Filter hashtag={value} filterType={'unselected'} key={iteration} /> : null) }
      </div>
      { (props.iteration + 1 === activeTweets.slice(0, tweetCount).length && activeTweets.slice(0, tweetCount).length % 5 === 0 && props.iteration + 1 !== activeTweets.length) ? <p className="loadMore" onClick={() => dispatch(setTweetCount())}>Load More</p> : null }
    </div>
  )
}

export default Tweet;
