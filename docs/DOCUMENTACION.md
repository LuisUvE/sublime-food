# Documentación Sublime Food

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Componentes Principales](#componentes-principales)
5. [Gestión de Estado](#gestión-de-estado)
6. [Rutas de la Aplicación](#rutas-de-la-aplicación)

## Descripción General
Sublime Food es una aplicación web desarrollada en React que permite a los usuarios explorar recetas, gestionar un carrito de compras y realizar pedidos de comida. La aplicación está diseñada con una arquitectura moderna y componentes reutilizables.

## Estructura del Proyecto
```
sublime-food/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas principales
│   ├── context/       # Gestión de estado global
│   ├── styles/        # Archivos CSS y estilos
│   ├── data/          # Datos estáticos y configuraciones
│   ├── App.jsx        # Componente principal
│   └── index.js       # Punto de entrada
├── public/            # Archivos estáticos
└── package.json       # Dependencias y scripts
```

## Tecnologías Utilizadas
- **React**: v19.1.0 - Biblioteca principal para la interfaz de usuario
- **React Router DOM**: v7.6.0 - Navegación entre páginas
- **React Infinite Scroll**: v6.1.0 - Implementación de scroll infinito
- **Testing Library**: Suite de herramientas para testing

## Componentes Principales

### App.jsx
El componente raíz que configura:
- Proveedores de contexto (CartProvider, RequirementsProvider)
- Sistema de rutas
- Estructura base de la aplicación

### Páginas Principales
1. **Requirements** (`/pages/Requirements`)
   - Página principal
   - Muestra los requisitos iniciales

2. **Checkout** (`/pages/Checkout`)
   - Gestión de productos
   - Proceso de compra

3. **RecipeDetail** (`/pages/RecipeDetail`)
   - Detalles específicos de cada receta
   - Ruta dinámica con ID de receta

### Componentes Comunes
- **Cart**: Componente del carrito de compras
- Otros componentes (se actualizará según análisis)

## Gestión de Estado
La aplicación utiliza el Context API de React para la gestión del estado global:

1. **CartContext**
   - Gestión del carrito de compras
   - Estado de productos seleccionados

2. **RequirementsContext**
   - Gestión de requisitos
   - Configuraciones generales

## Rutas de la Aplicación
```
/                   -> Página de Requisitos
/products           -> Página de Checkout
/recipe/:id         -> Detalles de Receta Específica
```

## Dependencias Principales
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.0",
  "react-infinite-scroll-component": "^6.1.0"
}
```

## Componentes Detallados

### CartContext
El contexto del carrito (`src/context/CartContext.jsx`) maneja el estado global del carrito de compras:

#### Estado
- `cartItems`: Array de productos en el carrito
- `totalQuantity`: Cantidad total de items en el carrito

#### Funciones
- `addToCart(product)`: Agrega un producto al carrito
  - Si el producto ya existe, incrementa su cantidad
  - Si es nuevo, lo agrega con cantidad 1
- `removeFromCart(productName)`: Elimina un producto del carrito
  - Si hay más de uno, reduce la cantidad
  - Si solo hay uno, elimina el item completamente

### Cart Component
El componente Cart (`src/components/Cart.jsx`) es el componente visual del carrito:

#### Características
- Muestra los productos en el carrito
- Calcula el total de la compra
- Maneja el proceso de pago
- Incluye validación de formulario de pago

#### Funcionalidades
1. **Gestión de Precios**
   - Formateo de precios en formato COP
   - Cálculo de total con/sin domicilio
   - Costo de domicilio: $10,000

2. **Formulario de Pago**
   - Validación de tarjeta de crédito
   - Formato automático de número de tarjeta (XXXX XXXX XXXX XXXX)
   - Validación de fecha de expiración
   - Validación de CVV
   - Validación de dirección y nombre

3. **Estados**
   - `isOpen`: Controla la visibilidad del carrito
   - `isPaying`: Controla la visibilidad del formulario de pago
   - `formData`: Gestiona los datos del formulario
   - `errors`: Maneja los errores de validación

4. **Validaciones**
   - Número de tarjeta (16 dígitos)
   - Fecha de expiración válida y no vencida
   - CVV (3-4 dígitos)
   - Campos requeridos
   - Validación de presupuesto

### RequirementsContext
El contexto de requisitos (`src/context/RequirementsContext.jsx`) gestiona la información inicial del usuario:

#### Estado
- `nombre`: Nombre del usuario
- `presupuesto`: Presupuesto máximo para la compra
- `direccion`: Dirección de entrega
- `tipoEntrega`: Método de entrega ('domicilio' o 'retiro')

### Página de Requirements
La página de requisitos (`src/pages/Requirements.jsx`) es el punto de entrada de la aplicación:

#### Características
1. **Formulario de Captura**
   - Nombre del usuario (máximo 20 caracteres)
   - Presupuesto máximo en COP
   - Dirección de entrega
   - Tipo de entrega (domicilio/retiro en tienda)

2. **Validaciones**
   - Nombre: obligatorio, máximo 20 caracteres
   - Presupuesto: obligatorio, número positivo
   - Dirección: obligatoria
   - Tipo de entrega: valor válido ('domicilio' o 'retiro')

3. **Gestión de Estado**
   - Estado local para el formulario
   - Estado global via RequirementsContext
   - Manejo de errores de validación

4. **Navegación**
   - Redirección a '/products' tras validación exitosa
   - Persistencia de datos en el contexto

#### Flujo de Usuario
```
Usuario ingresa datos
→ Validación en tiempo real
→ Submit del formulario
→ Validación final
→ Actualización del contexto
→ Redirección a productos
```

## Integración de Componentes

### Flujo de Datos Completo

1. **Inicio de la Aplicación**
   ```
   Carga de Requirements
   → Usuario ingresa datos
   → Validación y guardado en RequirementsContext
   → Redirección a productos
   ```

2. **Proceso de Compra**
   ```
   Selección de productos
   → Validación contra presupuesto
   → Gestión del carrito
   → Proceso de pago
   ```

3. **Finalización**
   ```
   Validación final
   → Procesamiento de pago
   → Confirmación
   → Limpieza de estado
   ```

## Validaciones del Sistema

### Validaciones de Requisitos
1. **Nombre**
   - Campo obligatorio
   - Máximo 20 caracteres
   - Eliminación de espacios en blanco extras

2. **Presupuesto**
   - Campo obligatorio
   - Valor numérico
   - Mayor que cero
   - Formato COP

3. **Dirección**
   - Campo obligatorio
   - Validación de contenido

4. **Tipo de Entrega**
   - Valores permitidos: 'domicilio' o 'retiro'
   - Impacto en costo final (domicilio +$10,000)

### Validaciones de Negocio
1. **Presupuesto vs Total**
   - Verificación continua del total contra presupuesto
   - Alertas al usuario cuando se acerca al límite
   - Bloqueo de compra si excede presupuesto

2. **Tipo de Entrega**
   - Validación de dirección para domicilios
   - Ajuste de costos según tipo de entrega

## Mejores Prácticas de UX

1. **Formularios**
   - Validación en tiempo real
   - Mensajes de error claros
   - Límites de caracteres visibles
   - Formato de números automático

2. **Navegación**
   - Flujo intuitivo
   - Retroalimentación inmediata
   - Prevención de errores

3. **Accesibilidad**
   - Atributos ARIA
   - Mensajes de error asociados a campos
   - Navegación por teclado
   - Contraste adecuado

## Mantenimiento y Escalabilidad

1. **Estructura del Código**
   - Separación de responsabilidades
   - Componentes reutilizables
   - Contextos para estado global
   - Validaciones centralizadas

2. **Posibles Mejoras**
   - Persistencia de datos
   - Historial de pedidos
   - Integración con APIs de pagos
   - Gestión de usuarios

Esta documentación proporciona una visión completa del sistema y su funcionamiento.

## Páginas Principales

### Página de Checkout (Productos)
La página de productos (`src/pages/Checkout.jsx`) es donde los usuarios seleccionan sus productos:

#### Características Principales
1. **Visualización de Productos**
   - Scroll infinito con paginación
   - Tamaño de página: 8 productos
   - Tarjetas de recetas con información detallada

2. **Sistema de Filtros**
   - Filtro por tipo de cocina (italiana, mexicana, asiática)
   - Búsqueda por nombre de receta
   - Limpieza de filtros

3. **Gestión de Productos**
   - Validación de presupuesto al agregar productos
   - Integración con el carrito de compras
   - Actualización en tiempo real del total

#### Componentes y Funcionalidades

1. **Scroll Infinito**
   ```javascript
   - Implementado con react-infinite-scroll-component
   - Carga dinámica de productos
   - Manejo de estados de carga
   ```

2. **Filtros**
   - Filtro de cocina mediante select
   - Filtro de texto para búsqueda
   - Actualización automática de resultados

3. **Validaciones**
   - Control de presupuesto disponible
   - Verificación de productos válidos
   - Alertas al usuario

#### Estados
1. **Estado Local**
   - `page`: Control de paginación
   - `filteredRecipes`: Recetas filtradas
   - `displayedItems`: Items mostrados
   - `isLoading`: Estado de carga
   - `hasMore`: Control de scroll infinito

2. **Filtros**
   - `cuisineFilter`: Tipo de cocina
   - `textFilter`: Búsqueda por texto

#### Integración con Contextos
1. **RequirementsContext**
   - Acceso al presupuesto del usuario
   - Validaciones de compra

2. **CartContext**
   - Agregar productos al carrito
   - Validación de límites

## Flujo de Compra Completo

1. **Selección de Productos**
   ```
   Usuario navega productos
   → Aplica filtros si necesario
   → Selecciona productos
   → Validación de presupuesto
   → Agregado al carrito
   ```

2. **Gestión de Presupuesto**
   ```
   Verificación de precio
   → Cálculo de total actual
   → Validación contra presupuesto
   → Alerta si excede límite
   ```

3. **Experiencia de Usuario**
   - Carga progresiva de productos
   - Filtros intuitivos
   - Feedback inmediato
   - Alertas claras

## Aspectos Técnicos

### Optimizaciones
1. **Rendimiento**
   - Paginación eficiente
   - Carga bajo demanda
   - Filtrado optimizado

2. **UX/UI**
   - Indicadores de carga
   - Mensajes de estado
   - Interfaz responsiva

### Manejo de Datos
1. **Productos**
   - Datos estáticos en `src/data/recipes`
   - Estructura consistente
   - Precios formateados

2. **Filtros**
   - Aplicación en tiempo real
   - Combinación de múltiples filtros
   - Reset de estado

Esta documentación cubre los aspectos principales del sistema de productos y su integración con el resto de la aplicación. 