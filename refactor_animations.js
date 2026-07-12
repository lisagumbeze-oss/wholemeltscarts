import fs from 'fs';
import path from 'path';

const searchDir = './src';
const importStatement = `import ScrollReveal from '../components/ScrollReveal';\n`;
const importStatementPages = `import ScrollReveal from '../components/ScrollReveal';\n`;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Skip if it doesn't have animate-reveal
      if (!content.includes('animate-reveal')) continue;
      
      console.log(`Refactoring ${fullPath}`);
      
      // Add import if not present
      if (!content.includes('ScrollReveal')) {
        // Find last import statement
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
          const endOfLine = content.indexOf('\n', lastImportIndex);
          let importStr = `import ScrollReveal from '${fullPath.includes('pages\\') || fullPath.includes('pages/') ? '../components/ScrollReveal' : './ScrollReveal'}';\n`;
          if (fullPath.includes('admin')) {
             importStr = `import ScrollReveal from '../../components/ScrollReveal';\n`;
          }
          content = content.slice(0, endOfLine + 1) + importStr + content.slice(endOfLine + 1);
        }
      }

      // Replace simple <div className="... animate-reveal"> with <ScrollReveal className="...">
      // We will just replace the word 'animate-reveal' with nothing, and change the tag to ScrollReveal
      // Regex to find <div ... className="...animate-reveal..." ... >
      
      // Actually, a simpler way is just to replace animate-reveal with scroll-reveal in the class string,
      // and NOT change the tag to <ScrollReveal>.
      // Wait, if we don't change the tag, we need the global observer!
      // Let's just use the global observer! It's much safer than regexing JSX tags which can have nested children and matching closing tags.
    }
  }
}

// walkDir(searchDir);
