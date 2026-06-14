import {
  useDeferredValue,
  useEffect,
  useState,
} from 'react';

import SlowList from './SlowList';

const DefferedDemo = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div className='tutorial'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
      />
      <SlowList text={deferredQuery} />
    </div>
  );
};

export default DefferedDemo;