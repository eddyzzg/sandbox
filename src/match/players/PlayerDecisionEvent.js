export const DECISION = {
    MOVE: 'move',
    PASS: 'pass',
    SHOT: 'shot',
};

export default class PlayerDecisionEvent {
    constructor(player, homeTeam, awayTeam) {
        this.player = player;
        this.awayTeam = awayTeam;
        this.homeTeam = homeTeam;
        //       this.maxIndex = 100;
    }

    //diagnostic functionality
    // validator() {
    //     let possibilitySum = this.getPossibilityOfMove() + this.getPossibilityOfPass() + this.getPossibilityOfShoot();
    //     if (possibilitySum !== this.maxIndex) {
    //         alert('Sum of possibility not equal to max possibility !');
    //     }
    // }

    run() {
        const {moveRange, passRange, shootRange} = this.createRanges();
        const randomIndex = Math.round(Math.random() * shootRange.max);

        if (randomIndex >= moveRange.min && randomIndex <= moveRange.max) {
            return DECISION.MOVE;
        }
        if (randomIndex > passRange.min && randomIndex <= passRange.max) {
            return DECISION.PASS;
        }
        if (randomIndex > shootRange.min && randomIndex <= shootRange.max) {
            return DECISION.SHOT;
        }
    }

    createRanges() {
        const moveRange = {
            min: 0,
            max: this.getPossibilityOfMove()
        };
        const passRange = {
            min: moveRange.max,
            max: moveRange.max + this.getPossibilityOfPass()
        };
        const shootRange = {
            min: passRange.max,
            max: passRange.max + this.getPossibilityOfShoot()
        }
        return {moveRange, passRange, shootRange};
    }

    getPossibilityOfMove() {
        if (this.player.hasBall) {
            if (this.player.isInAwayTeam) {
                return this.getBestRunningDestination(this.homeTeam);
            } else {
                return this.getBestRunningDestination(this.awayTeam)
            }
        } else
            return 10;
    }


    getBestRunningDestination(oppositePlayers) {
        const goalCenterCoordinates = {
            positionX: 0,
            positionY: 0
        };
        if (this.player.isInAwayTeam) {
            goalCenterCoordinates.positionX = this.player.field.homeGoalX;
            goalCenterCoordinates.positionY = this.player.field.homeGoalY + this.player.field.goalHeight / 2;
        } else {
            goalCenterCoordinates.positionX = this.player.field.awayGoalX;
            goalCenterCoordinates.positionY = this.player.field.awayGoalY + this.player.field.goalHeight / 2;
        }

        let bestTunnelValue = 0;
        let r = this.player.getDistanceTo(goalCenterCoordinates);

        let runningDestinations = this.getRunningDestinations(this.player, goalCenterCoordinates, r);

        runningDestinations.forEach((destination) => {
            if (bestTunnelValue < this.getTunnelValue(oppositePlayers, destination)) {
                bestTunnelValue = this.getTunnelValue(oppositePlayers, destination);
                this.player.destinationX = destination.positionX;
                this.player.destinationY = destination.positionY;

            }
        });

        return bestTunnelValue;
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
        tunnelValue = tunnelValue - Math.abs(destination.angle / 2);     // odjęcie od atrakcyjności tunelu połowy odchylenia od celu w stopniach
                                                                            // np odchylenie 0 ->   atracyjność 100
                                                                            // odchylenie 90 ->     atrakcyjność 100 - 90/2 = 55
                                                                            // odchylenie 180 ->    atrakcyjność 100 - 180/2 = 10

        let halfOfTrianglePerimeter = 0;            // zmienne potrzebne do wyliczenia wysokości trójkąta gracz - przeciwnik - cel
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


    getPossibilityOfPass() {
        if (this.player.hasBall) {
            return 0;   // diagnostics
        }
        return 0;
    }

    getPossibilityOfShoot() {
        return 0;  // diagnostics
        if (this.player.hasBall) {
            let field = this.player.field;
            let awayGoal = {positionX: field.awayGoalX, positionY: field.awayGoalY};
            let homeGoal = {positionX: field.homeGoalX, positionY: field.homeGoalY};
            let distance = 0;

            if (this.player.isInAwayTeam) {
                distance = ((field.width / 2) - (this.player.getDistanceTo(homeGoal))) / 6;
                if (distance < 0) {
                    distance = 0;
                }
                return distance;

            } else if (!this.player.isInAwayTeam) {
                distance = ((field.width / 2) - (this.player.getDistanceTo(awayGoal))) / 6;
                if (distance < 0) {
                    distance = 0;
                }
                return distance;
            }
        }
        return 0;
    }

}
