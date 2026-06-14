import { useState, useRef, useEffect } from 'react'

// ── Debounce: waits until user STOPS, then fires once ──
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// ── Throttle: fires at most once every N ms ──
function throttle(fn, limit) {
  let lastCall = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      fn(...args)
    }
  }
}

export default function DebounceThrottleDemo() {
  const [rawCount, setRawCount]         = useState(0)
  const [debouncedCount, setDebounced]  = useState(0)
  const [throttledCount, setThrottled]  = useState(0)

  const debouncedFn  = useRef(debounce(() => setDebounced(c => c + 1), 500))
  const throttledFn  = useRef(throttle(() => setThrottled(c => c + 1), 500))

  function handleInput() {
    setRawCount(c => c + 1)    // fires every keystroke
    debouncedFn.current()      // fires 500ms after LAST keystroke
    throttledFn.current()      // fires at most once every 500ms
  }

  function reset() {
    setRawCount(0)
    setDebounced(0)
    setThrottled(0)
  }

  return (
    <div>
      <h2>Debounce vs Throttle</h2>

      <input
        placeholder="Type fast here..."
        onChange={handleInput}
        style={{ fontSize: 16, padding: 6, width: 260 }}
      />

      <table style={{ marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Strategy</th>
            <th style={th}>Fires</th>
            <th style={th}>Use when</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Raw (no optimization)</td>
            <td style={{ ...td, color: 'red', fontWeight: 'bold' }}>{rawCount}x</td>
            <td style={td}>—</td>
          </tr>
          <tr>
            <td style={td}>Debounce (500ms)</td>
            <td style={{ ...td, color: 'green', fontWeight: 'bold' }}>{debouncedCount}x</td>
            <td style={td}>Search input, form validation</td>
          </tr>
          <tr>
            <td style={td}>Throttle (500ms)</td>
            <td style={{ ...td, color: 'blue', fontWeight: 'bold' }}>{throttledCount}x</td>
            <td style={td}>Scroll, resize, mouse move</td>
          </tr>
        </tbody>
      </table>

      <button onClick={reset} style={{ marginTop: 12 }}>Reset counts</button>
    </div>
  )
}

const th = { border: '1px solid #ccc', padding: '6px 12px', background: '#f5f5f5', textAlign: 'left' }
const td = { border: '1px solid #ccc', padding: '6px 12px' }
