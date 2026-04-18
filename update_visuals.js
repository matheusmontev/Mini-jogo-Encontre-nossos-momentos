const fs = require('fs');

const COLORS = {
    "background": "#fdf6ee",
    "primary": "#c0616b",
    "secondary": "#7a4f6d",
    "surface-container": "#f5ebe0",
    "on-background": "#2e1f27",
    "on-surface": "#2e1f27",
    "on-surface-variant": "#7d6470",
    "outline-variant": "#e8c4c8",
    "outline": "#e8c4c8",
    "primary-container": "#f5ebe0",
    "on-primary-container": "#2e1f27"
};

const updateCss = () => {
    let globalCss = fs.readFileSync('styles/global.css', 'utf8');
    globalCss = globalCss.replace('rgba(162, 60, 63, 0.08)', 'rgba(122, 79, 109, 0.15)');
    fs.writeFileSync('styles/global.css', globalCss, 'utf8');

    let jogoCss = fs.readFileSync('styles/jogo.css', 'utf8');
    jogoCss = jogoCss.replace(/#80515c/g, '#c0616b').replace(/#f4b8c4/g, '#f5ebe0');
    fs.writeFileSync('styles/jogo.css', jogoCss, 'utf8');
};

const updateJs = () => {
    let utilsJs = fs.readFileSync('js/utils.js', 'utf8');
    utilsJs = utilsJs.replace(/"background":\s*"#[^"]+"/g, '"background": "#fdf6ee"');
    utilsJs = utilsJs.replace(/"primary":\s*"#[^"]+"/g, '"primary": "#c0616b"');
    utilsJs = utilsJs.replace(/"secondary":\s*"#[^"]+"/g, '"secondary": "#7a4f6d"');
    utilsJs = utilsJs.replace(/"surface-container":\s*"#[^"]+"/g, '"surface-container": "#f5ebe0"');
    utilsJs = utilsJs.replace(/"on-background":\s*"#[^"]+"/g, '"on-background": "#2e1f27"');
    utilsJs = utilsJs.replace(/"on-surface":\s*"#[^"]+"/g, '"on-surface": "#2e1f27"');
    utilsJs = utilsJs.replace(/"on-surface-variant":\s*"#[^"]+"/g, '"on-surface-variant": "#7d6470"');
    utilsJs = utilsJs.replace(/"outline-variant":\s*"#[^"]+"/g, '"outline-variant": "#e8c4c8"');
    utilsJs = utilsJs.replace(/"outline":\s*"#[^"]+"/g, '"outline": "#e8c4c8"');
    utilsJs = utilsJs.replace(/"surface":\s*"#[^"]+"/g, '"surface": "#fdf6ee"');
    utilsJs = utilsJs.replace(/"surface-bright":\s*"#[^"]+"/g, '"surface-bright": "#fdf6ee"');
    fs.writeFileSync('js/utils.js', utilsJs, 'utf8');
};

const processHtml = () => {
    const files = ['home.html', 'jogo.html', 'vitoria.html', 'galeria.html'];
    
    files.forEach(f => {
        let text = fs.readFileSync(f, 'utf8');

        // Add memorias.js to header
        if (!text.includes('data/memorias.js')) {
            text = text.replace('<script src="js/utils.js"></script>', '<script src="data/memorias.js"></script>\n  <script src="js/utils.js"></script>');
        }

        // Hardcoded colors replacements to Tailwind classes where applicable or hex
        text = text.replace(/bg-\[\#FFFDF9]/gi, 'bg-background');
        text = text.replace(/bg-\[\#FFFDFB]/gi, 'bg-background');
        text = text.replace(/text-\[\#8B4C4C]/gi, 'text-primary');
        text = text.replace(/border-\[\#F4B8C4\](?=\/)/gi, 'border-outline'); // e.g., border-[#F4B8C4]/30
        text = text.replace(/bg-\[\#F4B8C4\](?=\/)/gi, 'bg-primary');
        text = text.replace(/shadow-\[\#8B4C4C\](?=\/)/gi, 'shadow-primary');
        text = text.replace(/text-\[\#F4B8C4\](?=\/)/gi, 'text-outline');

        text = text.replace(/bg-rose-50/gi, 'bg-primary/10');
        text = text.replace(/border-rose-100/gi, 'border-outline');
        text = text.replace(/border-rose-900/gi, 'border-primary'); // in galeria topappbar
        text = text.replace(/text-rose-900/gi, 'text-on-background');
        
        // Navigation links
        if (f === 'home.html') {
            text = text.replace(/<button([^>]*)>\s*<span\b[^>]*>Iniciar jogo<\/span>\s*<\/button>/g, '<a href="jogo.html"$1><span class="truncate">Iniciar jogo</span></a>');
            text = text.replace('pt-lg', 'pt-24'); // Fixed paddings
            text = text.replace('pb-xl', 'pb-32');
        }
        
        if (f === 'vitoria.html') {
            text = text.replace(/<button([^>]*)>\s*<span\b[^>]*>replay<\/span>\s*Jogar novamente\s*<\/button>/g, '<a href="jogo.html"$1><span class="material-symbols-outlined" data-icon="replay">replay</span> Jogar novamente</a>');
            text = text.replace(/<button([^>]*)>\s*<span\b[^>]*>photo_library<\/span>\s*Ver Galeria\s*<\/button>/g, '<a href="galeria.html"$1><span class="material-symbols-outlined" data-icon="photo_library">photo_library</span> Ver Galeria</a>');
        }

        if (f === 'galeria.html') {
            text = text.replace(/<button([^>]*)>\s*<span\b[^>]*>arrow_back<\/span>\s*<\/button>/g, '<a href="home.html"$1><span class="material-symbols-outlined">arrow_back</span></a>');
        }

        if (f === 'jogo.html') {
            text = text.replace('grid-cols-3', 'grid-cols-3 sm:grid-cols-4');
            text = text.replace('pt-lg', 'pt-24'); // Header padding
            text = text.replace('pb-xl', 'pb-32');
            
            // Adjust Action Button tag (Reiniciar)
            text = text.replace(/<button([^>]*)>\s*<span\b[^>]*>restart_alt<\/span>\s*Reiniciar jogo\s*<\/button>/g, '<a href="jogo.html"$1><span class="material-symbols-outlined" data-icon="restart_alt">restart_alt</span> Reiniciar jogo</a>');
        }

        // Apply Bottom Navbar standard
        const generateNav = (fileName) => {
            const isHome = fileName === 'home.html' ? true : false;
            const isJogo = fileName === 'jogo.html' ? true : false;
            const isGaleria = fileName === 'galeria.html' || fileName === 'vitoria.html' ? true : false;

            const homeClass = isHome ? 'bg-primary/20 text-primary scale-110' : 'text-primary/40 hover:bg-primary/10';
            const jogoClass = isJogo ? 'bg-primary/20 text-primary scale-110' : 'text-primary/40 hover:bg-primary/10';
            const galeriaClass = isGaleria ? 'bg-primary/20 text-primary scale-110' : 'text-primary/40 hover:bg-primary/10';

            return `<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-3 bg-background/90 backdrop-blur-md rounded-t-3xl border-t border-outline/30 shadow-[0_-4px_20px_rgba(122,79,109,0.08)]">
    <a href="home.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-transform ${homeClass}">
        <span class="material-symbols-outlined" style="${isHome ? "font-variation-settings: 'FILL' 1;" : ""}">home</span>
    </a>
    <a href="jogo.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-all ${jogoClass}">
        <span class="material-symbols-outlined" style="${isJogo ? "font-variation-settings: 'FILL' 1;" : ""}">extension</span>
    </a>
    <a href="galeria.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-all ${galeriaClass}">
        <span class="material-symbols-outlined" style="${isGaleria ? "font-variation-settings: 'FILL' 1;" : ""}">workspace_premium</span>
    </a>
</nav>`;
        };

        // Replace any existing <nav class="... bottom-0 ..."> block or <footer class="... bottom-0 ..."> block
        // Assuming navigation is typically wrapped in <nav... bottom... > ... </nav> or <footer... bottom... > ... </footer>
        text = text.replace(/<(nav|footer)[^>]*bottom[^>]*>[\s\S]*?<\/\1>/gi, generateNav(f));

        fs.writeFileSync(f, text, 'utf8');
    });
};

try {
    updateCss();
    updateJs();
    processHtml();
    console.log("Alterações visuais e de navegação concluídas com sucesso.");
} catch(err) {
    console.error(err);
}
