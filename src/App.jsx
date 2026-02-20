import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import bannerArt from './assets/Banner.jpg'
import logo from './assets/logo.jpg'
import './App.css'

const messengerLink = 'https://m.me/your-thai-food-shop'
const telegramLink = 'https://t.me/your_thai_food_shop'
const facebookLink = 'https://facebook.com/your-thai-food-page'

const menuCategories = [
  {
    title: 'Food',
    image:
      'https://images.unsplash.com/photo-1559314809-0f31657def5e?auto=format&fit=crop&w=900&q=80',
    items: ['Pad Thai', 'Tom Yum Soup', 'Green Curry', 'Basil Chicken'],
  },
  {
    title: 'Special Menu',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80',
    items: ['Seafood Combo', 'Crispy Pork Belly', 'Grilled River Prawn', 'Chef Signature Curry'],
  },
  {
    title: 'Drinks',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    items: ['Thai Milk Tea', 'Lemongrass Cooler', 'Coconut Juice', 'Thai Iced Coffee'],
  },
  {
    title: 'Set',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
    items: ['Couple Set', 'Family Set', 'Lunch Combo', 'Party Pack'],
  },
]

function App() {
  const formRef = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [showOrderOptions, setShowOrderOptions] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatusMessage('')
    setIsSending(true)

    try {
      await emailjs.sendForm(
        'service_z18dogo',
        'template_sfkhzci',
        formRef.current,
        'P9RcPiZ8R4YHRacnj',
      )
      setStatusMessage('Thank you. Your message has been sent.')
      formRef.current.reset()
    } catch (error) {
      setStatusMessage('Failed to send. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="thai-page">
      <div className="top-bar">OPEN DAILY 10:00 AM - 8:00 PM</div>

      <header className="main-header">
        <nav className="header-links" aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </nav>

        <img src={logo} alt="Siam Soul Logo" className="logo" />

        <div className="header-right">
          <p>Reservations 09-753 313 267</p>
          <button
            type="button"
            className="order-btn"
            onClick={() => setShowOrderOptions((open) => !open)}
          >
            Order Now
          </button>
          {showOrderOptions && (
            <div className="order-menu" role="menu" aria-label="Order chat options">
              <a href={messengerLink} target="_blank" rel="noreferrer" aria-label="Messenger">
                <svg viewBox="0 0 24 24" className="order-icon" aria-hidden="true">
                  <path
                    d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.45 5.506 3.719 7.197V22l3.367-1.849c.897.248 1.845.381 2.914.381 5.523 0 10-4.145 10-9.258S17.523 2 12 2Zm1.164 12.459-2.548-2.72-4.971 2.72 5.468-5.805 2.633 2.72 4.886-2.72-5.468 5.805Z"
                    fill="blue"
                  />
                </svg>
                <span className="sr-only">Messenger</span>
              </a>
              <a href={telegramLink} target="_blank" rel="noreferrer" aria-label="Telegram">
                <svg viewBox="0 0 24 24" className="order-icon" aria-hidden="true">
                  <path
                    d="M9.78 15.167 9.4 20.45c.544 0 .78-.234 1.064-.515l2.55-2.438 5.284 3.87c.969.534 1.655.253 1.916-.892L23.7 4.15c.341-1.399-.506-1.946-1.45-1.597L1.86 10.374c-1.39.547-1.37 1.322-.236 1.666l5.212 1.626L18.94 6.03c.57-.35 1.09-.156.662.193L9.78 15.167Z"
                    fill="blue"
                  />
                </svg>
                <span className="sr-only">Telegram</span>
              </a>
            </div>
          )}
        </div>
      </header>

      <section className="hero" style={{ backgroundImage: `url(${bannerArt})` }}>
        <div className="hero-overlay">
          <p className="badge">Authentic Thai Kitchen</p>
          <h2>
            A Symphony of <span>Spices</span> & Soul.
          </h2>
          <p>Experience vibrant flavors of Bangkok with handcrafted Thai recipes for every meal.</p>
          <a href="#menu" className="hero-cta">
            View Full Menu
          </a>
        </div>
      </section>

      <section id="menu" className="menu-section">
        <h3>Our Menu</h3>
        <div className="menu-grid">
          {menuCategories.map((item) => (
            <article key={item.title} className="menu-card">
              <img src={item.image} alt={item.title} className="menu-image" loading="lazy" />
              <div className="menu-content">
                <h4>{item.title}</h4>
                <ul>
                  {item.items.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer-section">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Address: No.431, Shwe Yee st, NgaMoeYeik qtr, Thingangyun</p>
          <p>Phone: 09-753 313 267</p>
          <p>Email: shine24lynn@gmail.com</p>
          <a href={facebookLink} target="_blank" rel="noreferrer" className="fb-link">
            Facebook Page
          </a>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="customer_name" required />
          </label>

          <label>
            Email
            <input type="email" name="customer_email" required />
          </label>

          <label>
            Message
            <textarea name="message" rows="4" required />
          </label>

          <button type="submit" className="send-btn" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Message'}
          </button>

          {statusMessage && <p className="status-text">{statusMessage}</p>}
        </form>

        <p className="copyright">Copyright © {new Date().getFullYear()} Kaung Thadar. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default App
