import { useState } from 'react'
import About from './About'
import Contact from './Contact'
import PostsTab from './PostsTab'
import TabButton from './TabButton'

export default function TransitionDemo() {
  const [tab, setTab] = useState('about')

  return (
    <div>
      <TabButton onClick={() => setTab('about')}>About</TabButton>
      <TabButton onClick={() => setTab('posts')}>Posts (slow)</TabButton>
      <TabButton onClick={() => setTab('contact')}>Contact</TabButton>

      {tab === 'about'   && <About />}
      {tab === 'posts'   && <PostsTab />}
      {tab === 'contact' && <Contact />}
    </div>
  )
}
