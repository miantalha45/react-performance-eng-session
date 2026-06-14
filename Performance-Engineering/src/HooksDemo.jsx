import { useState, useRef, memo, useCallback, useMemo } from 'react'

const ITEMS = ['Apple', 'Banana', 'Apricot', 'Blueberry', 'Avocado', 'Cherry']

// Child receives onAdd — will re-render if onAdd reference changes
const Child = memo(function Child({ onAdd }) {
  const renders = useRef(0)
  renders.current++

  return (
    <div>
      <p>Child renders: {renders.current}</p>
      <button onClick={onAdd}>Add Item</button>
    </div>
  )
})

export default function HooksDemo() {
  const [count, setCount] = useState(0)
  const [query, setQuery] = useState('')

  // useCallback — same function reference every render
  // remove useCallback and watch Child renders go up on every parent re-render
  const handleAdd = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  // useMemo — only re-filters when query changes
  // remove useMemo and the filter runs on every render
  const filtered = useMemo(
    () => ITEMS.filter(i => i.toLowerCase().includes(query.toLowerCase())),
    [query]
  )

  return (
    <div>
      <h2>useCallback + useMemo Demo</h2>
      <p>Parent re-renders: {count}</p>

      <input
        placeholder="Filter items..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <Child onAdd={handleAdd} />

      <ul>
        {filtered.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}
