import React from 'react'
import {HeroSection} from './HeroSection'
import {Features} from './Features'
import {Discover} from './Discover'
import {CallToAction} from './CallToAction'
import {Footer} from './Footer'

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <Discover />
      <CallToAction />
      <Footer />
      </div>
  )
}

export default LandingPage