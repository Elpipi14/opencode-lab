# Terminal CV

Portfolio personal y CV interactivo con una interfaz inspirada en una terminal moderna.

El objetivo es presentar experiencia profesional, formación, habilidades técnicas y proyectos de software de una forma diferenciada, manteniendo una experiencia clara para desarrolladores, recruiters y personas no técnicas.

## Objetivo

Construir una landing page profesional que combine:

- experiencia industrial;
- desarrollo de software;
- automatización;
- inteligencia artificial;
- proyectos personales.

La interfaz tendrá apariencia de terminal, pero no obligará al visitante a conocer comandos.

## Concepto visual

Referencias visuales:

- Warp Terminal;
- terminales Linux modernas;
- terminal de VS Code;
- herramientas CLI;
- dashboards para desarrolladores.

La estética debe transmitir:

```text
INDUSTRIA + SOFTWARE + AUTOMATIZACIÓN + IA
```

Evitar:

- estética hacker o Matrix;
- exceso de verde neón;
- glow excesivo;
- animaciones pesadas;
- elementos técnicos decorativos sin función;
- ruido visual.

## Navegación

La aplicación debe ofrecer dos formas de navegación.

### Terminal

El usuario puede escribir comandos directamente.

```bash
$ projects
```

### Accesos rápidos

Las secciones principales también deben poder abrirse mediante controles visibles y accesibles.

Un recruiter no debe necesitar conocer comandos de terminal para navegar el portfolio.

## Catálogo de comandos MVP

La primera versión publicable debe contemplar este catálogo como fuente de verdad:

```text
help
whoami
about
experience
skills
projects
education
contact
cv
clear
```

### `help`

Muestra los comandos disponibles y una descripción breve de cada uno.

### `whoami`

Muestra una presentación profesional corta.

Estado del contenido del ejemplo: **PROVISIONAL**.

```text
Andrés Piuzzi Rissone

Industrial Operations -> Software Development

14+ años de experiencia en operaciones industriales.
Actualmente ampliando mi perfil hacia desarrollo,
automatización e inteligencia artificial.
```

### `about`

Presenta un resumen profesional más completo y explica la transición entre operaciones industriales y desarrollo de software.

Estado inicial: **PROVISIONAL** hasta validar el texto final de publicación.

### `experience`

Muestra la experiencia profesional de forma estructurada.

Estado del contenido del ejemplo: **PROVISIONAL**.

```text
[ OPERACIONES INDUSTRIALES ]

Experiencia:
14+ años

Áreas:
- Generación eléctrica
- Ciclo combinado
- Monitoreo de procesos
- Operación de equipos
- Rondas de planta
- Maniobras operativas
- Detección de desvíos
- Coordinación con mantenimiento
```

### `skills`

Muestra habilidades agrupadas por categoría.

Categorías iniciales:

- Lenguajes
- Frontend
- Backend
- Bases de datos
- Herramientas
- IA y automatización

Estado inicial de la lista concreta de tecnologías: **PROVISIONAL**.

La lista final debe representar conocimientos reales. No exagerar experiencia ni nivel.

### `projects`

Muestra los proyectos de software.

Cada proyecto debe seguir, cuando exista la información, una estructura común:

```text
Nombre
Estado
Descripción
Problema
Solución
Tecnologías
Repositorio
Demo
```

Proyectos iniciales candidatos, todos con estado **PROVISIONAL** hasta validar qué información se publica:

#### Industrial Rounds

Sistema para digitalizar rondas de operadores industriales y mejorar trazabilidad operativa.

#### La Variete Content Studio

Aplicación orientada a organizar productos y generar contenido para negocios gastronómicos.

#### Fitness Coach Platform

Aplicación para gestionar programación de entrenamientos entre coaches y atletas.

Los datos concretos de cada proyecto deben mantenerse fuera de los componentes visuales.

### `education`

Muestra formación académica y capacitación técnica relevante de manera concisa.

Estado inicial: **PROVISIONAL** hasta validar institución, carrera, fechas y texto final.

### `contact`

Puede mostrar:

- GitHub;
- LinkedIn;
- email;
- ubicación general.

Estado inicial de todos los datos de contacto: **TODO** hasta definir explícitamente cuáles serán públicos.

No exponer información personal innecesaria.

### `cv`

Muestra acceso a la versión vigente del CV en PDF.

Debe ofrecer dos acciones:

```text
Open CV
Download CV
```

- `Open CV` abre el PDF para visualizarlo;
- `Download CV` descarga el mismo archivo;
- ninguna acción debe ejecutarse automáticamente al escribir `cv`;
- ambas acciones deben ser accesibles mediante teclado;
- el mismo CV debe estar disponible desde los accesos rápidos.

Estado inicial del archivo PDF: **TODO** hasta incorporar la versión aprobada.

### `clear`

Limpia únicamente el contenido visual actual de la terminal.

Debe:

- eliminar comandos y resultados visibles anteriores;
- limpiar el input actual;
- mantener funcionando la aplicación;
- devolver el foco al input;
- dejar visible el prompt activo.

No debe:

- recargar la aplicación;
- eliminar datos del portfolio;
- modificar configuración;
- eliminar el historial de comandos cuando esa funcionalidad exista.

Cuando el historial sea implementado, `Arrow Up` debe poder recuperar comandos anteriores incluso después de ejecutar `clear`.

## Comandos opcionales futuros

No forman parte del MVP:

```text
history
uname
sudo hire-andres
coffee
industrial-mode
```

Los easter eggs deben ser discretos y profesionales.

## Stack inicial

```text
React
TypeScript
Vite
CSS
pnpm
```

No agregar un framework de UI en la versión inicial.

No agregar dependencias sin una necesidad concreta.

## Arquitectura objetivo

La estructura es orientativa. No se deben crear carpetas o archivos vacíos solo para imitarla.

```text
terminal-cv/
├── .opencode/
│   └── agents/
│       ├── frontend.md
│       ├── reviewer.md
│       ├── tester.md
│       └── ui-designer.md
├── public/
│   ├── cv/
│   └── images/
├── src/
│   ├── components/
│   │   └── terminal/
│   ├── commands/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── help.ts
│   │   ├── whoami.ts
│   │   ├── about.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── education.ts
│   │   ├── contact.ts
│   │   ├── cv.ts
│   │   └── clear.ts
│   ├── data/
│   │   ├── profile.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── education.ts
│   │   └── contact.ts
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── AGENTS.md
├── README.md
├── package.json
└── tsconfig.json
```

Si varios comandos son suficientemente pequeños, pueden agruparse. La arquitectura debe seguir siendo simple.

`.opencode/` contiene configuración de OpenCode y no forma parte del runtime de React.

## Principios de arquitectura

### Separar datos y presentación

Los datos del CV no deben quedar repetidos dentro de componentes React.

Preferir módulos de datos como:

```text
src/data/profile.ts
src/data/experience.ts
src/data/skills.ts
src/data/projects.ts
src/data/education.ts
src/data/contact.ts
```

### Componentes enfocados

Evitar componentes que concentren simultáneamente:

- contenido del CV;
- parser de comandos;
- estado completo de la aplicación;
- lógica de navegación;
- presentación compleja.

Separar responsabilidades cuando la complejidad real lo justifique.

### Sistema de comandos

Evitar una cadena extensa de `if/else` dentro de un componente React.

Preferir un registro simple de comandos.

No construir un framework de comandos complejo si no es necesario.

### Evitar sobrearquitectura

No introducir inicialmente:

- Redux;
- Zustand;
- backend;
- base de datos;
- autenticación;
- state machines;
- abstracciones prematuras.

Este proyecto es principalmente un portfolio estático e interactivo.

## Taxonomía de datos profesionales

Existe una única taxonomía válida en el proyecto:

### CONFIRMADO

Información validada y autorizada para ser publicada.

### PROVISIONAL

Información real o candidata que todavía debe revisarse antes de publicarse como definitiva.

### TODO

Información todavía no definida o pendiente de proporcionar.

Los agentes no pueden cambiar por decisión propia un dato `PROVISIONAL` o `TODO` a `CONFIRMADO`.

La taxonomía aplica especialmente a:

- nombre y presentación profesional;
- años de experiencia;
- experiencia laboral;
- educación;
- habilidades;
- proyectos;
- estado de proyectos;
- email;
- GitHub;
- LinkedIn;
- ubicación;
- URLs de repositorios;
- URLs de demos;
- CV PDF.

## Responsive

Debe funcionar correctamente en:

- desktop;
- notebook;
- tablet;
- mobile.

Criterios mínimos:

- sin overflow horizontal en un viewport de 320 CSS px para contenido normal;
- textos y controles utilizables con zoom del navegador al 200%;
- la terminal debe adaptarse sin depender de un ancho fijo;
- los comandos y accesos rápidos deben seguir siendo utilizables en móvil.

## Accesibilidad

Criterios verificables:

- navegación completa usando solo teclado;
- foco visible en todos los controles interactivos;
- `Enter` ejecuta el comando cuando el input tiene foco;
- después de ejecutar un comando, el foco vuelve o permanece en el input salvo que una interacción requiera lo contrario;
- después de `clear`, el input vuelve a ser el punto principal de interacción;
- los nuevos resultados deben exponerse de forma comprensible a tecnologías asistivas;
- usar HTML semántico;
- respetar `prefers-reduced-motion` para animaciones no esenciales;
- no depender únicamente del color para comunicar estado o significado.

## Rendimiento

Objetivo para una build de producción evaluada con Lighthouse:

- Performance: >= 90
- Accessibility: >= 90
- Best Practices: >= 90
- SEO: >= 90

Estos valores son objetivos de calidad, no una razón para introducir optimizaciones complejas prematuramente.

## Fases de desarrollo

Las fases 1 a 4 son incrementos internos de desarrollo.

El proyecto alcanza el estado de **MVP publicable** únicamente cuando cumple los requisitos definidos en la Fase 5.

### Fase 0 — Documentación

- [x] Definir el producto
- [x] Crear `README.md`
- [x] Crear `AGENTS.md`
- [x] Definir agentes de OpenCode

### Fase 1 — Setup

- [ ] Inicializar React + TypeScript + Vite
- [ ] Configurar TypeScript estricto
- [ ] Confirmar `pnpm dev`
- [ ] Confirmar build de producción

### Fase 2 — Terminal Core

- [ ] Ventana de terminal
- [ ] Prompt
- [ ] Input de comandos
- [ ] Registro/parser de comandos
- [ ] `help`
- [ ] `whoami`
- [ ] `clear`
- [ ] respuesta para comando desconocido

Esta fase es un incremento interno y todavía no constituye el MVP.

### Fase 3 — Contenido del CV

- [ ] `about`
- [ ] `experience`
- [ ] `skills`
- [ ] `education`
- [ ] `contact`
- [ ] `cv`

### Fase 4 — Proyectos

- [ ] modelo de datos de proyectos
- [ ] `projects`
- [ ] enlaces confirmados a repositorios
- [ ] demos cuando existan
- [ ] estados consistentes de proyectos

### Fase 5 — MVP publicable

Debe incluir los diez comandos del catálogo MVP y además:

- [ ] accesos rápidos para las secciones principales
- [ ] navegación completa mediante teclado
- [ ] foco visible
- [ ] comportamiento de foco correcto después de ejecutar comandos
- [ ] comportamiento de foco correcto después de `clear`
- [ ] responsive funcional en desktop, tablet y mobile
- [ ] soporte para `prefers-reduced-motion`
- [ ] CV accesible mediante `Open CV` y `Download CV`
- [ ] datos profesionales públicos confirmados
- [ ] build de producción correcto
- [ ] sin errores de runtime bloqueantes

Una persona no técnica debe poder recorrer el contenido principal sin escribir comandos.

### Fase 6 — UX Post-MVP

- [ ] historial de comandos
- [ ] navegación con Arrow Up / Arrow Down
- [ ] autocomplete si aporta valor
- [ ] Tab completion si aporta valor
- [ ] animaciones adicionales discretas
- [ ] easter eggs

### Fase 7 — Calidad y publicación

- [ ] tests relevantes
- [ ] revisión final de accesibilidad
- [ ] Lighthouse
- [ ] SEO
- [ ] Open Graph
- [ ] favicon
- [ ] repositorio GitHub
- [ ] deploy de producción
- [ ] dominio personalizado si se decide usar uno

## Principios del proyecto

1. Mantener el proyecto entendible.
2. Preferir soluciones simples.
3. Usar TypeScript estricto.
4. Separar contenido de UI.
5. Evitar dependencias innecesarias.
6. No sobrearquitecturar.
7. Mantener accesibilidad desde el inicio.
8. Mantener una estética profesional.
9. Facilitar la navegación a recruiters no técnicos.
10. No inventar experiencia, habilidades, enlaces ni datos personales.
11. Toda funcionalidad debe tener un propósito visible.

## Estado

```text
STATUS: PLANNING / INITIAL DEVELOPMENT
```
