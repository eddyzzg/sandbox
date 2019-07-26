import FaceGenerator from "../faces/FaceGenerator";

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
    }

    /**
     * @param {String} text
     */
    showTextInHTML(text) {
        this.$workspace.append(`<h1>${text}</h1><button id="faceGen">Generuj morde</button>`); //tak kozystasz ze zmiennych klasowych

        this.$workspace.find('#faceGen').click(() => {
            this.showAvatar(FaceGenerator.generateFace());
        });
    }

    /**
     * @param {String} svg
     */
    showAvatar(svg) {
        let html = `<div class="avatar-container">${svg}</div>`;
        let $avatarContainer = this.$workspace.find('.avatar-container');
        if ($avatarContainer.length) {
            $avatarContainer.empty();
            $avatarContainer.html(svg);
        } else {
            this.$workspace.append(html);
        }
    }
}
