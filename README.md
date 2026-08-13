# Sistema de Matrícula Académica

Prueba técnica en React: una aplicación donde un estudiante selecciona y matricula
cursos de su semestre actual, respetando cupos disponibles y el límite de créditos
permitido.

## Instrucciones para ejecutar la aplicación

Requisitos: Node.js 18+ y npm.

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

Para generar una build de producción:

```bash
npm run build
npm run preview
```

### Cómo probarla

En la pantalla de inicio de sesión puedes ingresar cualquiera de estos IDs
(definidos en `src/data/students.json`), cada uno pensado para cubrir un caso
distinto de las validaciones pedidas:

| ID | Estudiante | Semestre | Créditos permitidos | Caso que demuestra |
|----|------------|----------|----------------------|---------------------|
| 101 | Juan Pérez | 2° | 20 | Caso normal (el dado en el enunciado) |
| 102 | María Gómez | 1° | 18 | Cursos de otro semestre |
| 103 | Carlos Ramírez | 2° | 7 | Bloqueo por límite de créditos casi de inmediato |
| 104 | Laura Torres | 2° | 20 | `matriculado: false` → no puede seleccionar ningún curso |
| 105 | Andrés Rojas | 1° | 30 | Puede matricular varios/todos los cursos de su semestre |

## Decisiones tomadas durante el desarrollo

- **Estructura del proyecto:** separé el código por responsabilidad —
  `components/` (UI), `hooks/` (lógica de estado, `useEnrollment`), `utils/`
  (validaciones y persistencia) y `data/` (los JSON simulados del enunciado) —
  para que cada pieza sea fácil de ubicar y probar de forma aislada.
- **Manejo de estado:** usé `useState` en un hook personalizado
  (`useEnrollment`) en lugar de Redux/Context, ya que el estado es local a la
  sesión de matrícula y no se comparte entre árboles de componentes distantes.
  Esto cumple el requisito de forma más simple sin perder organización.
- **Validaciones centralizadas:** todas las reglas de negocio
  (`src/utils/validations.js`) viven en un solo lugar y se reutilizan tanto para
  habilitar/deshabilitar botones en la UI como para bloquear la confirmación
  final, evitando que la interfaz y la lógica de negocio se desincronicen.
  Se valida: estudiante matriculado en el periodo, curso del semestre correcto,
  cupos disponibles (`limiteCupos - matriculados`) y que la suma de créditos
  seleccionados no supere `creditosPermitidos`.
- **Listado de cursos:** se muestran todos los cursos del semestre del
  estudiante (matriculables) y, en una sección aparte y visualmente atenuada,
  los cursos de otros semestres (no matriculables), para que el usuario entienda
  por qué no puede seleccionarlos en lugar de simplemente ocultarlos.
- **Persistencia:** dado que no hay backend real, la matrícula confirmada se
  guarda en `localStorage` (agrupada por ID de estudiante) mediante
  `src/utils/storage.js`. Al volver a entrar con el mismo ID se recupera el
  comprobante ya confirmado.
- **Login:** es opcional según el enunciado, pero lo implementé como puerta de
  entrada simple (sin contraseña) que valida el ID contra `students.json`,
  ya que las validaciones del negocio (crédito permitidos, semestre, estado de
  matrícula) dependen de tener un estudiante identificado.
- **Diseño:** interfaz con estética de "libro de registro académico" (tinta
  oscura + página color papel + acentos dorados tipo sello), con un indicador
  circular de créditos usados/permitidos como elemento distintivo. Diseño libre
  según el enunciado, priorizando legibilidad y jerarquía clara sobre
  cursos matriculables vs. no matriculables.

## Limitaciones y aspectos no implementados

- No hay backend real ni autenticación con contraseña; el "login" solo verifica
  que el ID exista en los datos simulados.
- `src/data/students.json` incluye 5 estudiantes de prueba pensados para
  cubrir los distintos casos de validación (ver tabla arriba); se puede
  agregar más entradas siguiendo el mismo formato.
- La disminución de cupos al confirmar una matrícula no se persiste sobre
  `courses.json` (los cupos se reinician en cada carga), ya que los cursos se
  tratan como catálogo estático simulado, tal como lo pide el enunciado.
- No se incluyeron pruebas automatizadas (unit tests) por el alcance de la
  prueba técnica; la lógica de validación está aislada en `utils/validations.js`
  precisamente para que sea fácil de testear si se requiere.
