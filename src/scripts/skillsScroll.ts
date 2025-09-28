export function initSkillsScroll(): void {
    document.addEventListener("DOMContentLoaded", () => {
        const scrollContainer = document.getElementById("skills-scroll") as HTMLElement | null;
        if (!scrollContainer) return;

        let position: number = 0;
        const speed: number = 0.5;
        let isPaused: boolean = false;

        const GAP_SIZE: number = 8;

        function animate(): void {
            if (!scrollContainer) return;

            if (!isPaused) {
                position -= speed;
                scrollContainer.style.transform = `translateX(${position}px)`;

                const firstSkill = scrollContainer.firstElementChild as HTMLElement | null;

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
