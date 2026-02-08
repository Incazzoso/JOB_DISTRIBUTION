/* =============================================================
    THEME ARCHITECT & IMAGE RANDOMIZER
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;
    const bgImage = document.querySelector('.bg-photo');

    // DATASET IMMAGINI (Poetiche, scettiche, bellissime)
    const images = {
        light: [ // Giorno: Bianco dominante, tratti neri
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2000',
            'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000'
        ],
        dark: [ // Notte: Nero profondo, bagliori bianchi
            'https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2000',
            'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2000',
            'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2000'
        ]
    };

    const getRandomImg = (theme) => {
        const pool = images[theme];
        return pool[Math.floor(Math.random() * pool.length)];
    };

    const applyTheme = (theme, isInitial = false) => {
        // Aggiorna l'attributo per il CSS
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('selected-theme', theme);

        if (bgImage) {
            // Effetto fade-out prima del cambio
            bgImage.style.opacity = '0';
            
            // Precaricamento immagine per evitare glitch
            const nextImg = new Image();
            nextImg.src = getRandomImg(theme);
            
            nextImg.onload = () => {
                bgImage.src = nextImg.src;
                // Timeout per permettere al browser di registrare il cambio src
                setTimeout(() => {
                    bgImage.style.opacity = '1';
                }, 50);
            };
        }
        
        console.log(`[Status] Theme: ${theme} | Vibe: Optimized.`);
    };

    // INIT: Caricamento impostazioni precedenti o default di sistema
    const savedTheme = localStorage.getItem('selected-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

    applyTheme(initialTheme, true);

    // TRIGGER: Switch al click
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', (e) => {
            e.preventDefault();
            const current = htmlElement.getAttribute('data-theme');
            const target = current === 'light' ? 'dark' : 'light';
            applyTheme(target);
        });
    } else {
        console.warn("Attenzione: #theme-switcher non trovato nell'HTML.");
    }
});