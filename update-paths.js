const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Verifica se a pasta dist existe
if (!fs.existsSync(distDir)) {
  console.error(`Erro: O diretório "dist" não foi encontrado. Certifique-se de que o build foi executado.`);
  process.exit(1);
}

// Função para atualizar os caminhos nos arquivos HTML
function updateHtmlPaths() {
  const htmlFiles = fs.readdirSync(distDir).filter(file => file.endsWith('.html'));

  htmlFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    let htmlContent = fs.readFileSync(filePath, 'utf-8');
    const fileNameWithoutExt = path.basename(file, '.html');

    // Atualiza os caminhos do CSS (ignora links externos)
    htmlContent = htmlContent.replace(/href="([^"]+\.css)"/g, (match, p1) => {
      if (p1.startsWith('http://') || p1.startsWith('https://') || p1.startsWith('//')) {
        console.log(`Ignorado (link externo): ${match}`);
        return match; // Mantém o link externo inalterado
      }
      const updatedPath = `href="styles/${fileNameWithoutExt}/${p1}"`;
      console.log(`Atualizado caminho CSS: ${match} -> ${updatedPath}`);
      return updatedPath;
    });

    // Atualiza os caminhos do SCSS (ignora links externos)
    htmlContent = htmlContent.replace(/href="([^"]+\.scss)"/g, (match, p1) => {
      if (p1.startsWith('http://') || p1.startsWith('https://') || p1.startsWith('//')) {
        console.log(`Ignorado (link externo): ${match}`);
        return match; // Mantém o link externo inalterado
      }
      const updatedPath = `href="styles/${fileNameWithoutExt}/${p1}"`;
      console.log(`Atualizado caminho SCSS: ${match} -> ${updatedPath}`);
      return updatedPath;
    });

    // Atualiza os caminhos dos arquivos JavaScript (ignora links externos)
    htmlContent = htmlContent.replace(/src="([^"]+\.js)"/g, (match, p1) => {
      if (p1.startsWith('http://') || p1.startsWith('https://') || p1.startsWith('//')) {
        console.log(`Ignorado (link externo): ${match}`);
        return match; // Mantém o link externo inalterado
      }
      const updatedPath = `src="scripts/${fileNameWithoutExt}/${p1}"`;
      console.log(`Atualizado caminho JS: ${match} -> ${updatedPath}`);
      return updatedPath;
    });

    // Atualiza os caminhos das imagens dentro do HTML (ignora links externos)
    htmlContent = htmlContent.replace(/src="([^"]+\.(png|jpg|jpeg|gif|svg|webp))"/g, (match, p1) => {
      if (p1.startsWith('http://') || p1.startsWith('https://') || p1.startsWith('//')) {
        console.log(`Ignorado (link externo): ${match}`);
        return match; // Mantém o link externo inalterado
      }
      const updatedPath = `src="images/${p1}"`;
      console.log(`Atualizado caminho de imagem: ${match} -> ${updatedPath}`);
      return updatedPath;
    });

    // Salva o conteúdo atualizado no arquivo HTML
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    console.log(`Caminhos atualizados no arquivo HTML: ${file}`);
  });
}

// Função para atualizar os caminhos das imagens dentro do CSS
function updateCssPaths() {
  const stylesDir = path.join(distDir, 'styles');
  if (!fs.existsSync(stylesDir)) {
    console.error(`Erro: O diretório "styles" não foi encontrado em "dist".`);
    return;
  }

  const cssFolders = fs.readdirSync(stylesDir).filter(folder => fs.lstatSync(path.join(stylesDir, folder)).isDirectory());

  cssFolders.forEach(folder => {
    const cssFiles = fs.readdirSync(path.join(stylesDir, folder)).filter(file => file.endsWith('.css'));
    
    cssFiles.forEach(cssFile => {
      const cssFilePath = path.join(stylesDir, folder, cssFile);
      let cssContent = fs.readFileSync(cssFilePath, 'utf-8');
      
      // Regex para capturar caminhos de imagens sem caminho relativo/absoluto
      const regex = /url\(['"]?([^'"/]+\.(png|jpg|jpeg|gif|svg|webp))['"]?\)/g;
      const matches = cssContent.match(regex);

      if (matches) {
        console.log(`Caminhos de imagens encontrados no CSS (${cssFilePath}):`, matches);
      } else {
        console.log(`Nenhum caminho de imagem encontrado no CSS (${cssFilePath}).`);
      }

      // Substitui todos os caminhos de imagens por '../../images/nome-da-imagem'
      cssContent = cssContent.replace(regex, 'url(../../images/$1)');

      fs.writeFileSync(cssFilePath, cssContent, 'utf-8');
      console.log(`Caminhos das imagens atualizados no CSS: ${cssFilePath}`);
    });
  });
}

// Chama as funções para atualizar os caminhos nos arquivos HTML e CSS
updateHtmlPaths();
updateCssPaths();