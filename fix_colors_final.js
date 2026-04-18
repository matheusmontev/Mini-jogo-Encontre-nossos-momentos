const fs = require('fs');

const fixOldColors = (content) => {
    let text = content;
    // Old shadow pink
    text = text.replace(/rgba\(244,184,196,0\.12\)/gi, 'rgba(232, 196, 200, 0.12)');
    text = text.replace(/rgba\(244,\s*184,\s*196,\s*0\.12\)/gi, 'rgba(232, 196, 200, 0.12)');
    text = text.replace(/rgba\(244,184,196,0\.15\)/gi, 'rgba(232, 196, 200, 0.15)');
    
    // Old text/border rose colors
    text = text.replace(/text-\[\#F4B8C4\]/gi, 'text-outline');
    text = text.replace(/text-\[\#8B4C4C\]/gi, 'text-primary');
    text = text.replace(/border-\[\#F4B8C4\]/gi, 'border-outline');
    text = text.replace(/bg-\[\#F4B8C4\]/gi, 'bg-outline');
    
    // Some specific cases from previous files
    text = text.replace(/shadow-rose-900\/5/gi, 'shadow-primary/5');
    text = text.replace(/dark:border-primary\/20/gi, 'dark:border-outline/20');
    
    return text;
};

const files = ['index.html', 'telas/jogo.html', 'telas/vitoria.html', 'telas/galeria.html'];

files.forEach(f => {
    try {
        let text = fs.readFileSync(f, 'utf8');
        let fixed = fixOldColors(text);
        if (text !== fixed) {
            fs.writeFileSync(f, fixed, 'utf8');
            console.log(`Cores corrigidas em ${f}`);
        }
    } catch (e) {
        console.error(`Erro ao processar ${f}: ${e.message}`);
    }
});
