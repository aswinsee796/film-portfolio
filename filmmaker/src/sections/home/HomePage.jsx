import MainNav from '../../components/navigation/MainNav'
import MusicToggle from '../../components/music/MusicToggle'
import PortfolioSections from '../../components/sections/PortfolioSections'
import MainFooter from '../../components/footer/MainFooter'
import { sectionIds } from '../../components/sections/sectionIds'
import { useEffect, useState } from 'react'

function HomePage() {
  const [activeSection, setActiveSection] = useState('work')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 },
    )

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    sectionElements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="page page-home">
      <MainNav activeSection={activeSection} />
      <MusicToggle />
      <PortfolioSections />
      <MainFooter />
    </main>
  )
}

export default HomePage
