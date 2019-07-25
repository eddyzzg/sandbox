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
    showSomeTextInHTML(text) {
        this.$workspace.append(`<h1>${text}</h1>`); //tak kozystasz ze zmiennych klasowych
    }
}
