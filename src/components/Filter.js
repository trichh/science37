import { useSelector, useDispatch } from 'react-redux'

import { filterTweets, removeFilter } from '../helpers'
import { selectHashtag, removeSelectedHashtag } from '../reducers/TweetReducer'

const Filter = (props) => {
  const tweets = useSelector((state) => state.tweet.tweets);
  const selectedFilters = useSelector((state) => state.tweet.selectedHashtags);
  const dispatch = useDispatch();

  const addHashtag = (hashtag) => {
    const filteredTweets = filterTweets(tweets, hashtag);
    dispatch(selectHashtag({
      hashtag: hashtag,
      tweets: filteredTweets
    }));
  }
  const removeHashtag = (hashtag) => {
    const filteredTweets = removeFilter(tweets, hashtag, selectedFilters);
    dispatch(removeSelectedHashtag({
      hashtag: hashtag,
      tweets: filteredTweets
    }));
  }

  return (
    <div className={ (props.filterType === 'unselected') ? 'filter' : 'selectedFilter' }>
      <p onClick={() => (props.filterType === 'unselected') ? addHashtag(props.hashtag) : removeHashtag(props.hashtag)}>{props.hashtag}</p>
    </div>
  )
}

export default Filter;
