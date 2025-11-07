import React from 'react'
import {ThemeToggle} from "../Components/ThemeToggle";
import {StarBackground} from "../Components/StarBackground";
import { NavBar } from '../Components/NavBar';
import { HeroSection } from '../Components/HeroSection';
const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle/>
      <StarBackground/>
      <NavBar/>
      <main>
        <HeroSection/>
      </main>
    </div>
  )
}

export default Home