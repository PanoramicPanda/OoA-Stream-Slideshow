import React from 'react'
import ReactDOM from 'react-dom/client'
import {CharacterCard} from './components/CharacterCard'
import './index.css'
import Slideshow from './components/Slideshow'

import heroforgeCard from "./assets/cards/heroforge.png";
import scheduleCard from "./assets/cards/schedule.png";
import socialsCard from "./assets/cards/socials.png";
import truthCard from "./assets/cards/character-truth-9239322.png";

// sched
// social
// heroforge
// rinn
// truth
// brocc
// ragnar

const slideshowImages = [
    scheduleCard,
    socialsCard,
    heroforgeCard,
    truthCard
];

const renderDev = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return <CharacterCard characterId={9239322} characterImage={truthCard} prefetch={true} />
    } else {
        return <Slideshow images={slideshowImages} intervalSeconds={45} prefetchSeconds={3} />
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {renderDev()}
      {console.log('Hello, world!')}
  </React.StrictMode>,
)
