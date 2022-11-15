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
        this.skinBrightness = 100;
        this.headSpriteOffset = 0;
        this.eyesSpriteOffset = 0;
        this.eyebrowsSpriteOffset = 0;
        this.moustacheSpriteOffset = 0;
        this.mouthSpriteOffset = 0;
        this.hairSpriteOffset = 0;
        this.hairBrightness= 100;
        this.hairHue= 0;
        this.moustacheHue= 0;
        this.moustacheBrightness = 100;

    }


    generateFace() {
        this.skinBrightness = Math.ceil(Math.random()*5)*20;
        this.moustacheBrightness = Math.ceil(Math.random()*3)*20;

        if (Math.random()>0.2) {
            this.hairHue = 50 + Math.ceil(Math.random()*5)*5;
            this.hairBrightness = this.hairHue*2;
        } else {
            this.hairBrightness = Math.ceil(Math.random()*5)*20;
            this.hairHue = Math.ceil(Math.random()*9)*40;
        }

        this.moustacheHue =  10 + Math.ceil(Math.random()*4)*10;
        this.headSpriteOffset = Math.floor((Math.random()*(1)))*this.faceElementSize*-1;
        this.eyesSpriteOffset = Math.floor((Math.random()*(18)))*this.faceElementSize*-1;
        this.eyebrowsSpriteOffset = Math.floor((Math.random()*(28)))*this.faceElementSize*-1;
        this.mouthSpriteOffset = Math.floor((Math.random()*(39)))*this.faceElementSize*-1;
        this.moustacheSpriteOffset = Math.floor((Math.random()*(35)))*this.faceElementSize*-1;
        this.hairSpriteOffset = Math.floor((Math.random()*(36)))*this.faceElementSize*-1;

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


this.generateFace();
        $faceContainer.append(faceHBS(this));
        this.generateFace();
        $faceContainer.append(faceHBS(this));
        this.generateFace();
        $faceContainer.append(faceHBS(this));
        this.generateFace();
        $faceContainer.append(faceHBS(this));
        this.generateFace();
        $faceContainer.append(faceHBS(this));
        this.generateFace();
        $faceContainer.append(faceHBS(this));
        this.generateFace();
        $faceContainer.append(faceHBS(this));
    }


    getTemplate() {
        return faceHBS;
    }
}

