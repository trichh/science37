import { createSlice } from '@reduxjs/toolkit'

export const TweetReducer = createSlice({
  name: 'tweet',
  initialState: {
    hashtags: [],
    selectedHashtags: [],
    tweets: [],
    tweetCount: 0,
  },
  reducers: {
    setTweetResults: (state, action) => {
      state.hashtags = action.payload.hashtags;
      state.tweets = action.payload.tweets;
      state.tweetCount = 5;
      state.selectedHashtags = [];
    },
    setTweetCount: (state) => {
      state.tweetCount += 5;
    },
    selectHashtag: (state, action) => {
      state.selectedHashtags.push(action.payload.hashtag);
      state.tweets = action.payload.tweets;
      state.tweetCount = 5;
    },
    removeSelectedHashtag: (state, action) => {
      const index = state.selectedHashtags.indexOf(action.payload.hashtag);
      state.selectedHashtags.splice(index, 1);
      state.tweets = action.payload.tweets;
      state.tweetCount = 5;
    }
  },
})

export const { setTweetResults, setTweetCount, selectHashtag, removeSelectedHashtag } = TweetReducer.actions

export default TweetReducer.reducer
