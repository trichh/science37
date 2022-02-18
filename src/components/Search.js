import { useDispatch } from 'react-redux'
import { IoIosSearch } from "react-icons/io";
import { useDebouncedCallback } from 'use-debounce';

import { searchTweets } from '../helpers'
import { setTweetResults } from '../reducers/TweetReducer'

const Search = () => {
  const dispatch = useDispatch();

  const submitSearch = useDebouncedCallback((keyword) => {
    if (keyword !== '') {
      searchTweets(keyword)
      .then(response => dispatch(setTweetResults({
        hashtags: response.hashtags,
        tweets: response.tweets
      })));
    } else {
      dispatch(setTweetResults({
        hashtags: [],
        tweets: []
      }));
    }
  }, 1500);

  return (
    <div className="search">
      <h1>Tweet Feed</h1>
      <div className="searchInput">
        <IoIosSearch color="#9EA0A4" size="1.5em" />
        <input type='text' name='keyword' placeholder='Search by keyword' defaultValue='' onChange={e => submitSearch(e.target.value)} />
      </div>
    </div>
  )
}

export default Search;
