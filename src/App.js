import './App.css';

import Search from './components/Search';
import HashtagFilters from './components/HashtagFilters';
import TweetFeed from './components/TweetFeed';

function App() {
  return (
    <div className="container">
      <div className="row">
        <Search />
        <HashtagFilters />
      </div>
      <div className="row">
        <TweetFeed />
      </div>
    </div>
  );
}

export default App;
