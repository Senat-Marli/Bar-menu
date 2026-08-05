document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cocktailCards = document.querySelectorAll('.cocktail-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // First pass: animate out cards that should hide
            const cardsToHide = [];
            const cardsToShow = [];

            cocktailCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || cardCategory === filterValue;

                if (shouldShow) {
                    cardsToShow.push(card);
                } else {
                    cardsToHide.push(card);
                }
            });

            // Animate out
            cardsToHide.forEach(card => {
                card.classList.add('filtering-out');
                card.classList.remove('filtering-in');
            });

            // After animation completes, hide and show
            setTimeout(() => {
                cardsToHide.forEach(card => {
                    card.classList.add('hide');
                    card.classList.remove('filtering-out');
                });

                cardsToShow.forEach(card => {
                    card.classList.remove('hide');
                    card.classList.add('filtering-in');
                });

                // Remove animation class after it plays
                setTimeout(() => {
                    cardsToShow.forEach(card => {
                        card.classList.remove('filtering-in');
                    });
                }, 450);
            }, 300);
        });
    });

    // Intersection Observer for scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    cocktailCards.forEach(card => {
        observer.observe(card);
    });
});
