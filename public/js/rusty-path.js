// rusty-path.js

document.addEventListener('DOMContentLoaded', () => {
  // These coordinates were extracted directly from the green line in seabed-path.png
  const pathPoints = [[0, 891], [20, 891], [40, 891], [60, 887], [80, 883], [100, 881], [120, 879], [140, 880], [160, 877], [180, 877], [200, 873], [220, 870], [240, 867], [260, 865], [280, 863], [300, 858], [320, 859], [340, 859], [360, 859], [380, 861], [400, 862], [420, 863], [440, 865], [460, 866], [480, 867], [500, 869], [520, 871], [540, 872], [560, 874], [580, 874], [600, 875], [620, 875], [640, 875], [660, 876], [680, 877], [700, 877], [720, 877], [740, 878], [760, 879], [780, 880], [800, 880], [820, 881], [840, 880], [860, 880], [880, 880], [900, 880], [920, 880], [940, 881], [960, 882], [980, 883], [1000, 889], [1020, 893], [1040, 900], [1060, 906], [1080, 906], [1100, 906]];
  const maxW = 1100;
  const maxH = 1050;

  const crabWrapper = document.getElementById('crab-wrapper');
  const container = document.querySelector('.rusty-scene .walking-crab-container');

  if (!crabWrapper || !container) return;

  function updateCrabY() {
    // Read the left percentage directly from the CSS style set by rust-book-anim.js
    let leftStr = crabWrapper.style.left;
    let pos = parseFloat(leftStr);

    if (!isNaN(pos)) {
      // crab center is roughly halfway of his visual width (~5.5% offset from left)
      let crabCenterPct = pos + 5.5;
      let pxX = (crabCenterPct / 100) * maxW;

      let p1 = pathPoints[0], p2 = pathPoints[pathPoints.length - 1];
      for (let i = 0; i < pathPoints.length - 1; i++) {
        if (pxX >= pathPoints[i][0] && pxX <= pathPoints[i + 1][0]) {
          p1 = pathPoints[i];
          p2 = pathPoints[i + 1];
          break;
        }
      }

      let t = (p2[0] !== p1[0]) ? (pxX - p1[0]) / (p2[0] - p1[0]) : 0;
      let yFromTop = p1[1] + t * (p2[1] - p1[1]);

      // Convert to percentage from bottom so it scales dynamically on screen widths
      let bottomPx = maxH - yFromTop;
      let bottomPct = (bottomPx / maxH) * 100;

      // Add positive padding to move the crab UP onto the visual sand line. 
      // Using + 1.8% to place his feet perfectly on the green line trace.
      let adjustedBottom = bottomPct - 3.2;

      // Ensure it's not overriding user manually setting bottom to test things.
      container.style.bottom = adjustedBottom + '%';
    }

    requestAnimationFrame(updateCrabY);
  }

  requestAnimationFrame(updateCrabY);
});
