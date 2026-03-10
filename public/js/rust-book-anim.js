let isKnockedOver = false;

// Global animation state
let crabState = {
  pos: 5,        // Current percentage left
  target: 5,     // Target percentage left
  speed: 12,     // Percent per second
  isWaiting: false,
  waitTime: 0,
  facingRight: true,
  lastFrameTime: 0,
};

let crabWrapper, crabFlipper, crabWalkImg, bubble, thinkBubble;
let recoverTimeoutId = null;
let thinkBubbleTimeoutId = null;

const phrases = [
  "I dare you to touch me!",
  "C'mon, touch me!",
  "Wait, did I drop a borrow?",
  "Don't worry, I won't panic!",
  "I dare you to touch me!",
  "I dare you to move me!",
  "C'mon, don't panic! — touch me!",
  "Scared of a little unsafe?",
  "Halt! Borrow Checker says no.",
  "Can I get a quick &mut?",
  "Careful, I'm Pinned!",
  "Error: Lifetime too short.",
  "Be a Some — touch me!",
  "Bet you can't handle my lifetime!",
  "Warning: Unsafe code ahead!",
];

const phrasesScreaming = [
  "Aaaah! Panic!",
  "Wait, I didn't clone!",
  "Segmentation fault!",
  "Null pointer dereference! Oh wait...",
  "My lifetimes!",
  "Unwrap failed!",
  "Help! I'm mutable!",
  "Borrow checker, save me!"
];

const phrasesThinking = [
  "I shouldn't have said that...",
  "Maybe I provoked them too much...",
  "Should have stayed in my own scope...",
  "I regret mocking their borrow checker skills.",
  "That was definitely an unsafe block."
];

const phrasesRescued = [
  "Thank you, kind Developer!",
  "A proper clone indeed!",
  "My lifetimes are saved!",
  "Who needs a Garbage Collector now?",
  "Result::Ok(Saved!)"
];

document.addEventListener('DOMContentLoaded', () => {
  crabWrapper = document.getElementById('crab-wrapper');
  crabFlipper = document.getElementById('crab-flipper');
  crabWalkImg = document.querySelector('.crab-img-walk');
  bubble = document.getElementById('crab-speech-bubble');
  thinkBubble = document.getElementById('crab-think-bubble');

  if (!crabWrapper) return;

  // Initialize loop
  requestAnimationFrame(tickCrabAnimation);
});

function tickCrabAnimation(timestamp) {
  if (!crabState.lastFrameTime) crabState.lastFrameTime = timestamp;
  const deltaTime = (timestamp - crabState.lastFrameTime) / 1000; // in seconds
  crabState.lastFrameTime = timestamp;

  if (!isKnockedOver) {
    if (crabState.isWaiting) {
      // Waiting phase
      crabState.waitTime -= deltaTime;

      if (crabWalkImg) crabWalkImg.style.opacity = 0; // Show standing crab

      if (crabState.waitTime <= 0) {
        // Stop waiting, pick a new target!
        crabState.isWaiting = false;

        // Hide bubble if it was up
        if (bubble) bubble.classList.remove('show');

        // Define movement guardrails
        const minLeft = 2;
        const maxLeft = 90;

        // Pick a travel distance in percentage
        const travelDistance = 3 + Math.random() * 15;

        // Pick a random direction (either -1 for left or 1 for right)
        let direction = Math.random() > 0.5 ? 1 : -1;

        // Calculate the new target and change direction if it hits a wall
        let newTarget = crabState.pos + (direction * travelDistance);
        if (newTarget < minLeft) {
          direction = 1;
          newTarget = crabState.pos + (direction * travelDistance);
          if (newTarget > maxLeft) newTarget = maxLeft;
        } else if (newTarget > maxLeft) {
          direction = -1;
          newTarget = crabState.pos + (direction * travelDistance);
          if (newTarget < minLeft) newTarget = minLeft;
        }

        crabState.target = newTarget;

        // Pick random speed between 4% and 10% per sec
        crabState.speed = 4 + Math.random() * 6;
      }
    } else {
      // Walking phase
      if (crabWalkImg) crabWalkImg.style.opacity = 1; // Show walking crab

      const diff = crabState.target - crabState.pos;
      if (Math.abs(diff) < 0.5) {
        // Reached Target!
        crabState.pos = crabState.target;
        crabState.isWaiting = true;

        // Wait between 1.5s and 5s
        crabState.waitTime = 1 + Math.random() * 3;

        // Always talk when stopped now
        if (bubble) {
          showSpeechBubble();
        }
      } else {
        // Move towards target
        const direction = Math.sign(diff);
        crabState.pos += direction * crabState.speed * deltaTime;

        // Flip graphic to match direction
        crabState.facingRight = direction > 0;
      }
    }

    // Apply exact positions
    crabWrapper.style.left = `${crabState.pos}%`;
    crabFlipper.style.transform = `scaleX(${crabState.facingRight ? -1 : 1})`;
  }

  requestAnimationFrame(tickCrabAnimation);
}

function showSpeechBubble() {
  bubble.innerText = phrases[Math.floor(Math.random() * phrases.length)];

  // Position relative logic
  const wrapperRect = crabWrapper.getBoundingClientRect();
  const containerRect = crabWrapper.parentElement.getBoundingClientRect();
  const relativeLeft = wrapperRect.left - containerRect.left;

  // If crab is on right half, extend left
  if (relativeLeft + (wrapperRect.width / 2) > containerRect.width / 2) {
    bubble.classList.add('bubble-extend-left');
    bubble.classList.remove('bubble-extend-right');
  } else {
    bubble.classList.add('bubble-extend-right');
    bubble.classList.remove('bubble-extend-left');
  }

  bubble.classList.add('show');
}

function knockOverCrab() {
  const crab = document.getElementById('rusty-crab');

  if (!crabWrapper || !crabFlipper || !crab) return;

  if (isKnockedOver) {
    helpCrabUp(crab);
    return;
  }

  isKnockedOver = true;

  // Set up the screams and regrets
  if (bubble) {
    bubble.innerText = phrasesScreaming[Math.floor(Math.random() * phrasesScreaming.length)];
    bubble.classList.add('show');
  }

  if (thinkBubble) {
    thinkBubble.innerText = phrasesThinking[Math.floor(Math.random() * phrasesThinking.length)];
    // Apply position classes same as speech bubble
    if (bubble.classList.contains('bubble-extend-left')) {
      thinkBubble.classList.add('bubble-extend-left');
      thinkBubble.classList.remove('bubble-extend-right');
    } else {
      thinkBubble.classList.add('bubble-extend-right');
      thinkBubble.classList.remove('bubble-extend-left');
    }

    // Configurable delay for the thought bubble
    const thinkBubbleDelay = 700;
    thinkBubbleTimeoutId = setTimeout(() => {
      // Only show if still knocked over
      if (isKnockedOver) {
        thinkBubble.classList.add('show');
      }
    }, thinkBubbleDelay);
  }

  if (crabWalkImg) crabWalkImg.style.opacity = 1; // Force legs moving while fallen

  // Random recover 4 - 10s
  const recoverTime = Math.random() * 6000 + 4000;
  crab.style.setProperty('--rock-duration', `${recoverTime}ms`);
  crab.classList.add('crab-knocked-over');

  recoverTimeoutId = setTimeout(() => {
    crab.classList.remove('crab-knocked-over');
    crab.classList.add('crab-recover');

    // Hide bubbles on recovery
    if (bubble) bubble.classList.remove('show');
    if (thinkBubble) thinkBubble.classList.remove('show');

    setTimeout(() => {
      crab.classList.remove('crab-recover');
      isKnockedOver = false;
    }, 400); // flip back animation duration
  }, recoverTime + 600);
}

function helpCrabUp(crab) {
  // If we are already in the process of recovering (e.g. user clicked multiple times), don't restart it
  if (crab.classList.contains('crab-recover')) return;

  // Cancel the automatic recovery timeout
  if (recoverTimeoutId) {
    clearTimeout(recoverTimeoutId);
    recoverTimeoutId = null;
  }
  // Cancel pending thought bubble if we were rescued before it appeared
  if (thinkBubbleTimeoutId) {
    clearTimeout(thinkBubbleTimeoutId);
    thinkBubbleTimeoutId = null;
  }

  // Hide the think bubble immediately
  if (thinkBubble) thinkBubble.classList.remove('show');

  // Say something grateful in the speech bubble
  if (bubble) {
    bubble.innerText = phrasesRescued[Math.floor(Math.random() * phrasesRescued.length)];
    bubble.classList.add('show');
  }

  // Trigger the recovery animation immediately
  crab.classList.remove('crab-knocked-over');
  crab.classList.add('crab-recover');

  // After the flip-back animation finishes (400ms), wait a bit and hide the gratitude
  setTimeout(() => {
    crab.classList.remove('crab-recover');

    // Pick a fresh path so he walks away while thanking you
    crabState.isWaiting = false;
    crabState.waitTime = 0;
    const minLeft = 2;
    const maxLeft = 90;
    // Guaranteed to walk far enough so you can read the bubble (25% to 50% distance)
    const travelDistance = 25 + Math.random() * 25;
    let direction = Math.random() > 0.5 ? 1 : -1;

    // Calculate the new target and change direction if it hits a wall
    let newTarget = crabState.pos + (direction * travelDistance);
    if (newTarget < minLeft) {
      direction = 1;
      newTarget = crabState.pos + (direction * travelDistance);
      if (newTarget > maxLeft) newTarget = maxLeft;
    } else if (newTarget > maxLeft) {
      direction = -1;
      newTarget = crabState.pos + (direction * travelDistance);
      if (newTarget < minLeft) newTarget = minLeft;
    }

    crabState.target = newTarget;
    // Standard pace
    crabState.speed = 4 + Math.random() * 6;

    isKnockedOver = false;

    // Hide gratitude bubble slightly after regaining footing
    setTimeout(() => {
      // Don't hide if it somehow got knocked over again
      if (bubble && !isKnockedOver) {
        bubble.classList.remove('show');
      }
    }, 2000);
  }, 400); // flip back animation duration
}
