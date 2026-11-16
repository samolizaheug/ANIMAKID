// Copia los archivos del juego a la carpeta "www", que es la que va dentro de la app de Android.
// Las imágenes PNG originales (35 MB) no se copian: la app usa las versiones WebP.
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const destino = path.join(raiz, 'www');

const archivos = ['index.html', 'style.css', 'script.js', 'privacidad.html', 'manifest.webmanifest'];
const carpetas = ['data', 'icons', 'assets/fonts', 'assets/images/web', 'assets/sounds'];

fs.rmSync(destino, { recursive: true, force: true });
for (const f of archivos) {
  fs.mkdirSync(path.dirname(path.join(destino, f)), { recursive: true });
  fs.copyFileSync(path.join(raiz, f), path.join(destino, f));
}
for (const c of carpetas) {
  fs.cpSync(path.join(raiz, c), path.join(destino, c), { recursive: true });
}
console.log('Juego copiado a www/');
