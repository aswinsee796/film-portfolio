import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import HeroIntro from '../hero/HeroIntro'
import HeroPortraitCanvas from '../hero/HeroPortraitCanvas'
import frame1 from '../../assets/frame-1.png'
import frame1a from '../../assets/frame-1a.png'
import frame2 from '../../assets/frame-2.png'
import frame2a from '../../assets/frame-2a.png'
import storyDevelopmentImage from '../../assets/storydevlopment.jpg'
import screenplayImage from '../../assets/screenplay.jpg'
import dialogueImage from '../../assets/dialogue1.jpg'
import cinematographyImage from '../../assets/cinematography.jpg'
import colorGradingImage from '../../assets/color1.jpg'
import editingImage from '../../assets/editing.jpg'
import resumePdf from '../../assets/newfilmres.pdf'
import upperImage from '../../assets/upper-fixed.png'

const MotionDiv = motion.div
const MotionArticle = motion.article
const MotionP = motion.p
const MotionH2 = motion.h2
const MotionButton = motion.button
const MotionA = motion.a

const sectionTransition = {
  hidden: { opacity: 0, y: 56, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.16 },
  },
}

const framePlaceholders = [
  {
    title: 'Rain Corridor',
    film: 'Short Film: A TAiL OF THE BUTTERFRUIT TREE',
    year: '2025',
    tone: 'Relax',
    duration: '9m 15s',
    description: 'A quiet emotional drama unfolding through memory, nature, and unresolved family silence.',
    youtubeEmbed: 'https://youtu.be/FkZPthxvJBk?si=AOQKK3O0Wo-q-l9n',
    youtubeUrl: 'https://youtu.be/FkZPthxvJBk?si=AOQKK3O0Wo-q-l9n',
    image: frame1a,
  },
  {
    title: 'Dust & Dawn',
    film: 'Short Film: BEHIND THE FLASH',
    year: '2025',
    tone: 'Gritty, Dark',
    duration: '27m 42s',
    description: 'A tense portrait of ambition and burnout in the world behind fast-moving camera flashes.',
    youtubeEmbed: 'https://youtu.be/C3ndl9RGk_Q?si=46kANC7-3XvwGBIj',
    youtubeUrl: 'https://youtu.be/C3ndl9RGk_Q?si=46kANC7-3XvwGBIj',
    image: frame1,
  },
  {
    title: 'Window Monologue',
    film: 'Short Film: A TAiL OF THE BUTTERFRUIT TREE',
    year: '2025',
    tone: 'Relax',
    duration: '9m 15s',
    description: 'An introspective chapter where stillness, framing, and voiceover carry the emotional arc.',
    youtubeEmbed: 'https://youtu.be/FkZPthxvJBk?si=AOQKK3O0Wo-q-l9n',
    youtubeUrl: 'https://youtu.be/FkZPthxvJBk?si=AOQKK3O0Wo-q-l9n',
    image: frame2a,
  },
  {
    title: 'Highway Silence',
    film: 'Short Film: BEHIND THE FLASH',
    year: '2025',
    tone: 'Gritty, Dark',
    duration: '27m 42s',
    description: 'Night-drive imagery and fractured dialogue reveal the cost of artistic obsession.',
    youtubeEmbed: 'https://youtu.be/C3ndl9RGk_Q?si=46kANC7-3XvwGBIj',
    youtubeUrl: 'https://youtu.be/C3ndl9RGk_Q?si=46kANC7-3XvwGBIj',
    image: frame2,
  },
]

const aboutSkillCards = [
  {
    id: 'story',
    title: 'Story Development',
    // short: 'From concept notes to complete narrative arc.',
    details:
      'I develop stories from idea to treatment, building visual rhythm, thematic continuity, and performance intent.',
    image: storyDevelopmentImage,
  },
  {
    id: 'screenplay',
    title: 'Screenplay Writing',
    // short: 'Scene design, structure, and emotional beats.',
    details:
      'Hands-on experience in writing screenplay flow, scene transitions, and character-driven conflict across short formats.',
    image: screenplayImage,
  },
  {
    id: 'dialogues',
    title: 'Dialogue Writing',
    // short: 'Natural, performable, and tone-consistent lines.',
    details:
      'Experience crafting dialogues with subtext and pace so actors can deliver believable emotions without over-exposition.',
    image: dialogueImage,
  },
  {
    id: 'cinematography',
    title: 'Cinematography',
    // short: 'Framing, movement, and lighting language.',
    details:
      'I shoot with strong composition, mood lighting, and purposeful camera movement to support story tension and tone.',
    image: cinematographyImage,
  },
  {
    id: 'grading',
    title: 'Color Grading',
    // short: 'Look creation and color consistency shot-to-shot.',
    details:
      'I shape final mood through color grading, balancing tones and preserving skin/detail while matching film atmosphere.',
    image: colorGradingImage,
  },
  {
    id: 'editing',
    title: 'Editing',
    // short: 'Narrative timing, continuity, and impact cuts.',
    details:
      'Hands-on post-production experience in pacing scenes, emotional timing, and structuring sequences for cinematic flow.',
    image: editingImage,
  },
]

const getYouTubeEmbedUrl = (rawUrl) => {
  if (!rawUrl) return ''

  try {
    const url = new URL(rawUrl)
    const host = url.hostname.replace('www.', '')

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : rawUrl
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const videoId = url.searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}`

      const pathParts = url.pathname.split('/').filter(Boolean)
      const knownPrefix = pathParts[0]
      if ((knownPrefix === 'shorts' || knownPrefix === 'embed') && pathParts[1]) {
        return `https://www.youtube.com/embed/${pathParts[1]}`
      }
    }
  } catch {
    return rawUrl
  }

  return rawUrl
}

const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_bv4jclf'
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x0nncm6'
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '97RDjcYi_QmwKzmns'

function PortfolioSections() {
  const [activeFilm, setActiveFilm] = useState(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [flippedAboutCards, setFlippedAboutCards] = useState({})
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' })
  const [isSendingContact, setIsSendingContact] = useState(false)

  const handleAboutCardFlip = (cardId) => {
    setFlippedAboutCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setContactStatus({ type: '', message: '' })

    const trimmedName = contactName.trim()
    const trimmedEmail = contactEmail.trim()
    const trimmedMessage = contactMessage.trim()
    const messageWordCount = trimmedMessage.split(/\s+/).filter(Boolean).length
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!trimmedName) {
      setContactStatus({ type: 'error', message: 'Please enter your name.' })
      return
    }

    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      setContactStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    if (!trimmedMessage) {
      setContactStatus({ type: 'error', message: 'Please enter your message.' })
      return
    }

    if (messageWordCount < 10) {
      setContactStatus({ type: 'error', message: 'Message must contain at least 10 words.' })
      return
    }

    setIsSendingContact(true)

    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: trimmedName || 'Portfolio Contact Form',
          user_name: trimmedName || 'Anonymous',
          user_email: trimmedEmail,
          subject: contactSubject.trim(),
          message: trimmedMessage,
          reply_to: trimmedEmail,
        },
        {
          publicKey: emailJsPublicKey,
        },
      )

      setContactStatus({ type: 'success', message: 'Message sent successfully.' })
      setContactName('')
      setContactEmail('')
      setContactSubject('')
      setContactMessage('')
    } catch {
      setContactStatus({
        type: 'error',
        message: 'Unable to send message right now. Please try again.',
      })
    } finally {
      setIsSendingContact(false)
    }
  }

  useEffect(() => {
    if (!activeFilm && !isResumeOpen) {
      document.body.classList.remove('modal-open')
      return
    }

    document.body.classList.add('modal-open')

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveFilm(null)
        setIsResumeOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [activeFilm, isResumeOpen])

  return (
    <>
      <section className="page-section page-section-work" id="work" aria-label="Work section">
        <MotionDiv
          className="hero-section"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <MotionDiv variants={sectionTransition}>
            <HeroIntro />
          </MotionDiv>
          <MotionDiv variants={sectionTransition}>
            <HeroPortraitCanvas />
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          className="works-gallery"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <MotionDiv className="section-head" variants={sectionTransition}>
            <p>Works Section</p>
            <h2>Frames From My Short Films</h2>
          </MotionDiv>
          <div className="frame-grid">
            {framePlaceholders.map((frame) => (
              <MotionArticle key={frame.title} className="frame-card" variants={sectionTransition}>
                <MotionButton
                  type="button"
                  className="frame-card-trigger"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveFilm(frame)}
                >
                  <div className="frame-image-placeholder">
                    <img src={frame.image} alt={frame.title} className="frame-image" />
                  </div>
                  <div className="frame-meta">
                    <h3>{frame.film}</h3>
                    <p>{frame.tone}</p>
                    <small>{frame.year}</small>
                  </div>
                </MotionButton>
              </MotionArticle>
            ))}
          </div>
        </MotionDiv>
      </section>

      <section className="page-section" id="about" aria-label="About section">
        <MotionDiv
          className="section-content"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <MotionP className="section-label" variants={sectionTransition}>
            About
          </MotionP>
          <MotionH2 variants={sectionTransition}>Independent Filmmaker | Writer | Director | Cinematographer | Editor</MotionH2>
          <MotionDiv className="about-profile-grid" variants={sectionTransition}>
            <div className="about-profile-media">
              <div className="about-profile-media-slot">
                <div className="about-profile-media-upper">
                  <img src={upperImage} alt="About section portrait upper" />
                </div>
              </div>
            </div>

            <div className="about-profile-right">
              <article className="about-profile-block">
                <h3>Professional Summary</h3>
                <p>
                  Independent filmmaker specializing in writing, directing, cinematography, and editing. Passionate
                  about cinematic storytelling, lighting design, and visual narrative with a strong focus on
                  emotionally driven, concept-based films.
                </p>
              </article>

              <article className="about-profile-block">
                <h3>Films Made</h3>
                <ul className="about-profile-list">
                  <li>
                    A Tail of the Butterfruit Tree (Jun 2025 - Aug 2025): Writer, Director, Editor, Cinematographer
                  </li>
                  <li>
                    Behind the Flash (Sep 2025 - Dec 2025): Writer, Director, Cinematographer, Editor
                  </li>
                </ul>
              </article>

              <article className="about-profile-block">
                <h3>Education</h3>
                <ul className="about-profile-list">
                  <li>SriniVasa Vidhyalaya Matric Higher Secondary School, Udumalpet (Jul 2007 - May 2019)</li>
                  <li>
                    Diploma in Electrical and Electronics Engineering, Nachimuthu Polytechnic College, Pollachi (Jun
                    2019 - May 2022)
                  </li>
                  <li>
                    Bachelor&apos;s in Computer Science Engineering, Sr Krishna College of Engineering and Technology,
                    Coimbatore (Sep 2022 - Apr 2025)
                  </li>
                </ul>
              </article>

              <article className="about-profile-block">
                <h3>Skills & Interests</h3>
                <p>
                  Creative roles: Writer, Director, Cinematographer, Film Editor.
                  <br />
                  Technical: DaVinci Resolve, Camera Operation, Lighting Setup, Runway ML, ChatGPT, Google Gemini.
                  <br />
                  Interests: Visual Storytelling, Experimental Cinema, Narrative Structure, Cinematic Lighting.
                </p>
              </article>

              <article className="about-profile-block">
                <h3>Awards & Recognition</h3>
                <p>Videotape Short Film Festival 2025 - Shortlisted (Behind the Flash)</p>
              </article>
            </div>
          </MotionDiv>
        </MotionDiv>
      </section>

      <section className="page-section" id="skills" aria-label="Skills section">
        <MotionDiv
          className="section-content"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <MotionP className="section-label" variants={sectionTransition}>
            Skills
          </MotionP>
          <MotionH2 variants={sectionTransition}>Hands-on experience across writing, camera, and post.</MotionH2>
          <MotionP variants={sectionTransition}>
            Screenplay writing, story development, dialogue writing, cinematography, editing, and color grading.
            Tap a card to flip and read details.
          </MotionP>

          <MotionDiv className="about-skill-grid" variants={staggerGroup}>
            {aboutSkillCards.map((card) => (
              <MotionButton
                key={card.id}
                type="button"
                className="about-skill-card"
                variants={sectionTransition}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAboutCardFlip(card.id)}
                aria-label={`Flip card for ${card.title}`}
              >
                <span className={`about-card-inner ${flippedAboutCards[card.id] ? 'is-flipped' : ''}`}>
                  <span className="about-card-face about-card-front">
                    <img src={card.image} alt={card.title} className="about-card-front-image" />
                    <span className="about-card-overlay" />
                    <span className="about-card-front-content">
                      <span className="about-card-heading">{card.title}</span>
                      <span className="about-card-short">{card.short}</span>
                      <span className="about-card-hint">Tap To Flip</span>
                    </span>
                  </span>

                  <span className="about-card-face about-card-back">
                    <span className="about-card-back-title">{card.title}</span>
                    <span className="about-card-details">{card.details}</span>
                  </span>
                </span>
              </MotionButton>
            ))}
          </MotionDiv>

          <MotionDiv className="resume-panel" variants={sectionTransition}>
            <p className="section-label">Resume</p>
            <h3>Director | Writer | Cinematographer | Editor</h3>
            <p>
              Open for short-film projects, ad films, and collaborative indie productions. Resume includes project
              highlights, tools, and role-wise experience.
            </p>
            <button type="button" className="resume-link" onClick={() => setIsResumeOpen(true)}>
              View Resume
            </button>
          </MotionDiv>
        </MotionDiv>
      </section>

      <section className="page-section" id="contact" aria-label="Contact section">
        <MotionDiv
          className="section-content"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <MotionP className="section-label" variants={sectionTransition}>
            Contact
          </MotionP>
          <MotionH2 variants={sectionTransition}>Contact Me</MotionH2>
          <MotionP variants={sectionTransition}>
            Have a project, collaboration, or story idea? Send your details and I&apos;ll get back to you.
          </MotionP>

          <MotionDiv className="contact-form-wrap" variants={sectionTransition}>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                placeholder="Your full name"
                required
              />

              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="name@example.com"
                required
              />

              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                value={contactSubject}
                onChange={(event) => setContactSubject(event.target.value)}
                placeholder="Let me know how I can help you"
              />

              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                value={contactMessage}
                onChange={(event) => setContactMessage(event.target.value)}
                placeholder="Leave your message here..."
                rows={7}
                required
              />

              <div className="contact-actions">
                <button type="submit" disabled={isSendingContact}>
                  {isSendingContact ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {contactStatus.message ? (
                <p className={`contact-status contact-status-${contactStatus.type}`}>{contactStatus.message}</p>
              ) : null}
            </form>
          </MotionDiv>
        </MotionDiv>
      </section>

      <AnimatePresence>
        {activeFilm ? (
          <MotionDiv
            className="film-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFilm(null)}
          >
            <MotionDiv
              className="film-modal"
              role="dialog"
              aria-modal="true"
              aria-label={activeFilm.film}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="modal-close" onClick={() => setActiveFilm(null)} aria-label="Close">
                Close
              </button>

              <div className="film-modal-player-wrap">
                <iframe
                  className="film-modal-player"
                  src={getYouTubeEmbedUrl(activeFilm.youtubeEmbed || activeFilm.youtubeUrl)}
                  title={activeFilm.film}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="film-modal-content">
                <p className="section-label">Now Previewing</p>
                <h3>{activeFilm.film}</h3>
                <p>{activeFilm.description}</p>
                <div className="film-meta-row">
                  <span>
                    Duration: <strong>{activeFilm.duration}</strong>
                  </span>
                  <span>
                    Year: <strong>{activeFilm.year}</strong>
                  </span>
                </div>
                <MotionA
                  className="preview-link"
                  href={activeFilm.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                >
                  Preview on YouTube
                </MotionA>
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}

        {isResumeOpen ? (
          <MotionDiv
            className="film-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsResumeOpen(false)}
          >
            <MotionDiv
              className="film-modal film-modal-resume"
              role="dialog"
              aria-modal="true"
              aria-label="Resume"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="modal-close" onClick={() => setIsResumeOpen(false)} aria-label="Close">
                Close
              </button>

              <div className="resume-modal-viewer-wrap">
                <iframe className="resume-modal-viewer" src={resumePdf} title="Resume PDF" />
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default PortfolioSections
