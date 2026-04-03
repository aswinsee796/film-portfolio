import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

const MotionHeader = motion.header
const MotionNav = motion.nav

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function MainNav({ activeSection = 'work' }) {
  const [isCompressed, setIsCompressed] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setIsCompressed(value > 24)
  })

  const handleNavigate = (event, id) => {
    event.preventDefault()
    const section = document.getElementById(id)

    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <MotionHeader
      className="main-nav-wrap"
      animate={isCompressed ? 'compact' : 'top'}
      variants={{
        top: { y: 0, scale: 1 },
        compact: { y: -2, scale: 0.985 },
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionNav
        className="main-nav"
        aria-label="Main navigation"
        animate={isCompressed ? 'compact' : 'top'}
        variants={{
          top: { borderColor: 'rgba(46, 46, 49, 1)', backgroundColor: 'rgba(23, 23, 25, 0.82)' },
          compact: { borderColor: 'rgba(243, 190, 109, 0.4)', backgroundColor: 'rgba(12, 12, 14, 0.92)' },
        }}
        transition={{ duration: 0.4 }}
      >
        <a href="#work" className="brand-mark" aria-label="Home" onClick={(event) => handleNavigate(event, 'work')}>
          ASWIN S
        </a>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : ''}
                onClick={(event) => handleNavigate(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </MotionNav>
    </MotionHeader>
  )
}

export default MainNav
