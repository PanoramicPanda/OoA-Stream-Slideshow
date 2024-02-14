import React from 'react'
import ReactDOM from 'react-dom/client'
import {CharacterCard} from './components/CharacterCard'
import './index.css'
import Slideshow from './components/Slideshow'

import heroforgeCard from "./assets/cards/heroforge.png";
import scheduleCard from "./assets/cards/schedule.png";
import socialsCard from "./assets/cards/socials.png";
import rinnCard from "./assets/cards/character-rinn-8030631.png";
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
    rinnCard,
    truthCard
];

const renderDev = () => {
    const renderMode = import.meta.env.VITE_RENDER_MODE;

    if (renderMode === 'character') {
        return <CharacterCard characterId={9239322} characterImage={truthCard} prefetch={true} />
    } else if (renderMode === 'slideshow') {
        return <Slideshow images={slideshowImages} intervalSeconds={45} prefetchSeconds={3} />
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {renderDev()}
  </React.StrictMode>,
)
