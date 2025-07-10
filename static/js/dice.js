// 3D Dice Rolling Logic
function rollDice() {
    const dice = document.getElementById('dice-cube');
    const sentenceElement = document.getElementById('sentence');
    
    // Add rolling animation
    dice.classList.add('rolling');
    
    // Show rolling message
    sentenceElement.innerHTML = "Rolling...";
    
    // Play sound effect (if available)
    playDiceSound();
    
    // Simulate network delay and get result
    setTimeout(() => {
        fetch('/roll')
            .then(response => response.json())
            .then(data => {
                // Remove rolling animation
                dice.classList.remove('rolling');
                
                // Set dice face rotation
                setDiceFace(data.dice);
                
                // Update sentence
                sentenceElement.innerHTML = data.sentence;
            })
            .catch(error => {
                console.error('Error:', error);
                dice.classList.remove('rolling');
                sentenceElement.innerHTML = "Good luck is coming your way!";
            });
    }, 1000);
}

function setDiceFace(value) {
    const dice = document.getElementById('dice-cube');
    
    // Define rotation values for each face
    const rotations = {
        1: 'rotateX(-15deg) rotateY(15deg)',      // front
        2: 'rotateX(-15deg) rotateY(105deg)',     // right  
        3: 'rotateX(-15deg) rotateY(-75deg)',     // left
        4: 'rotateX(75deg) rotateY(15deg)',       // top
        5: 'rotateX(-105deg) rotateY(15deg)',     // bottom
        6: 'rotateX(-15deg) rotateY(195deg)'      // back
    };
    
    dice.style.transform = rotations[value];
}

function playDiceSound() {
    const audio = document.getElementById('dice-sound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Initialize dice on page load
document.addEventListener('DOMContentLoaded', function() {
    setDiceFace(1); // Show face 1 initially
});