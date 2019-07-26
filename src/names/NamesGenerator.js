import * as faker from 'faker/locale/pl';

export default class NamesGenerator {
    static generateName() {
        let firstName = faker.name.firstName('male');
        let lastName = faker.name.lastName('male');

        return `${firstName} ${lastName}`;
    }
}
