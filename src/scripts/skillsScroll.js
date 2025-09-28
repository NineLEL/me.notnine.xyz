export function initSkillsScroll() {
  document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.getElementById("skills-scroll");
    if (!scrollContainer) return;

    let position = 0;
    const speed = 0.5;
    let isPaused = false;

    const GAP_SIZE = 8;

    function animate() {
      if (!isPaused) {
        position -= speed;
        scrollContainer.style.transform = `translateX(${position}px)`;

        const firstSkill = scrollContainer.firstElementChild;

        if (firstSkill) {
          const firstSkillWidth = firstSkill.offsetWidth;

          if (Math.abs(position) >= firstSkillWidth + GAP_SIZE) {
            position += firstSkillWidth + GAP_SIZE;
            scrollContainer.style.transform = `translateX(${position}px)`;
            scrollContainer.appendChild(firstSkill);
          }
        }
      }

      requestAnimationFrame(animate);
    }

    scrollContainer.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    scrollContainer.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    animate();
  });
}
