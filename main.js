const jsControlled = document.getElementById('js-controlled');

jsControlled.innerHTML = 'Successfully controlled by JavaScript!';

let app = new PIXI.Application({
    width: 232,
    height: 232,
});

const gameContainer = document.getElementById('game-container');
gameContainer.querySelector('.loading').remove();
gameContainer.appendChild(app.view);

const petCount = document.getElementById('pet-count');
let petCounter = 0;
const missCount = document.getElementById('miss-count');
let missCounter = 0;

function petCountMessage() {
    return `Pet count: ${petCounter}`;
}

function missCountMessage() {
    return `Miss count: ${missCounter}`;
}

// Pet the cat
gameContainer.addEventListener('mousedown', () => {
    gameContainer.style.cursor = 'grabbing';
});

gameContainer.addEventListener('mouseup', () => {
    gameContainer.style.cursor = 'grab';
});

function didPetCat(cat, x, y) {
    console.log(`Cat: ${cat.x}, ${cat.y}`);
    console.log(`Hand: ${x}, ${y}`);
    return x >= cat.x && x <= cat.x + 32 && y >= cat.y && y <= cat.y + 32;
}

gameContainer.addEventListener('click', (event) => {
    hand_x = event.offsetX;
    hand_y = event.offsetY;
    if (didPetCat(kitten, hand_x, hand_y)) {
        console.log('Pet the cat!');
        petCounter++;
        petCount.innerHTML = petCountMessage();
    } else {
        console.log('Missed the cat!');
        missCounter++;
        missCount.innerHTML = missCountMessage();
    }
});

let kitten = PIXI.Sprite.from('./assets/cat_sprite_32px.png');
app.stage.addChild(kitten);

let elapsed = 0.0;
app.ticker.add((delta) => {
    elapsed += delta;
    kitten.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    kitten.y = 100.0 + Math.sin(elapsed / 50.0) * 100.0;
});
