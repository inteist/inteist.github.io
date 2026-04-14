(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // _src/js/rust-book-anim.js
  var require_rust_book_anim = __commonJS({
    "_src/js/rust-book-anim.js"() {
      var isKnockedOver = false;
      var initialPos = 30 + Math.random() * 30;
      var crabState = {
        pos: initialPos,
        // Current percentage left
        target: initialPos,
        // Target percentage left
        speed: 12,
        // Percent per second
        isWaiting: false,
        waitTime: 0,
        facingRight: true,
        lastFrameTime: 0
      };
      var crabWrapper;
      var crabFlipper;
      var crabWalkImg;
      var bubble;
      var thinkBubble;
      var recoverTimeoutId = null;
      var thinkBubbleTimeoutId = null;
      var phrases = [
        "I dare you to touch me!",
        "C'mon, touch me!",
        "Wait, did I drop a borrow?",
        "Don't worry, I won't panic!",
        "Give me a high-five!",
        "C'mon, don't panic! \u2014 pet me!",
        "Scared of a little unsafe?",
        "Halt! Borrow Checker says no.",
        "Can I get a quick &mut?",
        "Careful, I'm Pinned!",
        "Error: Lifetime too short.",
        "Be a Some \u2014 give me a pet!",
        "Bet you can't handle my lifetime!",
        "Warning: Unsafe code ahead!"
      ];
      var phrasesScreaming = [
        "Aaaah! Panic!",
        "Wait, I didn't clone!",
        "Segmentation fault!",
        "Null pointer dereference! Oh wait...",
        "My lifetimes!",
        "Unwrap failed!",
        "Help! I'm mutable!",
        "Borrow checker, save me!"
      ];
      var phrasesThinking = [
        "I shouldn't have said that...",
        "Maybe I provoked them too much...",
        "Should have stayed in my own scope...",
        "I regret mocking their borrow checker skills.",
        "That was definitely an unsafe block."
      ];
      var phrasesRescued = [
        "Thank you, kind Developer!",
        "A proper clone indeed!",
        "My lifetimes are saved!",
        "Who needs a Garbage Collector now?",
        "Result::Ok(Saved!)"
      ];
      document.addEventListener("DOMContentLoaded", () => {
        crabWrapper = document.getElementById("crab-wrapper");
        crabFlipper = document.getElementById("crab-flipper");
        crabWalkImg = document.querySelector(".crab-img-walk");
        bubble = document.getElementById("crab-speech-bubble");
        thinkBubble = document.getElementById("crab-think-bubble");
        if (!crabWrapper) return;
        crabWrapper.addEventListener("click", knockOverCrab);
        requestAnimationFrame(tickCrabAnimation);
      });
      function tickCrabAnimation(timestamp) {
        if (!crabState.lastFrameTime) crabState.lastFrameTime = timestamp;
        const deltaTime = (timestamp - crabState.lastFrameTime) / 1e3;
        crabState.lastFrameTime = timestamp;
        if (!isKnockedOver) {
          if (crabState.isWaiting) {
            crabState.waitTime -= deltaTime;
            if (crabWalkImg) crabWalkImg.style.opacity = 0;
            if (crabState.waitTime <= 0) {
              crabState.isWaiting = false;
              if (bubble) bubble.classList.remove("show");
              const leftStop = 10;
              const rightStop = 90;
              const minTravel = 3;
              const maxTravel = 15;
              const travelDistance = minTravel + Math.random() * (maxTravel - minTravel);
              let direction = Math.random() > 0.5 ? 1 : -1;
              let newTarget = crabState.pos + direction * travelDistance;
              if (newTarget < leftStop) {
                direction = 1;
                newTarget = crabState.pos + direction * travelDistance;
                if (newTarget > rightStop) newTarget = rightStop;
              } else if (newTarget > rightStop) {
                direction = -1;
                newTarget = crabState.pos + direction * travelDistance;
                if (newTarget < leftStop) newTarget = leftStop;
              }
              crabState.target = newTarget;
              crabState.speed = 4 + Math.random() * 6;
            }
          } else {
            if (crabWalkImg) crabWalkImg.style.opacity = 1;
            const diff = crabState.target - crabState.pos;
            if (Math.abs(diff) < 0.5) {
              crabState.pos = crabState.target;
              crabState.isWaiting = true;
              crabState.waitTime = 1 + Math.random() * 3;
              if (bubble) {
                showSpeechBubble();
              }
            } else {
              const direction = Math.sign(diff);
              crabState.pos += direction * crabState.speed * deltaTime;
              crabState.facingRight = direction > 0;
            }
          }
          crabWrapper.style.left = `${crabState.pos}%`;
          crabFlipper.style.transform = `scaleX(${crabState.facingRight ? -1 : 1})`;
        }
        requestAnimationFrame(tickCrabAnimation);
      }
      function showSpeechBubble() {
        bubble.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        const wrapperRect = crabWrapper.getBoundingClientRect();
        const containerRect = crabWrapper.parentElement.getBoundingClientRect();
        const relativeLeft = wrapperRect.left - containerRect.left;
        if (relativeLeft + wrapperRect.width / 2 > containerRect.width / 2) {
          bubble.classList.add("bubble-extend-left");
          bubble.classList.remove("bubble-extend-right");
        } else {
          bubble.classList.add("bubble-extend-right");
          bubble.classList.remove("bubble-extend-left");
        }
        bubble.classList.add("show");
      }
      function knockOverCrab() {
        const crab = document.getElementById("rusty-crab");
        if (!crabWrapper || !crabFlipper || !crab) return;
        if (isKnockedOver) {
          helpCrabUp(crab);
          return;
        }
        isKnockedOver = true;
        if (bubble) {
          bubble.innerText = phrasesScreaming[Math.floor(Math.random() * phrasesScreaming.length)];
          bubble.classList.add("show");
        }
        if (thinkBubble) {
          thinkBubble.innerText = phrasesThinking[Math.floor(Math.random() * phrasesThinking.length)];
          if (bubble.classList.contains("bubble-extend-left")) {
            thinkBubble.classList.add("bubble-extend-left");
            thinkBubble.classList.remove("bubble-extend-right");
          } else {
            thinkBubble.classList.add("bubble-extend-right");
            thinkBubble.classList.remove("bubble-extend-left");
          }
          const thinkBubbleDelay = 700;
          thinkBubbleTimeoutId = setTimeout(() => {
            if (isKnockedOver) {
              thinkBubble.classList.add("show");
            }
          }, thinkBubbleDelay);
        }
        if (crabWalkImg) crabWalkImg.style.opacity = 1;
        const recoverTime = Math.random() * 6e3 + 4e3;
        crab.style.setProperty("--rock-duration", `${recoverTime}ms`);
        crab.classList.add("crab-knocked-over");
        recoverTimeoutId = setTimeout(() => {
          crab.classList.remove("crab-knocked-over");
          crab.classList.add("crab-recover");
          if (bubble) bubble.classList.remove("show");
          if (thinkBubble) thinkBubble.classList.remove("show");
          setTimeout(() => {
            crab.classList.remove("crab-recover");
            isKnockedOver = false;
          }, 400);
        }, recoverTime + 600);
      }
      function helpCrabUp(crab) {
        if (crab.classList.contains("crab-recover")) return;
        if (recoverTimeoutId) {
          clearTimeout(recoverTimeoutId);
          recoverTimeoutId = null;
        }
        if (thinkBubbleTimeoutId) {
          clearTimeout(thinkBubbleTimeoutId);
          thinkBubbleTimeoutId = null;
        }
        if (thinkBubble) thinkBubble.classList.remove("show");
        if (bubble) {
          bubble.innerText = phrasesRescued[Math.floor(Math.random() * phrasesRescued.length)];
          bubble.classList.add("show");
        }
        crab.classList.remove("crab-knocked-over");
        crab.classList.add("crab-recover");
        setTimeout(() => {
          crab.classList.remove("crab-recover");
          crabState.isWaiting = false;
          crabState.waitTime = 0;
          const minLeft = 2;
          const maxLeft = 90;
          const travelDistance = 25 + Math.random() * 25;
          let direction = Math.random() > 0.5 ? 1 : -1;
          let newTarget = crabState.pos + direction * travelDistance;
          if (newTarget < minLeft) {
            direction = 1;
            newTarget = crabState.pos + direction * travelDistance;
            if (newTarget > maxLeft) newTarget = maxLeft;
          } else if (newTarget > maxLeft) {
            direction = -1;
            newTarget = crabState.pos + direction * travelDistance;
            if (newTarget < minLeft) newTarget = minLeft;
          }
          crabState.target = newTarget;
          crabState.speed = 4 + Math.random() * 6;
          isKnockedOver = false;
          setTimeout(() => {
            if (bubble && !isKnockedOver) {
              bubble.classList.remove("show");
            }
          }, 2e3);
        }, 400);
      }
    }
  });
  require_rust_book_anim();
})();
