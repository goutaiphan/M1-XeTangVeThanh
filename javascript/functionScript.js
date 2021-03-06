export {result, moveTank, getPosition, getLocation}
import {
    baseDistance, minLocation, maxLocation,
    mapArea, tank, castle
} from "./baseScript.js";

let tankPosition = localStorage.getItem('tankPosition');
let castlePosition = localStorage.getItem('castlePosition');
let bombPosition = localStorage.getItem('bombPosition');
tankPosition = JSON.parse(tankPosition);
castlePosition = JSON.parse(castlePosition);
bombPosition = JSON.parse(bombPosition);

let explosionAudio = document.getElementById('explosionAudio');
explosionAudio.playbackRate = 1.2;
explosionAudio.volume = 0.5;
let victoryAudio = document.getElementById('victoryAudio');
victoryAudio.volume = 0.5;

function result() {
    for (let i = 0; i < bombPosition.length; i++) {
        if (String(tankPosition) === String(bombPosition[i])) {
            let explosion = document.createElement('div');
            explosion.className = 'mapZone explosion';
            explosion.style.left = getLocation(tankPosition[0]);
            explosion.style.top = getLocation(tankPosition[1]);
            mapArea.removeChild(tank);
            mapArea.appendChild(explosion);
            explosionAudio.play();
        }
    }

    if (String(tankPosition) === String(castlePosition)) {
        let firework = document.createElement('div');
        firework.className = 'mapZone firework';
        firework.style.left = getLocation(tankPosition[0]);
        firework.style.top = getLocation(tankPosition[1]);
        mapArea.removeChild(tank);
        mapArea.removeChild(castle);
        mapArea.appendChild(firework);
        victoryAudio.play();
    }
}

function moveTank(key) {
    if (mapArea.contains(tank)) {
        let boundary, distance;
        if (key === 'ArrowUp' || key === 'ArrowLeft') {
            boundary = minLocation;
            distance = -baseDistance;
        } else {
            boundary = maxLocation;
            distance = baseDistance;
        }

        if (key === 'ArrowUp' || key === 'ArrowDown') {
            tank.style.top = tank.style.top === boundary
                ? tank.style.top
                : parseInt(tank.style.top) + distance + 'px';
        } else {
            tank.style.left = tank.style.left === boundary
                ? tank.style.left
                : parseInt(tank.style.left) + distance + 'px';
        }
        tankPosition = [getPosition(tank.style.left), getPosition(tank.style.top)];
        localStorage.setItem('tankPosition', JSON.stringify(tankPosition))
        result();

        let control = document.getElementsByClassName(key.replace('Arrow', 'arrow'))[0];
        control.classList.add('active');
        setTimeout(function () {
            control.classList.remove('active');
        }, 100);
    }
}

function getLocation(position) {
    return (parseInt(minLocation) + baseDistance * position) + 'px';
}

function getPosition(location) {
    return (parseInt(location) - parseInt(minLocation)) / baseDistance;
}