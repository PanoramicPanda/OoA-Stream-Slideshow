import {useEffect, useState} from "react";
import {CharacterCard} from "./CharacterCard.jsx";
import '../css/slideshow.css';

const Slideshow = ({images, intervalSeconds, prefetchSeconds}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prefetchIndex, setPrefetchIndex] = useState(null);

    useEffect(() =>{
        const changeImage = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setPrefetchIndex(null);
        };

        const timer = setInterval(changeImage, intervalSeconds * 1000);

        const nextIndex = (currentIndex + 1) % images.length;
        const nextImage = images[nextIndex];

        if (nextImage.includes('character')) {
            const prefetchDelay = (intervalSeconds - prefetchSeconds) * 1000;
            setTimeout(() => setPrefetchIndex(nextIndex), prefetchDelay);
        }

        return () => clearInterval(timer);
    }, [currentIndex, images, intervalSeconds, prefetchSeconds]);

    return (
        <div className="slideshow">
            {images.map((image, index) => {
                const isActive = index === currentIndex;
                const isCharacterImage = image.includes('character');
                const characterId = isCharacterImage ? image.split('-')[2].split('.')[0] : null;

                return (
                    <div key={index} className={`slide ${isActive ? 'active' : ''}`}
                         style={{opacity: isActive ? 1 : 0, transition: 'opacity 1s'}}>
                        {isCharacterImage ? (
                            <CharacterCard characterId={characterId} characterImage={image}
                                           prefetch={index === prefetchIndex}/>
                        ) : (
                            <img src={image} alt={`Slide ${index}`}/>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Slideshow