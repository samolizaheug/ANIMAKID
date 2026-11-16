# Cómo publicar ANIMAKID en Google Play

La app ya está lista para convertirse en app de Android. Se empaqueta como **TWA** (Trusted Web Activity): una app de Android que abre la página de GitHub Pages a pantalla completa, sin barra del navegador, y que funciona sin internet después de la primera vez.

## Qué se cambió en el código

- `manifest.webmanifest`: nombre, colores e iconos de la app.
- `sw.js`: guarda imágenes y sonidos en el teléfono para que la app funcione **sin internet**.
- `icons/`: iconos de la app (león) en todos los tamaños, incluido el icono "adaptable" de Android.
- `assets/images/web/`: las imágenes de los animales en formato WebP. Pasaron de **35 MB a 0,35 MB**, así la app carga mucho más rápido. Las PNG originales siguen en `assets/images/`.
- `assets/fonts/`: la fuente Fredoka va dentro de la app, así no se conecta a Google Fonts (mejor para una app de niños).
- `privacidad.html`: política de privacidad (Google la exige para apps de niños).
- La música se pausa sola cuando el niño sale de la app.
- `store/`: capturas de pantalla, gráfico destacado (1024×500) e icono (512×512) para la ficha de Google Play.

## Pasos que te tocan a ti

### 1. Antes de empezar
1. Acepta (fusiona) el Pull Request en GitHub. En unos minutos la página se actualiza sola.
2. Abre `privacidad.html` y cambia `[CORREO DE CONTACTO]` por un correo tuyo de contacto.
3. Comprueba que funciona: abre https://samolizaheug.github.io/ANIMAKID/ en el móvil con Chrome; debería ofrecerte "Instalar app".

### 2. Crear la cuenta de desarrollador (una sola vez)
1. Entra en https://play.google.com/console y crea una cuenta **personal**.
2. Paga la cuota única de **25 USD** y verifica tu identidad (te pedirá un documento).
3. **Importante:** las cuentas personales nuevas deben hacer una **prueba cerrada con al menos 12 personas durante 14 días** antes de poder publicar para todo el mundo. Ve buscando 12 amigos o familiares con Android y una cuenta de Gmail.

### 3. Generar el archivo de la app (.aab) sin instalar nada
1. Entra en https://www.pwabuilder.com y escribe `https://samolizaheug.github.io/ANIMAKID/`.
2. Pulsa **Package for stores → Android → Generate Package**.
3. En las opciones pon:
   - **Package ID:** `io.github.samolizaheug.animakid`
   - **App name:** `ANIMAKID - Sonidos de Animales`
   - **Short name:** `ANIMAKID`
   - **Signing key:** "Create new"
4. Descarga el .zip. Dentro vienen:
   - el archivo `.aab` (lo que se sube a Google Play),
   - `signing.keystore` y `signing-key-info.txt` (**tu llave de firma**),
   - `assetlinks.json`.
5. ⚠️ **Guarda el `.keystore` y su contraseña en un lugar seguro** (por ejemplo, Google Drive y un USB). Sin ellos no podrás publicar actualizaciones.

### 4. Quitar la barra del navegador (assetlinks)
Android solo oculta la barra de dirección si comprueba que la web es tuya. Como la página está en `samolizaheug.github.io/ANIMAKID/`, el archivo de verificación tiene que estar en la raíz: `https://samolizaheug.github.io/.well-known/assetlinks.json`.

1. En GitHub crea un repositorio nuevo **público** llamado exactamente `samolizaheug.github.io`.
2. Súbele dos archivos:
   - `.nojekyll` (vacío; sin él GitHub ignora las carpetas que empiezan por punto),
   - `.well-known/assetlinks.json` (el que te dio PWABuilder; hay un ejemplo en `android/assetlinks.json.ejemplo`).
3. Cuando subas la app a Google Play (paso 5), ve a **Configuración → Integridad de la app → Firma de apps** y copia la **huella SHA-256 de la llave de firma de apps**. Añádela también en `sha256_cert_fingerprints` (deben quedar las dos huellas).
4. Comprueba que abre: https://samolizaheug.github.io/.well-known/assetlinks.json

### 5. Crear la app en Google Play Console
1. **Crear app** → nombre "ANIMAKID - Sonidos de Animales", idioma español, tipo "App", gratis.
2. **Público objetivo y contenido** (muy importante para apps de niños):
   - **Edad del público objetivo:** "5 años o menos" y "6 a 8 años".
   - Acepta la **Política para Familias**.
   - **Anuncios:** "No, mi app no contiene anuncios".
   - **Seguridad de los datos:** "Mi app no recopila ni comparte datos de usuarios".
   - **Política de privacidad:** `https://samolizaheug.github.io/ANIMAKID/privacidad.html`
   - **Clasificación de contenido:** rellena el cuestionario (categoría "Juegos" o "Educación"; todo "No"). Saldrá apta para todos.
   - **Acceso a la app:** "Toda la funcionalidad está disponible sin restricciones".
3. **Ficha de Play Store:**
   - **Descripción breve:** "Toca un animal y escucha su sonido. Juego educativo para niños de 2 a 6 años."
   - **Descripción completa:** usa el texto de abajo.
   - **Icono:** `store/icono-512.png`
   - **Gráfico destacado:** `store/grafico-destacado.png`
   - **Capturas de teléfono:** `store/captura-1.png`, `store/captura-2.png`
   - **Categoría:** Educación. Etiqueta: Infantil.
4. **Pruebas → Prueba cerrada:** crea una versión, sube el `.aab`, añade los correos de tus 12 testers y envíala a revisión. Pasados 14 días podrás pedir acceso a **Producción**.

### Descripción completa sugerida
> ANIMAKID es un juego educativo para que los más pequeños (2 a 6 años) descubran los sonidos de los animales.
>
> 🦁 Toca un animal y escucha su sonido real.
> 🐮 17 animales: león, vaca, perro, gato, elefante, caballo, mono, pato, cerdo, gallina, burro, ganso, toro, oveja, cabra, gallo y pavo.
> 🎵 Música de fondo que se puede encender y apagar.
> 📶 Funciona sin internet.
> 🔒 Sin anuncios, sin compras y sin recopilar datos.

## Cuando quieras actualizar la app
- Si solo cambias la web (imágenes, animales, colores), **no hace falta subir nada a Google Play**: la app usa la página de GitHub Pages. Solo cambia `CACHE_VERSION` en `sw.js` (por ejemplo a `animakid-v2`) para que los teléfonos descarguen la versión nueva.
- Si agregas un animal nuevo, añade también su imagen y sonido a la lista `PRECACHE` de `sw.js`.
