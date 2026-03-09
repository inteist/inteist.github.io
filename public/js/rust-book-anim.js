let isKnockedOver = false;

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('crab-wrapper');
  const bubble = document.getElementById('crab-speech-bubble');

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

  if (bubble && wrapper) {
    let isVisible = false;

    // Set an initial position
    bubble.classList.add('bubble-extend-left');

    function checkBubbleOpacity() {
      // The CSS opacity fluctuates. Update text and position right when it starts to fade in.
      const opacity = parseFloat(window.getComputedStyle(bubble).opacity);

      if (opacity > 0.01 && !isVisible) {
        isVisible = true;

        // Randomize the phrase
        bubble.innerText = phrases[Math.floor(Math.random() * phrases.length)];

        // Calculate position relative to the container
        const wrapperRect = wrapper.getBoundingClientRect();
        const containerRect = wrapper.parentElement.getBoundingClientRect();
        const relativeLeft = wrapperRect.left - containerRect.left;

        // If crab is on the right half of the container, extend left. Otherwise, extend right.
        if (relativeLeft + (wrapperRect.width / 2) > containerRect.width / 2) {
          bubble.classList.add('bubble-extend-left');
          bubble.classList.remove('bubble-extend-right');
        } else {
          bubble.classList.add('bubble-extend-right');
          bubble.classList.remove('bubble-extend-left');
        }

      } else if (opacity < 0.01 && isVisible) {
        isVisible = false;
      }

      requestAnimationFrame(checkBubbleOpacity);
    }
    requestAnimationFrame(checkBubbleOpacity);
  }
});

function knockOverCrab() {
  const crabWrapper = document.getElementById('crab-wrapper');
  const crabFlipper = document.getElementById('crab-flipper');
  const crab = document.getElementById('rusty-crab');
  const bubble = document.getElementById('crab-speech-bubble');

  if (!crabWrapper || !crabFlipper || !crab || isKnockedOver) return;

  isKnockedOver = true;

  // Pause horizontal movement, flipping, and bubble timers so they stay in sync
  crabWrapper.style.animationPlayState = 'paused';
  crabFlipper.style.animationPlayState = 'paused';
  if (bubble) {
    bubble.style.animationPlayState = 'paused';
    bubble.style.display = 'none';
  }

  // Random timer between 4 and 10 seconds (4000ms to 10000ms) for rocking
  const recoverTime = Math.random() * 6000 + 4000;

  crab.style.setProperty('--rock-duration', `${recoverTime}ms`);
  crab.classList.add('crab-knocked-over');

  setTimeout(() => {
    crab.classList.remove('crab-knocked-over');
    crab.classList.add('crab-recover');

    setTimeout(() => {
      crab.classList.remove('crab-recover');
      crabWrapper.style.animationPlayState = 'running';
      crabFlipper.style.animationPlayState = 'running';
      if (bubble) {
        bubble.style.animationPlayState = 'running';
        bubble.style.display = 'block';
      }
      isKnockedOver = false;
    }, 400);

  }, recoverTime + 600);
}
