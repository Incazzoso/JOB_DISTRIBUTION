/**
 * DATALAB 2026 - Versione 4K Ultra HD 
 * Database Random Esteso (20 Foto HD)
 */

function inizializzaAmbiente() {
    const ora = new Date().getHours();
    const eNotte = (ora >= 20 || ora < 7);
    const radice = document.documentElement;
    const elementoImmagine = document.getElementById('bg-photo');

    // Imposta il tema nel tag HTML
    radice.setAttribute('data-theme', eNotte ? 'dark' : 'light');

    if (elementoImmagine) {
        // --- DATABASE PEXELS ESTESO ---
        
        // Foto Giorno: Uffici, Luce naturale, Architettura, Minimalismo
        const fotoGiorno = [
            "373478", "1170412", "3183150", "3861972", "443383",
            "2041627", "267507", "3183132", "1181244", "7070"
        ];

        // Foto Notte: Tech, Server, Città scura, Cyberpunk vibe
        const fotoNotte = [
            "257736", "162489", "546819", "257897", "3183153",
            "1148820", "2280571", "3861969", "1089438", "1749303"
        ];

        // Selezione Casuale
        const listaScelta = eNotte ? fotoNotte : fotoGiorno;
        const idCasuale = listaScelta[Math.floor(Math.random() * listaScelta.length)];

        // URL PEXELS 4K CRYSTAL CLEAR
        // q=100 e w=3840 per la massima nitidezza possibile
        const timestamp = new Date().getTime();
        const url4K = `https://images.pexels.com/photos/${idCasuale}/pexels-photo-${idCasuale}.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160&dpr=1&v=${timestamp}`;
        
        console.log(`DataLab: Caricamento 4K - ID [${idCasuale}] - ${eNotte ? 'NOTTE' : 'GIORNO'}`);

        const caricatoreFittizio = new Image();
        caricatoreFittizio.src = url4K;

        // Reset opacità per transizione fluida
        elementoImmagine.style.opacity = "0";

        caricatoreFittizio.onload = function() {
            elementoImmagine.src = url4K;
            // Comparsa decisa (0.5s via CSS)
            elementoImmagine.style.opacity = "1";
        };

        caricatoreFittizio.onerror = function() {
            console.error("Errore Pexels. Fallback su immagine statica.");
            elementoImmagine.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920";
            elementoImmagine.style.opacity = "1";
        };
    }
}

// Avvio istantaneo
document.addEventListener('DOMContentLoaded', inizializzaAmbiente);

// Cambio sfondo opzionale sulla select
const selettore = document.getElementById('job-select');
if (selettore) {
    selettore.addEventListener('change', inizializzaAmbiente);
}