# Cómo publicar ANIMAKID en Google Play

ANIMAKID se publica como **app de pago (1 USD)**. El juego completo va **dentro de la app** (con Capacitor), así que funciona sin internet y no depende de la página web.

## Qué hay en el repositorio

- `android/`: el proyecto de la app de Android, con el icono del león y la pantalla de inicio.
- `package.json`, `capacitor.config.json`, `scripts/copiar-web.js`: copian el juego (`index.html`, `style.css`, `script.js`, imágenes WebP, sonidos) dentro de la app.
- `.github/workflows/android.yml`: GitHub compila la app por ti y te da el archivo `.aab` firmado listo para subir a Google Play. No necesitas instalar Android Studio.
- `privacidad.html`: política de privacidad (Google la exige para apps de niños).
- `store/`: capturas, gráfico destacado (1024×500) e icono (512×512) para la ficha de Google Play.

## Pasos

### 1. Guardar la llave de firma (una sola vez)
La llave sirve para demostrar a Google que las actualizaciones son tuyas. Viene en la carpeta `llave-de-firma` que te pasé:
- `animakid-upload.keystore`: la llave.
- `LEEME-contraseña.txt`: la contraseña.
- `ANIMAKID_KEYSTORE_BASE64.txt`: la llave convertida en texto para GitHub.

Guarda la llave y la contraseña en **dos lugares seguros** (Google Drive y un USB). **Nunca las subas al repositorio.**

### 2. Dar la llave a GitHub (una sola vez)
1. Abre https://github.com/samolizaheug/animakid/settings/secrets/actions
2. Pulsa **New repository secret** y crea estos dos:
   - Nombre `ANIMAKID_KEYSTORE_BASE64` → valor: todo el texto de `ANIMAKID_KEYSTORE_BASE64.txt`.
   - Nombre `ANIMAKID_KEYSTORE_PASSWORD` → valor: la contraseña de `LEEME-contraseña.txt`.

### 3. Compilar la app
1. Abre https://github.com/samolizaheug/animakid/actions/workflows/android.yml
2. Pulsa **Run workflow**, deja la versión `1.0` y pulsa el botón verde.
3. Espera unos 5 minutos hasta que salga ✅. Entra en la ejecución y descarga el archivo de **Artifacts**. Dentro está `app-release.aab`.

Cada vez que cambies algo del juego, repite el paso 3 con una versión nueva (1.1, 1.2…) y sube el `.aab` nuevo a Google Play.

### 4. Crear la app en Play Console
Cuando Google termine de verificar tu identidad:
1. **Crear app** → nombre "ANIMAKID - Sonidos de Animales", idioma español, tipo "App", **De pago**.
2. **Configuración → Integridad de la app → Firma de apps de Google Play**: déjala activada (es lo normal).
3. **Público objetivo y contenido**:
   - **Edad del público objetivo:** "5 años o menos" y "6 a 8 años". Acepta la **Política para Familias**.
   - **Anuncios:** no contiene anuncios.
   - **Seguridad de los datos:** no recopila ni comparte datos.
   - **Política de privacidad:** `https://samolizaheug.github.io/ANIMAKID/privacidad.html`
   - **Clasificación de contenido:** cuestionario con todo "No"; saldrá apta para todos.
   - **Acceso a la app:** todo disponible sin restricciones.
4. **Ficha de Play Store:**
   - **Descripción breve:** "Toca un animal y escucha su sonido. Juego educativo para niños de 2 a 6 años."
   - **Descripción completa:** usa el texto de abajo.
   - **Icono:** `store/icono-512.png` · **Gráfico destacado:** `store/grafico-destacado.png` · **Capturas:** `store/captura-1.png`, `store/captura-2.png`
   - **Categoría:** Educación.
5. **Monetización → Perfil de pagos / cuenta de comerciante:** rellena tus datos fiscales y tu cuenta bancaria para recibir el dinero.
6. **Precio:** en "Precio de la app" pon **1 USD**; Google calcula el precio en cada país.
7. **Pruebas → Prueba cerrada:** sube el `.aab`, añade los correos de tus 12 testers y envía a revisión. Tras **14 días** con los testers podrás pedir acceso a **Producción**.

### Descripción completa sugerida
> ANIMAKID es un juego educativo para que los más pequeños (2 a 6 años) descubran los sonidos de los animales.
>
> 🦁 Toca un animal y escucha su sonido real.
> 🐮 17 animales: león, vaca, perro, gato, elefante, caballo, mono, pato, cerdo, gallina, burro, ganso, toro, oveja, cabra, gallo y pavo.
> 🎵 Música de fondo que se puede encender y apagar.
> 📶 Funciona sin internet.
> 🔒 Sin anuncios, sin compras dentro de la app y sin recopilar datos.
