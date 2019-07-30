import names from './names';
import surnames from './surnames';

export default class NamesGenerator {
    static generateName() {
        const firstName = getRandomValue(names);
        const lastName = getRandomValue(surnames);

        return `${firstName} ${lastName}`;
    }
}

function getRandomValue(arr) {
debugger
    return arr[Math.floor(Math.random() * arr.length)]
}
