# Terminal CV — Agent Instructions

## Propósito

Este archivo define cómo se trabaja en el repositorio.

La definición del producto, UX, comandos, arquitectura objetivo, MVP y roadmap vive en `README.md`.

No duplicar aquí especificaciones de producto salvo cuando sean necesarias para definir una regla operativa.

## Stack

- React
- TypeScript
- Vite
- CSS
- pnpm

## Regla principal

No sobrearquitecturar.

Preferir el cambio más pequeño que resuelva correctamente la tarea.

## Antes de modificar código

1. Leer la solicitud actual.
2. Leer la sección relevante de `README.md`.
3. Inspeccionar la estructura real del repositorio.
4. Leer los archivos relacionados.
5. Reutilizar patrones existentes cuando sean adecuados.
6. Modificar solo lo necesario.

No asumir que la arquitectura objetivo ya existe.

## TypeScript

- usar TypeScript estricto;
- evitar `any` salvo justificación concreta;
- preferir `unknown` para entradas realmente desconocidas;
- no ocultar errores de TypeScript para hacer pasar el build.

## React

- usar componentes funcionales;
- mantener responsabilidades enfocadas;
- separar contenido profesional de presentación;
- no introducir gestión de estado global sin una necesidad demostrada;
- evitar abstracciones prematuras.

## Datos profesionales

La única taxonomía válida es:

- `CONFIRMADO`
- `PROVISIONAL`
- `TODO`

Solo `CONFIRMADO` puede tratarse como contenido listo para publicación.

Nunca inventar ni completar por cuenta propia:

- experiencia;
- fechas;
- educación;
- skills;
- proyectos;
- estados de proyectos;
- email;
- GitHub;
- LinkedIn;
- ubicación;
- repositorios;
- demos;
- CV.

Nunca promover `PROVISIONAL` o `TODO` a `CONFIRMADO` sin validación explícita del usuario.

## Dependencias

Antes de agregar una dependencia:

1. comprobar si la necesidad puede resolverse razonablemente con el stack actual;
2. justificar el valor concreto de la dependencia;
3. evitar librerías para funcionalidad trivial.

## Git

No ejecutar automáticamente:

- `git commit`;
- `git push`;
- `git reset`;
- reescritura de historial;
- eliminación de ramas.

Los agentes de solo lectura no deben recibir permisos amplios de shell.

## Verificación

Inspeccionar `package.json` antes de ejecutar scripts.

Usar únicamente scripts existentes.

Ejemplos posibles:

```bash
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

Un script inexistente no es un fallo.

## Límites de verificación

No afirmar que una comprobación visual o manual fue realizada si no se dispuso de una herramienta que permitiera efectuarla realmente.

Ejemplos:

- apariencia visual en distintos viewports;
- contraste real;
- navegación manual completa;
- comportamiento exacto de lectores de pantalla.

Cuando no pueda verificarse algo de manera real, reportarlo como `Missing Coverage` o equivalente.

`.opencode/` contiene configuración de OpenCode. No forma parte del runtime de la aplicación React.

## Definition of Done

Una tarea de implementación se considera completa cuando:

- el comportamiento solicitado está implementado;
- no introduce nuevos errores TypeScript;
- pasan las verificaciones relevantes disponibles;
- no introduce una regresión evidente;
- no agrega dependencias innecesarias;
- respeta el estado actual del roadmap;
- no publica datos `PROVISIONAL` o `TODO` como definitivos.

## Agentes del proyecto

Los subagentes están definidos en:

```text
.opencode/agents/
```

Agentes:

- `@ui-designer`
- `@frontend`
- `@tester`
- `@reviewer`

## Orquestación

Los diagramas de workflow son guías conceptuales.

Las flechas NO representan llamadas automáticas entre agentes.

Un agente primario de OpenCode, como `Build` o `Plan`, o el usuario, decide cuándo invocar un subagente.

Los subagentes no deben asumir que el siguiente agente del diagrama será ejecutado automáticamente.

### Tarea trivial

Usar solo el agente necesario.

Ejemplo:

```text
@frontend
```

### Cambio visual

Flujo sugerido:

```text
primary
  ├─ @ui-designer
  └─ @frontend
```

Agregar `@tester` solo si existe una verificación útil.

### Funcionalidad mediana

Flujo sugerido:

```text
primary
  ├─ @frontend
  ├─ @tester
  └─ @reviewer
```

### Funcionalidad compleja

Flujo sugerido:

```text
Plan / primary
  ├─ @ui-designer   cuando corresponda
  ├─ @frontend
  ├─ @tester
  └─ @reviewer
```

El agente primario coordina el trabajo y decide qué resultados de un subagente deben incorporarse en el siguiente paso.

## Responsabilidades

### UI Designer

- diseño;
- UX;
- jerarquía visual;
- responsive;
- accesibilidad visual;
- recomendaciones de interacción.

No modifica producción.

### Frontend

- React;
- TypeScript;
- CSS;
- lógica de terminal;
- implementación.

### Tester

- ejecuta verificaciones disponibles;
- clasifica fallos;
- identifica cobertura faltante;
- no modifica producción.

### Reviewer

- revisa bugs;
- regresiones;
- type safety;
- arquitectura;
- accesibilidad;
- mantenibilidad.

No modifica producción.

## Comunicación

Al terminar una tarea, reportar de forma concisa:

1. qué cambió o se revisó;
2. verificaciones realmente ejecutadas;
3. fallos o cobertura faltante;
4. próximo paso solo si es necesario.
