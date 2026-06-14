import { useRef, memo } from 'react'

function UserCard({ user, onReset }) {
  const renders = useRef(0)
  renders.current++

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      <p>Render count: {renders.current}</p>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

// STEP 1: wrap with memo so UserCard skips re-render when props haven't changed
// export default memo(UserCard)
export default UserCard
