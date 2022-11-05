import names from './names';
import surnames from './surnames';

export default class NamesGenerator {
    static generateName() {
        const firstName = getRandomValue(names);
        let lastName = getRandomValue(surnames).toLowerCase();

        const word = lastName

        const firstLetter = word.charAt(0)

        const firstLetterCap = firstLetter.toUpperCase()

        const remainingLetters = word.slice(1)

        const capitalizedWord = firstLetterCap + remainingLetters

        lastName = capitalizedWord;
        return `${firstName} ${lastName}`;
    }
}

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
