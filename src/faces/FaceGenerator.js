import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-male-sprites';

export default class FaceGenerator {
    static generateFace() {
        let avatars = new Avatars(sprites());
        let randomValue = new Date().getTime().toString();
        return avatars.create(randomValue);
    }
}
