import FaceGenerator from "../faces/FaceGenerator";
import NamesGenerator from "../names/NamesGenerator";

export default class Sandbox {

    /**
     * @param {jQuery} $workspace
     */
    constructor($workspace) {
        console.log('W tym momentcie masz zinstancjonowany plik');

        this.$workspace = $workspace; //tak przypisujesz zmienna z parametru do przestrzeni klasy

        this.isInit = false; //tak deklarujesz zmienne w przestrzeni klasy

        this.init(); // tak wywolujesz metody z klasy
    }

    init() {
        console.log('Teraz wywolales metode init klasy Sandbox');

        this.$workspace.find('#faceGen').click(() => {
            this.showFace(FaceGenerator.generateFace());
        });
        this.$workspace.find('#nameGen').click(() => {
            let nameString = NamesGenerator.generateName();
            this.showName(nameString);
        });
    }

    /**
     * @param {String} text
     */
    showTextInHTML(text) {
        this.$workspace.find(`.title-container`).html(`${text}`);  //tak kozystasz ze zmiennych klasowych
    }

    /**
     * @param {String} svg
     */
    showFace(svg) {
        this.$workspace.find('.face-container').html(svg);
    }

    showName() {
        const name = NamesGenerator.generateName();
    debugger
        this.$workspace.find('.name-container').html(`<input class="name" value="${name}">`);
    }
}
