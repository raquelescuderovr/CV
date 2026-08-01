# CV web de Raquel Escudero Valcárcel-Ríos

Web estática trilingüe creada con Astro y preparada para GitHub Pages.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Contenido y activos

- `../../scripts/generar_web_publica.py` exporta una vista pública del libro
  privado a `src/data/curriculum.generated.json`; no copia el Excel, las
  evidencias ni las copias de seguridad.
- `src/data/content.ts` usa esos datos para la identidad, la trayectoria, los
  proyectos y el currículo completo. Los textos editoriales y las traducciones
  siguen siendo contenido de presentación.
- La vista pública excluye correo electrónico, teléfono, dirección postal y
  documentos acreditativos; conserva únicamente datos profesionales ya
  considerados publicables en la web existente.
- La URL de LinkedIn se añade en `linkedinUrl` cuando esté disponible.
- No se publica un PDF descargable mientras contenga datos de contacto privados.
- La URL de producción se configura con `SITE_URL`; si el repositorio no usa el nombre por defecto, definir también `BASE_PATH` en la compilación.

## Actualización automática y GitHub Pages

1. `scripts/actualizar_web_cv.py --push` lee el libro, genera los datos
   públicos, valida el build y publica el cambio en `raquelescuderovr/CV`.
2. El agente de macOS instalado para esta instancia observa
   `curriculums/raquel/data/curriculum.xlsx` y ejecuta ese flujo cuando cambia.
3. El flujo `.github/workflows/deploy.yml` construye y publica cada commit de
   `main` en `https://raquelescuderovr.github.io/CV/`.
4. En el repositorio de GitHub, **Settings → Pages** debe usar **GitHub
   Actions** como origen.
