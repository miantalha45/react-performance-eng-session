import { memo } from 'react'

const PostsTab = () => {
  console.log('[ARTIFICIALLY SLOW] Rendering 2500 <SlowPost />')

  const items = []
  for (let i = 0; i < 2500; i++) {
    items.push(<SlowPost key={i} index={i} />)
  }
  return <ul>{items}</ul>
}

function SlowPost({ index }) {
  const start = performance.now()
  while (performance.now() - start < 1) {}  // 1ms per item = ~2.5s total
  return <li>Post #{index + 1}</li>
}

export default memo(PostsTab)
