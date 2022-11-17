import faceHBS from './FaceGenerator.hbs';

export default class Face {

    constructor(id,shirtColor,shortsColor) {

        this.faceElementSize = 20;
        this.id = id;
        this.headSpriteOffset = 0;
        this.eyesSpriteOffset = 0;
        this.eyebrowsSpriteOffset = 0;
        this.moustacheSpriteOffset = 0;
        this.mouthSpriteOffset = 0;
        this.hairSpriteOffset = 0;
        this.shortsColor = shortsColor;
        this.shirtColor = shirtColor;

        // Paleta 30 retro kolorów generowanych z czarnych .png
        this.colorFilterArray = ["",
         "filter: invert(43%) sepia(78%) saturate(305%) hue-rotate(332deg) brightness(96%) contrast(94%);",
        "filter: invert(14%) sepia(6%) saturate(3146%) hue-rotate(282deg) brightness(97%) contrast(90%);",
        "filter: invert(75%) sepia(9%) saturate(1231%) hue-rotate(341deg) brightness(100%) contrast(93%);",
        "filter: invert(26%) sepia(6%) saturate(3703%) hue-rotate(316deg) brightness(101%) contrast(94%);",
        "filter: invert(40%) sepia(25%) saturate(2051%) hue-rotate(330deg) brightness(87%) contrast(94%);",
        "filter: brightness(0) saturate(100%) invert(54%) sepia(56%) saturate(585%) hue-rotate(335deg) brightness(89%) contrast(87%);",
        "filter: invert(80%) sepia(32%) saturate(876%) hue-rotate(322deg) brightness(94%) contrast(90%);",
        "filter: invert(69%) sepia(35%) saturate(940%) hue-rotate(346deg) brightness(103%) contrast(99%);",
        "filter: brightness(0) saturate(100%) invert(100%) sepia(28%) saturate(5246%) hue-rotate(319deg) brightness(106%) contrast(108%);",
        "filter: invert(17%) sepia(73%) saturate(2435%) hue-rotate(335deg) brightness(95%) contrast(92%);",
        "filter: invert(45%) sepia(50%) saturate(1385%) hue-rotate(319deg) brightness(82%) contrast(124%);",
        "filter: invert(69%) sepia(43%) saturate(6754%) hue-rotate(347deg) brightness(101%) contrast(94%);",
        "filter: brightness(0) saturate(100%) invert(61%) sepia(44%) saturate(642%) hue-rotate(63deg) brightness(106%) contrast(81%);",
        "filter: invert(45%) sepia(14%) saturate(1567%) hue-rotate(77deg) brightness(98%) contrast(90%);",
        "filter: invert(45%) sepia(14%) saturate(1567%) hue-rotate(77deg) brightness(98%) contrast(90%);",
        "filter: invert(17%) sepia(23%) saturate(1114%) hue-rotate(135deg) brightness(94%) contrast(89%);",
        "filter: invert(23%) sepia(55%) saturate(1866%) hue-rotate(188deg) brightness(90%) contrast(92%);",
        "filter: invert(45%) sepia(86%) saturate(2072%) hue-rotate(168deg) brightness(91%) contrast(101%);",
        "filter: invert(87%) sepia(9%) saturate(5440%) hue-rotate(143deg) brightness(97%) contrast(97%);",
        "filter: invert(90%) sepia(91%) saturate(34%) hue-rotate(201deg) brightness(106%) contrast(100%);",
        "filter: invert(92%) sepia(4%) saturate(2109%) hue-rotate(185deg) brightness(93%) contrast(85%);",
        "filter: invert(76%) sepia(2%) saturate(3177%) hue-rotate(178deg) brightness(77%) contrast(115%);",
        "filter: invert(42%) sepia(30%) saturate(438%) hue-rotate(182deg) brightness(89%) contrast(90%);",
        "filter: invert(22%) sepia(5%) saturate(5186%) hue-rotate(190deg) brightness(98%) contrast(84%);",
        "filter: brightness(0) saturate(100%) invert(11%) sepia(52%) saturate(734%) hue-rotate(193deg) brightness(92%) contrast(84%);",
        "filter: invert(13%) sepia(92%) saturate(6656%) hue-rotate(340deg) brightness(101%) contrast(105%);",
        "filter: invert(25%) sepia(11%) saturate(3152%) hue-rotate(248deg) brightness(93%) contrast(85%);",
        "filter: invert(42%) sepia(12%) saturate(2267%) hue-rotate(274deg) brightness(96%) contrast(98%);",
        "filter: invert(56%) sepia(88%) saturate(479%) hue-rotate(309deg) brightness(98%) contrast(97%);",];


        this.shirtColor=this.colorFilterArray[shirtColor];
        this.shortsColor=this.colorFilterArray[shortsColor];
        this.bodyColor="";
        this.hairColor="";
        this.moustacheColor="";
        this.eyebrowsColor="";
    }


    generatePlayerAvatarParameters() {

        let bodyColor=1+Math.floor(Math.random()*3);
        let moustacheColor=Math.floor(Math.random()*7)
        let hairColor=Math.floor(Math.random()*8);

       if (bodyColor===moustacheColor){
           moustacheColor=0;
           bodyColor=3;
       }
        if (bodyColor===hairColor){
            hairColor=1;
            bodyColor=3;
        }
        if (moustacheColor===3) {
            moustacheColor=0;
        }
        if (hairColor===3) {
            hairColor=0;
        }

        if (Math.random()>0.3) {
            hairColor=Math.floor(Math.random()*10);
        } else {
            hairColor=Math.floor(Math.random()*30);
        }

        this.hairColor=this.colorFilterArray[hairColor];
        this.moustacheColor=this.colorFilterArray[moustacheColor];
        this.eyebrowsColor=this.colorFilterArray[moustacheColor];
        this.bodyColor=this.colorFilterArray[bodyColor];

        this.headSpriteOffset = Math.floor((Math.random()*(3)))*this.faceElementSize*-1;
        this.eyesSpriteOffset = Math.floor((Math.random()*(18)))*this.faceElementSize*-1;
        this.eyebrowsSpriteOffset = Math.floor((Math.random()*(28)))*this.faceElementSize*-1;
        this.mouthSpriteOffset = Math.floor((Math.random()*(39)))*this.faceElementSize*-1;
        this.moustacheSpriteOffset = Math.floor((Math.random()*(50)))*this.faceElementSize*-1;
        this.hairSpriteOffset = Math.floor((Math.random()*(43)))*this.faceElementSize*-1;
    }


    getSpritesNumber(facePart) {
        let faceElementSize = this.faceElementSize;
        const sprite = new Image();
        sprite.src = "../src/faces/img/"+facePart+".png";
        sprite.onload = function() {
            return sprite.width/faceElementSize;
        };
    }


  //   renderFace($container) {
  //
  //
  // //      let headSpriteNumber = new Promise(this.getSpritesNumber('head',resolve, reject));
  //       // this.headSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('head'))))*this.faceElementSize*-1;
  //       // this.eyesSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('eyes'))))*this.faceElementSize*-1;
  //       // this.eyebrowsSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('eyebrows'))))*this.faceElementSize*-1;
  //       // this.mouthSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('mouth'))))*this.faceElementSize*-1;
  //       // this.moustacheSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('moustache'))))*this.faceElementSize*-1;
  //       // this.hairSpriteOffset = Math.floor((Math.random()*(this.getSpritesNumber('hair'))))*this.faceElementSize*-1;
  //
  //
  //       this.generateFace();
  //       $container.append(faceHBS(this));
  //
  //   }


    getTemplate() {
        return faceHBS;
    }


}

