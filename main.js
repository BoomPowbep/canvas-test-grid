document.addEventListener('DOMContentLoaded', (e) => {

    const canvas = document.getElementById("gameFrame");
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    canvas.addEventListener("mouseup", (e) => {
        let mouseX = e.clientX,
            mouseY = e.clientY;

        console.log(mouseX, mouseY);
    });

    const nbCubesVisible = 15;
    const nbCubesTotal = 15;

    const cubeSide = window.innerWidth / nbCubesVisible;

    let xOffset = 0;
    let yOffset = 0;

    class MapTile {
        constructor({
                        color = undefined,
                        spritePath = undefined,
                        position = {x: 0, y: 0}
                    }) {
            this.color = color;

            if (spritePath) {
                this.spritePath = spritePath;
                this.sprite = new Image();
                this.sprite.src = this.spritePath;
            }

            this.animated = false;
            this.spriteArray = undefined;
            this.position = position;
        }
    }

    let mapNumbers = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let displayedMap = [[]];

    buildMap();

    function buildMap() {
        for (let i = 0; i < nbCubesTotal; i++) {
            displayedMap[i] = [];
            for (let j = 0; j < nbCubesTotal; j++) {
                const tile = mapNumbers[j][i];

                if(tile === 0) {
                    displayedMap[i][j] = new MapTile({
                        spritePath: 'sprites/land.png',
                        position: {x: i, y: j}
                    });
                }
                else if(tile === 1) {
                    displayedMap[i][j] = new MapTile({
                        spritePath: 'sprites/road.png',
                        position: {x: i, y: j}
                    });
                }
            }
        }
    }

    // generateRandomMap();

    function generateRandomMap() {
        for (let i = 0; i < nbCubesTotal; i++) {
            displayedMap[i] = [];
            for (let j = 0; j < nbCubesTotal; j++) {
                if (Math.round(Math.random())) {
                    displayedMap[i][j] = new MapTile({
                        spritePath: 'sprites/land.png',
                        position: {x: i, y: j}
                    });
                } else {
                    displayedMap[i][j] = new MapTile({
                        color: `rgba(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)}, 1)`,
                        position: {x: i, y: j}
                    });
                }
            }
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function renderMap() {
        for (let i = 0; i < nbCubesTotal; i++) {
            for (let j = 0; j < nbCubesTotal; j++) {
                const tile = displayedMap[i][j];
                const tilePos = {x: tile.position.x * cubeSide + xOffset, y: tile.position.y * cubeSide + yOffset};

                if (tile.color) {
                    ctx.fillStyle = tile.color;
                    ctx.fillRect(tilePos.x, tilePos.y, cubeSide, cubeSide);
                } else if (tile.sprite) {
                    ctx.drawImage(tile.sprite, tilePos.x, tilePos.y, cubeSide, cubeSide);
                }

            }
        }
    }

    requestAnimationFrame(render);


    function render(timestamp) {

        renderMap();

        requestAnimationFrame(render);
    }

});
