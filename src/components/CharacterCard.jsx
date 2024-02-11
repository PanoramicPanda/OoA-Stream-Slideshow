import {useEffect, useState} from "react";
import StatGrabber from "../scripts/grabber.js";
import '../css/characterCard.css';

export function CharacterCard({characterId, characterImage, prefetch}){
    const [character, setCharacter] = useState();

    useEffect(() => {
        const fetchData = async () => {
            if (characterId && prefetch) {
                let characterStats = new StatGrabber(characterId);
                try {
                    const characterData = await characterStats.getCharacter();
                    const jsonData = await characterData.json();
                    characterStats.setCharacter(jsonData);
                    setCharacter(characterStats);
                } catch (error) {
                    console.error("Failed to fetch character data:", error);
                }
            }
        };

        fetchData();
    }, [characterId, prefetch]);


    const maxHealthBarHeight = 59; // in pixels

    const hasTempHp = character && character.tempHP > 0;

    const healthPercentage = character ? character.getCurrentHP() / character.getMaxHP() : 0;
    const healthBarTopOffset = maxHealthBarHeight - (maxHealthBarHeight * healthPercentage);

    return (
        <div>

            <img className={'cardimg'} src={characterImage}/>
            <div className={'white-box'}></div>
            <div
                className={`health-bar ${hasTempHp ? 'temp-hp' : ''}`}
                style={{
                    height: `${maxHealthBarHeight}px`,
                    top: `${Math.max(168, 168 + healthBarTopOffset)}px`,
                }}
            ></div>
            {character && <div className={'stat str'}><p>{character.getAbilityScore('STR')}</p></div>}
            {character && <div className={'stat dex'}><p>{character.getAbilityScore('DEX')}</p></div>}
            {character && <div className={'stat con'}><p>{character.getAbilityScore('CON')}</p></div>}
            {character && <div className={'stat int'}><p>{character.getAbilityScore('INT')}</p></div>}
            {character && <div className={'stat wis'}><p>{character.getAbilityScore('WIS')}</p></div>}
            {character && <div className={'stat cha'}><p>{character.getAbilityScore('CHA')}</p></div>}
            {character && <div className={'stat level'}><p>{character.getTotalLevel()}</p></div>}
            {character && <div className={'stat curr-hp'}><p>{character.getCurrentHP()}</p></div>}
            {character && <div className={'stat max-hp'}><p>{character.getMaxHP()}</p></div>}
            {character && <div className={'stat ac'}><p>{character.calcAC()}</p></div>}
        </div>
    )
}


// export function CharacterCard({characterId, characterImage}){
//     const [character, setCharacter] = useState();
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         if (characterId) {
//             let characterStats = new StatGrabber(characterId)
//             characterStats.getCharacter().then((characterData) => {
//                 characterData.json().then((jsonData) => {
//                     characterStats.setCharacter(jsonData);
//                     setCharacter(characterStats);
//                     setIsLoading(false);
//                 })
//             }).catch((error) => {
//                 console.error(error);
//                 setIsLoading(false);
//             })
//         }
//     }, [characterId]);
//
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         if (characterId) {
//     //             try {
//     //                 let characterStats = new StatGrabber(characterId);
//     //                 const characterData = await characterStats.getCharacter();
//     //                 const jsonData = await characterData.json();
//     //                 characterStats.setCharacter(jsonData);
//     //                 setCharacter(characterStats);
//     //             } catch (error) {
//     //                 console.error(error);
//     //             }
//     //         }
//     //     };
//     //
//     //     fetchData();
//     // }, [characterId]);
//
//
//     const maxHealthBarHeight = 59; // in pixels
//
//     const hasTempHp = character && character.tempHP > 0;
//
//     const healthPercentage = character ? character.getCurrentHP() / character.getMaxHP() : 0;
//     const healthBarTopOffset = maxHealthBarHeight - (maxHealthBarHeight * healthPercentage);
//
//     return (
//         <div>
//
//             <img className={'cardimg'} src={characterImage}/>
//             <div className={'white-box'}></div>
//             <div
//                 className={`health-bar ${hasTempHp ? 'temp-hp' : ''}`}
//                 style={{
//                     height: `${maxHealthBarHeight}px`,
//                     top: `${Math.max(168, 168 + healthBarTopOffset)}px`,
//                 }}
//             ></div>
//             {character && <div className={'stat str'}><p>{character.getAbilityScore('STR')}</p></div>}
//             {character && <div className={'stat dex'}><p>{character.getAbilityScore('DEX')}</p></div>}
//             {character && <div className={'stat con'}><p>{character.getAbilityScore('CON')}</p></div>}
//             {character && <div className={'stat int'}><p>{character.getAbilityScore('INT')}</p></div>}
//             {character && <div className={'stat wis'}><p>{character.getAbilityScore('WIS')}</p></div>}
//             {character && <div className={'stat cha'}><p>{character.getAbilityScore('CHA')}</p></div>}
//             {character && <div className={'stat level'}><p>{character.getTotalLevel()}</p></div>}
//             {character && <div className={'stat curr-hp'}><p>{character.getCurrentHP()}</p></div>}
//             {character && <div className={'stat max-hp'}><p>{character.getMaxHP()}</p></div>}
//             {character && <div className={'stat ac'}><p>{character.calcAC()}</p></div>}
//         </div>
//     )
// }

export default CharacterCard