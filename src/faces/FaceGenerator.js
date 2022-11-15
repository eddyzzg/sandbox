/* import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-male-sprites';

export default class FaceGenerator {
    static generateFace() {
        let avatars = new Avatars(sprites());
        return avatars.create(getRandomValue());
    }
}


function getRandomValue() {
    return new Date().getTime().toString();
}*/


//import playerHBS from '../../squad/player.hbs';
import faceHBS from './FaceGenerator.hbs';



export default class Face {


    constructor(faceSeed,id) {
        this.faceSeed = faceSeed;
        this.faceElementSize = 20;
        this.id = id;

        this.headSpriteOffset = 0;
        this.eyesSpriteOffset = 0;
        this.eyebrowsSpriteOffset = 0;
        this.moustacheSpriteOffset = 0;
        this.mouthSpriteOffset = 0;
        this.hairSpriteOffset = 0;
    }


    generateFace() {
    }

    getSpritesNumber(facePart) {

        let faceElementSize = this.faceElementSize;
        const sprite = new Image();
        sprite.src = "../src/faces/img/"+facePart+".png";
        sprite.onload = function() {
            return sprite.width/faceElementSize;
        };
    }


    renderFace() {
        const $faceContainer = $("body .face-container");

  //      let headSpriteNumber = new Promise(this.getSpritesNumber('head',resolve, reject));


        // this.headSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('head'))))*this.faceElementSize*-1;
        // this.eyesSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('eyes'))))*this.faceElementSize*-1;
        // this.eyebrowsSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('eyebrows'))))*this.faceElementSize*-1;
        // this.mouthSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('mouth'))))*this.faceElementSize*-1;
        // this.moustacheSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('moustache'))))*this.faceElementSize*-1;
        // this.hairSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('hair'))))*this.faceElementSize*-1;

        this.headSpriteOffset = Math.floor((Math.random()*(1)))*this.faceElementSize*-1;
        this.eyesSpriteOffset = Math.floor((Math.random()*(9)))*this.faceElementSize*-1;
        this.eyebrowsSpriteOffset = Math.floor((Math.random()*(28)))*this.faceElementSize*-1;
        this.mouthSpriteOffset = Math.floor((Math.random()*(26)))*this.faceElementSize*-1;
        this.moustacheSpriteOffset = Math.floor((Math.random()*(35)))*this.faceElementSize*-1;
        this.hairSpriteOffset = Math.floor((Math.random()*(36)))*this.faceElementSize*-1;



        $faceContainer.append(faceHBS(this));
    }

    getTemplate() {
        return faceHBS;
    }
}

