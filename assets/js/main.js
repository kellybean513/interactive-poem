const towerLines = document.querySelectorAll(".tower .line");
const rubble = document.querySelector(".rubble");
const announcer = document.getElementById("announcer");

// Tracks where we are in the poem:
let step = 0;

function announce(text) {
    announcer.textContent = text;
}

// Reveals the first line. Used on page load and after each restart.
// Adding the "show" class triggers the CSS fade/slide-in transition.
function showFirstLine() {
    towerLines[0].classList.add("show");
    announce(towerLines[0].textContent);
}

// Moves the poem forward one step each time the user clicks or presses a key
function advance() {
    step++;

    if (step < towerLines.length) {     // Steps 1-3: reveal the next line of the tower
        towerLines[step].classList.add("show");
        announce(towerLines[step].textContent);

    } else if (step === towerLines.length) {     // Step 4: collapse the tower and reveal the rubble
        towerLines.forEach(function (line) {
            line.classList.remove("show");
            line.classList.add("fall");
        });
        rubble.classList.add("show");
        announce(rubble.textContent);

    } else {     // Step 5: reset the poem and start over
        rubble.classList.remove("show");
        towerLines.forEach(function (line) {
            line.classList.remove("fall");
        });
        step = 0;
        setTimeout(showFirstLine, 900);
    }
}

// Advances the poem when the user clicks or presses Space/Enter.
document.addEventListener("click", advance);
document.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        advance();
    }
});

// Show the first line of the poem when the page loads.
showFirstLine();