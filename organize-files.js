const fs = require('fs-extra');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Função para mover arquivos para a subpasta correta
function moveFileIfNotExists(file, dest) {
  const destDirPath = path.join(distDir, dest);
  const destFilePath = path.join(destDirPath, file);

  // Cria a pasta de destino, se não existir
  if (!fs.existsSync(destDirPath)) {
    fs.mkdirSync(destDirPath, { recursive: true });
    console.log(`Pasta ${dest} criada.`);
  }

  // Verifica se o arquivo já foi movido (evita duplicação)
  if (!fs.existsSync(destFilePath)) {
    fs.moveSync(path.join(distDir, file), destFilePath);
    console.log(`Arquivo ${file} movido para ${destFilePath}`);
  } else {
    console.log(`Arquivo ${file} já existe em ${destFilePath}. Não movendo.`);
  }
}

// Extensões de imagens que serão movidas
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

// Criar a pasta "images" explicitamente
const imagesDir = path.join(distDir, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log('Pasta "images" criada.');
}

// Organize todos os arquivos de uma vez
fs.readdirSync(distDir).forEach(file => {
  console.log(`Processando arquivo: ${file}`);  // Log para depuração
  const fileExtension = path.extname(file).toLowerCase();

  // Organize arquivos CSS e seus mapas
  if (file.endsWith('.css') || file.endsWith('.css.map')) {
    const baseName = file.split('.')[0];  // Nome base sem a extensão
    const subfolder = `styles/${baseName}`;
    moveFileIfNotExists(file, subfolder);
  }

  // Organize arquivos JS e seus mapas
  else if (file.endsWith('.js') || file.endsWith('.js.map')) {
    const baseName = file.split('.')[0];  // Nome base sem a extensão
    const subfolder = `scripts/${baseName}`;
    moveFileIfNotExists(file, subfolder);
  }

  // Organize imagens
  else if (imageExtensions.includes(fileExtension)) {
    moveFileIfNotExists(file, 'images');
  }
});
