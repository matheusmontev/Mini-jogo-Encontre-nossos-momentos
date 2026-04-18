const fs = require('fs');

const processHtml = () => {
    const files = ['home.html', 'jogo.html', 'vitoria.html', 'galeria.html'];
    
    files.forEach(f => {
        let text = fs.readFileSync(f, 'utf8');

        // Fix hex values that might have been left out
        text = text.replace(/\[\#F4B8C4\]/g, 'outline');
        text = text.replace(/\[\#8B4C4C\]/g, 'primary');
        
        // Ensure ALL main tags have proper padding for bottom nav (pb-32)
        // If there's a header before main, we assume it's fixed or needs pt-24
        
        // Home doesn't have a header, so main doesn't need pt-24 unless we already added it. Actually, home doesn't have a header. Wait, home doesn't even have <main>! It has:
        // <div class="relative flex h-auto min-h-screen w-full flex-col items-center justify-center bg-background group/design-root overflow-x-hidden p-container-padding">
        
        if (f === 'home.html') {
            text = text.replace('pb-xl', ''); // remove old if exists
            // Replace 'p-container-padding' with 'px-container-padding pt-10 pb-32'
            if (text.includes('p-container-padding')) {
                text = text.replace('p-container-padding', 'px-container-padding pt-10 pb-32');
            } else if (!text.includes('pb-32')) {
                text = text.replace(/px-container-padding/g, 'px-container-padding pb-32');
            }
        }
        
        if (f === 'jogo.html' || f === 'vitoria.html' || f === 'galeria.html') {
            // Make header fixed if it's not already
            text = text.replace(/<header class="([^"]*?)"/g, (match, p1) => {
                if (!p1.includes('fixed')) {
                    return `<header class="fixed ${p1}"`;
                }
                return match;
            });
            
            // Fix main classes
            text = text.replace(/<main class="([^"]*?)"/g, (match, p1) => {
                let classes = p1.split(' ');
                
                // remove old paddings
                classes = classes.filter(c => !c.startsWith('pt-') && !c.startsWith('pb-') && c !== 'py-xl');
                
                // add new paddings
                classes.push('pt-24');
                classes.push('pb-32');
                
                return `<main class="${classes.join(' ')}"`;
            });
        }

        fs.writeFileSync(f, text, 'utf8');
    });
};

try {
    processHtml();
    console.log("Paddings e cabeçalho ajustados com sucesso.");
} catch(err) {
    console.error(err);
}
