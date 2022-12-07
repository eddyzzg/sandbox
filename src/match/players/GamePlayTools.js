export default class GamePlayTools {
    constructor(player) {
        this.player = player;
    }
    
    getDistanceFromTo(object1, object2) {
        let deltaX = object1.positionX - object2.positionX;
        let deltaY = object1.positionY - object2.positionY;
        // if (deltaX + deltaY < 1) {
        //     return 0;
        // }
        return Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    }
    
    getRunningDestinations(player, destination, r) {
        let runningDestinations = [];
        const thirdTrianglePoint = {   // opisanie trójkąta gracz-cel-ośY bokami a b c   \/
            positionX: player.positionX + r,
            positionY: player.positionY
        };
        let a = r;
        let b = r;
        let c = this.getDistanceFromTo(destination, thirdTrianglePoint);
        
        let angle = Math.round(this.convertToDegrees(Math.acos((a * a + b * b - c * c) / (2 * a * b))));    // wyliczenie kąta między a i b
        let originalAngle = angle;    // zapisujemy oryginalny kąt między celem a osią Y, aby później użyć go w ocenie atrakcyjności kanału
        let isBelowTarget = 1;
        if (player.positionY > destination.positionY) {     // zmienna nadająca znak + lub - odchyleniu celu biegu na osi Y wyliczanemu z funkcji sin poniżej
            isBelowTarget = -1;
        }
        
        for (let i = 0; i < 18; i++) {    // wyznaczenie 18 kierunków biegu
            runningDestinations[i] = {
                positionX: Math.round(player.positionX + r * Math.cos(this.convertToRadians(angle))),
                positionY: Math.round(player.positionY + r * isBelowTarget * Math.sin(this.convertToRadians(angle))),
                angle: angle,
                originalAngle: originalAngle
            };
            if (angle > 340) {
                angle = angle - 340;
            }
            angle = angle + 20;      // zwiększenie kąta o 1/18 okręgu, tj 20 stopni
        }
        return runningDestinations;
    }
    
    convertToRadians(angle) {
        return (angle * Math.PI / 180)
    }
    
    convertToDegrees(radians) {
        return (radians * 180 / Math.PI);
    }
    
    getTunnelValue(oppositePlayers, destination) {
        let tunnelLength = 150; // TODO - ustalić długość tunelu w zależności od skilla zawodnika
        let opponentDistance = 75; // poniżej tej wartości odległość przeciwnika od tunelu wpływa na jego ocenę
        
        let a = this.getDistanceFromTo(this.player, destination); // boki trójkąta gracz - cel
        let b = 0;                                                // gracz - przeciwnik
        let c = 0;                                                // cel - przeciwnik
        let tunnelValue = 100;
        
        destination.angle = destination.angle - destination.originalAngle;
        if (destination.angle > 180) {
            destination.angle = 360 - destination.angle;
        }
    
        /**
          *  Odjęcie od atrakcyjności tunelu połowy odchylenia od celu w stopniach
          *  np odchylenie 0 ->   atracyjność 100
          *  odchylenie 90 ->     atrakcyjność 100 - 90/2 = 55
          *  odchylenie 180 ->    atrakcyjność 100 - 180/2 = 10
          **/
        tunnelValue = tunnelValue - Math.abs(destination.angle / 2);
        
        /**
         * zmienne potrzebne do wyliczenia wysokości trójkąta gracz - przeciwnik - cel
         **/
        let halfOfTrianglePerimeter = 0;
        let triangleField = 0;
        let triangleHeight = 50;
        
        oppositePlayers.forEach((oppositePlayer) => {
            b = this.player.getDistanceTo(oppositePlayer);
            c = this.getDistanceFromTo(oppositePlayer, destination);
            if (b < a && c < a) {                                       // nie bierzemy pod uwagę przeciwników umiejscowionych dalej od gracza i celu, niż gracz i cel są oddaleni od siebie
                if (b < tunnelLength) {                                 // ograniczenie długości tunelu TODO podzielić tunel i dodać ważone oceny w zależności od odłegłości od gracza
                    halfOfTrianglePerimeter = (a + b + c) / 2;
                    triangleField = Math.sqrt(halfOfTrianglePerimeter * (halfOfTrianglePerimeter - a) * (halfOfTrianglePerimeter - b) * (halfOfTrianglePerimeter - c));
                    triangleHeight = 2 * triangleField / a;
                    if (triangleHeight < opponentDistance) {
                        tunnelValue = tunnelValue - (opponentDistance - triangleHeight);
                    }
                }
            }
            if (tunnelValue <= 0) {
                tunnelValue = 0;
            }
        });
        // console.log(destination);
        // console.log("value: ",tunnelValue," coordinates: ",destination.positionX,destination.positionY);
        return tunnelValue;
        
    }
    
}
