class StatGrabber {

    constructor(characterId) {
        this.characterId = characterId;
        this.tempHp = 0;
        this.scoreLookups = {
            'STR': [0, 'strength-score'],
            'DEX': [1, 'dexterity-score'],
            'CON': [2, 'constitution-score'],
            'INT': [3, 'intelligence-score'],
            'WIS': [4, 'wisdom-score'],
            'CHA': [5, 'charisma-score']
        }
    }

    // perform a get request to a url with the character id as part of the url. It will return a json object
    getCharacter() {
        let apiUrl = `/api/${this.characterId}`;
        let response
        try {
            return fetch(apiUrl);
        } catch {
            return null;
        }
        // resolve (response.json());
    }

    setCharacter(data){
        this.character = data;
    }

    calculateAbilityModifier(abilityScore) {
        return Math.floor((abilityScore - 10) / 2);
    }
    getAbilityScore(ability) {
        if (this.character === undefined){
            return 0;
        }
        const lookup = this.scoreLookups[ability];
        let scoreBase = this.character['data']['stats'][lookup[0]]['value'];
        let scoreBonusInput = this.character['data']['bonusStats'][lookup[0]]['value'];
        let scoreBonus = Number.isInteger(scoreBonusInput) ? scoreBonusInput : 0;
        let modifiers = this.character['data']['modifiers'];
        let scoreModifier = 0;
        let scoreOverride = 0;
        for (let mod in modifiers){
            for (let item of modifiers[mod]){
                if (item['subType'] === lookup[1] && item['type'] === 'bonus'){
                    scoreModifier += item['value'];
                } else if (item['subType'] === lookup[1] && item['type'] === 'set'){
                    scoreOverride = item['value'];
                }
            }
        }
        return scoreOverride === 0 ? scoreBase + scoreBonus + scoreModifier : scoreOverride;
    }

    getTotalLevel() {
        if (this.character === undefined){
            return 0;
        }
        let level = 0;
        let classList = this.character['data']['classes'];
        for (let charClass of classList){
            level += charClass['level'];
        }
        return level;
    }

    getMaxHP() {
        if (this.character === undefined){
            return 0;
        }
        let baseHP = this.character['data']['baseHitPoints'];
        let conScore = this.getAbilityScore('CON');
        let conMod = this.calculateAbilityModifier(conScore);
        let level = this.getTotalLevel();
        let maxHP = baseHP + (level * conMod);
        return maxHP;
    }

    getCurrentHP() {
        if (this.character === undefined){
            return 0;
        }
        let maxHP = this.getMaxHP();
        let removedHP = this.character['data']['removedHitPoints'];
        this.tempHP = this.character['data']['temporaryHitPoints'];
        let bonusHPInput = this.character['data']['bonusHitPoints'];
        let bonusHP = Number.isInteger(bonusHPInput) ? bonusHPInput : 0;
        let hpRemaining = maxHP - removedHP + this.tempHP + bonusHP;
        return hpRemaining;
    }

    calcStandardAC() {
        if (this.character === undefined){
            return 0;
        }
        let AC = 0;
        let dexScore = this.getAbilityScore('DEX');
        let dexMod = this.calculateAbilityModifier(dexScore);
        this.character.data.inventory.forEach((item) => {
            if (item.equipped && item.definition.filterType === 'Armor'){
                switch (item.definition.armorTypeId){
                    case 1: // Light Armor
                        AC += item.definition.armorClass + dexMod;
                        break;
                    case 2: // Medium Armor
                        let dexBonus = Math.min(dexMod, 2);
                        AC += item.definition.armorClass + dexBonus;
                        break;
                    case 3: // Heavy Armor
                        AC += item.definition.armorClass;
                        break;
                    case 4: // Shield
                        AC += item.definition.armorClass;
                        if (item.definition.hasOwnProperty('grantedModifiers')) {
                            item.definition.grantedModifiers.forEach(modifier => {
                                if (modifier.subType === 'armor-class') {
                                    AC += modifier.value;
                                }
                            });
                        }
                        break;
                }
            }
        });

        if (AC === 0){
            AC = 10 + dexMod;
        }
        return AC;

    }

    calcBonusAC(){
        if (this.character === undefined){
            return 0;
        }
        let bonusAC = 0;
        const modifiers = this.character['data']['modifiers'];
        for (let mod in modifiers){
            for (let entry of modifiers[mod]){
                if (entry['type'] === 'bonus' && entry['subType'] === 'armor-class'){
                    bonusAC += entry['value'];
                }
            }
        }

        const characterValues = this.character['data']['characterValues'];
        for (let entry of characterValues) {
            if (entry['typeId'] === 3 && Number.isInteger(entry['value'])) {
                bonusAC += entry['value'];
            }
        }

        return bonusAC;
    }

    calcAC(){
        if (this.character === undefined){
            return 0;
        }
        let standardAC = this.calcStandardAC();
        let bonusAC = this.calcBonusAC();
        return standardAC + bonusAC;
    }
}

export default StatGrabber;

// let characters = [9239322, 29000862, 26208332, 8030631];
//
// characters.forEach(async (charId) => {
//     let character = new StatGrabber(charId);
//     await character.getCharacter();
//     console.log(character.character['data']['name']);
//     console.log('STR ' + character.getAbilityScore('STR'));
//     console.log('DEX ' + character.getAbilityScore('DEX'));
//     console.log('CON ' + character.getAbilityScore('CON'));
//     console.log('INT ' + character.getAbilityScore('INT'));
//     console.log('WIS ' + character.getAbilityScore('WIS'));
//     console.log('CHA ' + character.getAbilityScore('CHA'));
//     console.log('Level ' + character.getTotalLevel());
//     console.log('Max HP ' + character.getMaxHP());
//     console.log('Current HP ' + character.getCurrentHP());
//     console.log('AC ' + character.calcAC());
//     console.log('==========')
// });