import { useSelector } from 'react-redux'

import { getActiveTweets, getHashtags } from '../helpers'

import Filter from './Filter';

const HashtagFilters = () => {
  const tweets = useSelector((state) => state.tweet.tweets);
  const tweetCount = useSelector((state) => state.tweet.tweetCount);
  const selectedFilters = useSelector((state) => state.tweet.selectedHashtags);
  const activeTweets = getActiveTweets(tweets);
  const hashtags = getHashtags(activeTweets, tweetCount);

  return (
    <div className="hashtagFilters">
      <h1>Filter by hashtag</h1>
      { (selectedFilters.length > 0) ? <div>
          { selectedFilters.map((value, iteration) => <Filter hashtag={value} filterType={'selected'} key={iteration} />) }
        </div> : null
      }
      { (hashtags.length > 0) ? hashtags.map((value, iteration) => (!selectedFilters.includes(value)) ? <Filter hashtag={value} filterType={'unselected'} key={iteration} /> : null) : <p>No hashtags found</p> }
    </div>
  )
}

export default HashtagFilters;
