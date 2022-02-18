import { configureStore } from '@reduxjs/toolkit'

import TweetReducer from './reducers/TweetReducer'

export default configureStore({
  reducer: {
    tweet: TweetReducer
  },
})
