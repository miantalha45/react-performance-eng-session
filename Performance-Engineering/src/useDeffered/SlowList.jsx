import { memo } from 'react'

const SlowList = memo(function SlowList({ text }) {
  const items = []
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />)
  }
  return <ul>{items}</ul>
})

function SlowItem({ text }) {
  const start = performance.now()
  while (performance.now() - start < 1) {}  // 1ms per item = 250ms total
  return <li>Text: {text}</li>
}

export default SlowList
