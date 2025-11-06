import React from 'react'
import {ThemeToggle} from "../Components/ThemeToggle";
import {StarBackground} from "../Components/StarBackground";
import { NavBar } from '../Components/NavBar';
const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle/>
      <StarBackground/>
      <NavBar/>
    </div>
  )
}

export default Home