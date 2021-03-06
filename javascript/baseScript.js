export {
    dimension, baseDistance, minLocation, maxLocation,
    mapArea, tank, castle
};
import {getLocation, moveTank} from "./functionScript.js";

let width = Math.min(screen.width, screen.height);
let widthRatio = width <= 500
    ? width / 500 * 1.1
    : 1.3;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.transform = `scale(${widthRatio})`;
    document.body.style.paddingTop = 20 * widthRatio + 'px';
} else {
    document.body.style.paddingTop = 30 * widthRatio + 'px';
}

let mapArea = document.getElementById('mapArea');
let dimension = 5,
    baseDistance = 65,
    minLocation = '2px',
    maxLocation = getLocation(dimension - 1);

let table = document.createElement('table');
mapArea.appendChild(table);
for (let i = 0; i < dimension; i++) {
    let row = document.createElement('tr');
    table.appendChild(row);

    for (let i = 0; i < dimension; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell)
    }
}

let tankPosition = [0, 0];
localStorage.setItem('tankPosition', JSON.stringify(tankPosition));
let tank = document.createElement('div');
tank.className = 'mapZone tank';
tank.style.top = getLocation(tankPosition[0]);
tank.style.left = getLocation(tankPosition[1]);
mapArea.appendChild(tank);

let castlePosition = [dimension - 1, dimension - 1];
localStorage.setItem('castlePosition', JSON.stringify(castlePosition));
let castle = document.createElement('div');
castle.className = 'mapZone castle';
castle.style.top = getLocation(castlePosition[0]);
castle.style.left = getLocation(castlePosition[1]);
mapArea.appendChild(castle);

let bombPosition = [[0, 1], [1, 3], [3, 2], [4, 0], [3, 4]];
localStorage.setItem('bombPosition', JSON.stringify(bombPosition));
for (let i = 0; i < bombPosition.length; i++) {
    let bomb = document.createElement('div');
    bomb.className = 'mapZone bomb';
    bomb.style.left = getLocation(bombPosition[i][0]);
    bomb.style.top = getLocation(bombPosition[i][1]);
    mapArea.appendChild(bomb);
}

let arrowName = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
let controlArea = document.getElementById('controlArea');
for (let i = 0; i < arrowName.length; i++) {
    let arrow = document.createElement('div');
    arrow.className = 'controlZone ' + arrowName[i].replace('Arrow','arrow');
    arrow.onclick = function () {
        moveTank(arrowName[i]);
    };
    controlArea.appendChild(arrow);
}

let circle = document.createElement('div');
circle.className = 'circle';
controlArea.appendChild(circle);

window.onkeydown = function (event) {
    arrowName.includes(event.key)
        ? moveTank(event.key)
        : event.preventDefault();
}