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

    getRunningTunnelValue(oppositePlayers, destination) {
        let tunnelLength = this.player.definition.vision * 3;
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
        return tunnelValue;

    }

    getTeammatePositionValue(player, destination) {
        let positionValue = 0;
        if (player.isInAwayTeam) {
            positionValue = (player.positionX - destination.positionX) / 5;  // // jeżeli cel podania jest bliżej bramki, zwieksz wartosc podania o 1/5 odległości bliżej bramki, np jeżeli ziomek jest bliżej bramki o 250 px dodajemy maxa, czyli 50 pkt
        } else {
            positionValue = (destination.positionX - player.positionX) / 5;
        }
        if (positionValue > 50) {    // określenie maksymalnej wartości polożenia zawodnika
            positionValue = 50;
        }
        if (positionValue < -45) {
            positionValue = -45;                          // określenie minimalnej wartości
        }

        return positionValue;
    }


    getHighPassTunnelValue(oppositePlayers, destination) {
        let opponentDistanceLimit = 75; // poniżej tej wartości odległość przeciwnika od gracza i od celu wpływa na jego ocenę
        let tunnelValue = 30;  // wartość podania górą zawsze będzie mniej preferowana, niż podanie dołem (40 vs 50);
        let opponentDistanceFromPlayer = 0;
        let opponentDistanceFromDestination = 0;

        oppositePlayers.forEach((oppositePlayer) => {
            opponentDistanceFromPlayer = this.getDistanceFromTo(oppositePlayer, this.player);
            opponentDistanceFromDestination = this.getDistanceFromTo(oppositePlayer, destination);

            if (opponentDistanceFromPlayer < opponentDistanceLimit) {
                tunnelValue = tunnelValue - (opponentDistanceLimit - opponentDistanceFromPlayer);
            }

            if (opponentDistanceFromDestination < opponentDistanceLimit) {
                tunnelValue = tunnelValue - (opponentDistanceLimit - opponentDistanceFromDestination);
            }
        });
        if (tunnelValue < 0) {
            tunnelValue = 0;
        }
        tunnelValue = tunnelValue + this.getTeammatePositionValue(this.player, destination);   // zsumowanie pustości tunelu z atrakcyjnością pozycji adresata
        return tunnelValue;
    }

    getLowPassTunnelValue(oppositePlayers, destination) {
        let opponentDistanceLimit = 40; // poniżej tej wartości odległość przeciwnika od tunelu wpływa na jego ocenę
        let tunnelValue = 50;

        let a = this.getDistanceFromTo(this.player, destination); // boki trójkąta gracz - cel
        let b = 0;                                                // gracz - przeciwnik
        let c = 0;                                                // cel - przeciwnik

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
                halfOfTrianglePerimeter = (a + b + c) / 2;
                triangleField = Math.sqrt(halfOfTrianglePerimeter * (halfOfTrianglePerimeter - a) * (halfOfTrianglePerimeter - b) * (halfOfTrianglePerimeter - c));
                triangleHeight = 2 * triangleField / a;
                if (triangleHeight < opponentDistanceLimit) {
                    tunnelValue = tunnelValue - (opponentDistanceLimit - triangleHeight);    // zmniejszamy wartość kanału o współczynnik bliskości przeciwnika do kanału
                }
            }
            if (tunnelValue <= 0) {
                tunnelValue = 0;
            }
        });

        if (0 < tunnelValue + this.getTeammatePositionValue(this.player, destination)) {
            tunnelValue = tunnelValue + this.getTeammatePositionValue(this.player, destination);
        } else {
            tunnelValue = 0;
        }

        console.log(destination.definition.name,tunnelValue);
        return tunnelValue;

    }

}
