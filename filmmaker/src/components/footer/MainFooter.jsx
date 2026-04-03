import { motion } from 'framer-motion'

const MotionFooter = motion.footer
const MotionDiv = motion.div
const MotionA = motion.a
const MotionP = motion.p

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/505aswin/?hl=en',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:aswinsflim@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18v12H3z" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/ASHWINS45597930',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4l16 16M20 4L4 20" />
      </svg>
    ),
  },
]

const sectionLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function MainFooter() {
  return (
    <MotionFooter
      className="page-footer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionDiv className="footer-col">
        <MotionP className="footer-heading footer-credit">
          website developed by{' '}
          <MotionA
            href="https://ash-505go.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="footer-credit-link"
            whileHover={{ y: -1 }}
          >
            ASWIN S
          </MotionA>
        </MotionP>
        <MotionP className="footer-note">All rights reserved.</MotionP>
        <MotionP className="footer-note">Phone: +917010866027</MotionP>
      </MotionDiv>

      <MotionDiv className="footer-col">
        <MotionP className="footer-heading">Connect</MotionP>
        <div className="footer-links">
          {socialLinks.map((item) => (
            <MotionA
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="social-icon-link"
              whileHover={{ y: -2 }}
            >
              {item.icon}
            </MotionA>
          ))}
        </div>
      </MotionDiv>

      <MotionDiv className="footer-col">
        <MotionP className="footer-heading">Navigate</MotionP>
        <div className="footer-links">
          {sectionLinks.map((item) => (
            <MotionA key={item.label} href={item.href} whileHover={{ x: 4 }}>
              {item.label}
            </MotionA>
          ))}
        </div>
      </MotionDiv>
    </MotionFooter>
  )
}

export default MainFooter
