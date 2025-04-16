let hasConfettiPlayed = false;

function triggerConfetti() {
    if (hasConfettiPlayed) return;
    
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9a9e', '#fad0c4', '#ff6b6b', '#ffffff']
    });
    
    hasConfettiPlayed = true;
}

function preloadImages() {
    const images = [
        './public/images/cake.jpg',
        './public/images/pink-flower.png',
        './public/images/gold-wreath.png',
        './public/images/flower-frame.png'
    ];

    return Promise.all(images.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }));
}

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const mainContent = document.querySelector('.main-content');
    const cardContainer = document.getElementById('card-container');

    // Предзагрузка изображений
    preloadImages()
        .then(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Показываем основной контент
                mainContent.classList.add('loaded');
            }, 500);
        })
        .catch(error => {
            console.error('Ошибка загрузки изображений:', error);
            // В случае ошибки все равно показываем контент
            preloader.style.display = 'none';
            mainContent.classList.add('loaded');
        });

    if (cardContainer) {
        cardContainer.addEventListener('click', triggerConfetti);
    }
}); 