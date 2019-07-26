import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-male-sprites';

export default class FaceGenerator {
    static generateFace() {
        let avatars = new Avatars(sprites());
        return avatars.create(getRandomValue());
    }
}

/**
 * @return {String}
 */
function getRandomValue() {
    return new Date().getTime().toString();
}
