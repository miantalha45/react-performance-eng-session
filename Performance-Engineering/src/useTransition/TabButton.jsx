import { useTransition } from 'react'

function TabButton({ onClick, children }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      onClick?.()
    })
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  return <button onClick={handleClick}>{children}</button>
}

export default TabButton
