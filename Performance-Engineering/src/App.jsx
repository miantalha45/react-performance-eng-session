import { useState, useRef, memo, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const LazyDemo               = lazy(() => import('./LazyDemo'))
const HooksDemo              = lazy(() => import('./HooksDemo'))
const TransitionDemo         = lazy(() => import('./useTransition/TransitionDemo'))
const DeferredDemo           = lazy(() => import('./useDeffered/DefferedDemo'))
const DebounceThrottleDemo   = lazy(() => import('./DebounceThrottleDemo'))

// ── Child component ───────────────────────────────
const Child = memo(function Child() {
  const renders = useRef(0)
  renders.current++
  return <p>Child rendered: {renders.current} times</p>
})

// ── Memo Demo ─────────────────────────────────────
function MemoDemo() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>React.memo Demo</h2>
      <button onClick={() => setCount(c => c + 1)}>Re-render Parent ({count})</button>
      <Child />
    </div>
  )
}

// ── App ───────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Memo</Link> |{' '}
        <Link to="/hooks">useCallback + useMemo</Link> |{' '}
        <Link to="/transition">useTransition</Link> |{' '}
        <Link to="/deferred">useDeferredValue</Link> |{' '}
        <Link to="/lazy">Lazy Loading</Link> |{' '}
        <Link to="/debounce">Debounce + Throttle</Link>
      </nav>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/"           element={<MemoDemo />} />
          <Route path="/hooks"      element={<HooksDemo />} />
          <Route path="/transition" element={<TransitionDemo />} />
          <Route path="/deferred"   element={<DeferredDemo />} />
          <Route path="/lazy"       element={<LazyDemo />} />
          <Route path="/debounce"   element={<DebounceThrottleDemo />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
