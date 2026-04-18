const fs = require('fs');

// Fix index.html (Root)
const fixIndex = () => {
    let text = fs.readFileSync('index.html', 'utf8');
    
    // Check if bottom nav exists, if not add it
    if (!text.includes('<nav') || !text.includes('bottom-0')) {
        const nav = `
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-3 bg-background/90 backdrop-blur-md rounded-t-3xl border-t border-outline/30 shadow-[0_-4px_20px_rgba(122,79,109,0.08)]">
    <a href="index.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-transform bg-primary/20 text-primary scale-110">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
    </a>
    <a href="telas/jogo.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-all text-primary/40 hover:bg-primary/10">
        <span class="material-symbols-outlined" style="">extension</span>
    </a>
    <a href="telas/galeria.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-all text-primary/40 hover:bg-primary/10">
        <span class="material-symbols-outlined" style="">workspace_premium</span>
    </a>
</nav>`;
        text = text.replace('</body>', nav + '\n</body>');
    }
    
    fs.writeFileSync('index.html', text, 'utf8');
};

// Fix files in telas/
const fixTelas = () => {
    const files = ['telas/jogo.html', 'telas/vitoria.html', 'telas/galeria.html'];
    
    files.forEach(f => {
        let text = fs.readFileSync(f, 'utf8');
        
        // Fix asset paths
        text = text.replace(/href="styles\//g, 'href="../styles/');
        text = text.replace(/src="data\//g, 'src="../data/');
        text = text.replace(/src="js\//g, 'src="../js/');
        text = text.replace(/href="telas\//g, 'href="'); // already inside telas/
        
        // Fix Navbar links
        text = text.replace(/href="home\.html"/g, 'href="../index.html"');
        text = text.replace(/href="\.\.\/index\.html"/g, 'href="../index.html"'); // ensure consistency
        
        // Fix Galeria back button specifically
        if (f === 'telas/galeria.html') {
             text = text.replace('<a href="home.html"', '<a href="../index.html"');
        }

        // Fix Navigation Active States
        const isJogo = f === 'telas/jogo.html' || f === 'telas/vitoria.html';
        const isGaleria = f === 'telas/galeria.html';

        const navHtml = `
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-3 bg-background/90 backdrop-blur-md rounded-t-3xl border-t border-outline/30 shadow-[0_-4px_20px_rgba(122,79,109,0.08)]">
    <a href="../index.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-transform text-primary/40 hover:bg-primary/10">
        <span class="material-symbols-outlined" style="">home</span>
    </a>
    <a href="jogo.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-all ${isJogo ? 'bg-primary/20 text-primary scale-110' : 'text-primary/40 hover:bg-primary/10'}">
        <span class="material-symbols-outlined" style="${isJogo ? "font-variation-settings: 'FILL' 1;" : ""}">extension</span>
    </a>
    <a href="galeria.html" class="flex flex-col items-center justify-center rounded-2xl p-3 transition-all ${isGaleria ? 'bg-primary/20 text-primary scale-110' : 'text-primary/40 hover:bg-primary/10'}">
        <span class="material-symbols-outlined" style="${isGaleria ? "font-variation-settings: 'FILL' 1;" : ""}">workspace_premium</span>
    </a>
</nav>`;

        text = text.replace(/<(nav|footer)[^>]*bottom[^>]*>[\s\S]*?<\/\1>/gi, navHtml);

        fs.writeFileSync(f, text, 'utf8');
    });
};

try {
    fixIndex();
    fixTelas();
    console.log("Correções de caminhos e navegação aplicadas.");
} catch(err) {
    console.error(err);
}
