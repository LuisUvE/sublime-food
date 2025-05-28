# Documentación Detallada de Sublime Food

## 1. Estructura Base (App.jsx)

### Componentes y Rutas
```jsx
<RequirementsProvider>
  <CartProvider>
    <Cart />
    <Router>
      <Routes>
        <Route path="/" element={<Requirements />} />
        <Route path="/products" element={<Checkout />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  </CartProvider>
</RequirementsProvider>
```

#### ¿Qué hace cada parte?
1. **RequirementsProvider**:
   - Envuelve toda la aplicación
   - Almacena información del usuario:
     - Nombre
     - Presupuesto
     - Dirección
     - Tipo de entrega
   - Permite acceder a estos datos desde cualquier componente

2. **CartProvider**:
   - Maneja el carrito de compras
   - Guarda los productos seleccionados
   - Calcula totales
   - Permite agregar/quitar productos

3. **Cart**:
   - Componente siempre visible
   - Muestra resumen de compra
   - Permite finalizar la compra

4. **Rutas**:
   - `/`: Página inicial (Requirements)
   - `/products`: Catálogo de productos (Checkout)
   - `/recipe/:id`: Detalles de una receta específica

## 2. Gestión del Carrito (CartContext.jsx)

### Estados y Funciones
```jsx
const [cartItems, setCartItems] = useState([]);
const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
```

#### Funcionalidades Detalladas

1. **Estado del Carrito (`cartItems`)**:
   - Array de objetos con estructura:
     ```javascript
     {
       name: "Nombre del producto",
       price: "Precio en COP",
       quantity: número de unidades,
       // otros detalles del producto
     }
     ```

2. **Función addToCart**:
   ```javascript
   const addToCart = (product) => {
     // Busca si el producto existe
     const existingItem = prevItems.find(item => item.name === product.name);
     
     if (existingItem) {
       // Si existe, aumenta la cantidad
       return prevItems.map(item => 
         item.name === product.name 
           ? { ...item, quantity: item.quantity + 1 }
           : item
       );
     }
     
     // Si no existe, lo agrega nuevo
     return [...prevItems, { ...product, quantity: 1 }];
   }
   ```
   - Verifica si el producto ya está en el carrito
   - Si existe: aumenta la cantidad
   - Si no existe: lo agrega como nuevo item
   - Mantiene la inmutabilidad del estado

3. **Función removeFromCart**:
   ```javascript
   const removeFromCart = (productName) => {
     // Encuentra el producto
     const existingItem = prevItems.find(item => item.name === productName);
     
     if (existingItem.quantity > 1) {
       // Reduce la cantidad
       return prevItems.map(/*...*/);
     } else {
       // Elimina el producto
       return prevItems.filter(item => item.name !== productName);
     }
   }
   ```
   - Busca el producto por nombre
   - Si hay más de uno: reduce la cantidad
   - Si solo hay uno: elimina el producto
   - Mantiene la inmutabilidad del estado

## 3. Gestión de Requisitos (RequirementsContext.jsx)

### Estado Inicial
```javascript
const [requirements, setRequirements] = useState({
    nombre: '',           // Nombre del cliente
    presupuesto: 0,      // Límite de gasto
    direccion: '',       // Dirección de entrega
    tipoEntrega: 'domicilio', // Método de entrega
});
```

#### Detalles de Cada Campo
1. **nombre**:
   - Almacena el nombre del cliente
   - Usado para personalizar mensajes
   - Requerido para el proceso de compra

2. **presupuesto**:
   - Límite máximo de gasto
   - Usado para validar adiciones al carrito
   - Formato: número en COP

3. **direccion**:
   - Dirección de entrega
   - Requerida solo si tipoEntrega es 'domicilio'

4. **tipoEntrega**:
   - Valores posibles: 'domicilio' o 'retiro'
   - Afecta el costo total (domicilio +$10,000)
   - Determina campos requeridos

## 4. Página de Productos (Checkout.jsx)

### Estados Principales
```javascript
const [page, setPage] = useState(1);
const [filteredRecipes, setFilteredRecipes] = useState([]);
const [displayedItems, setDisplayedItems] = useState([]);
```

#### Funcionalidades Detalladas

1. **Inicialización**:
   ```javascript
   useEffect(() => {
     if (recipes && recipes.length > 0) {
       setFilteredRecipes(recipes);
       setDisplayedItems(recipes.slice(0, PAGE_SIZE));
       setIsLoading(false);
     }
   }, []);
   ```
   - Carga inicial de recetas
   - Muestra primeros 8 productos
   - Configura scroll infinito

2. **Sistema de Filtros**:
   ```javascript
   useEffect(() => {
     let filtered = [...recipes];
     
     // Filtro por cocina
     if (cuisineFilter) {
       filtered = filtered.filter(r => r.cuisine === cuisineFilter);
     }
     
     // Filtro por texto
     if (textFilter) {
       filtered = filtered.filter(r =>
         r.name.toLowerCase().includes(textFilter.toLowerCase())
       );
     }
   }, [cuisineFilter, textFilter]);
   ```
   - Filtro por tipo de cocina (italiana, mexicana, asiática)
   - Búsqueda por nombre
   - Actualización automática de resultados

3. **Scroll Infinito**:
   ```javascript
   const fetchMoreData = () => {
     let nextPage = page + 1;
     let start = page * PAGE_SIZE;
     let end = nextPage * PAGE_SIZE;
     
     let nextItems = filteredRecipes.slice(start, end);
     // ... lógica de paginación
   };
   ```
   - Carga 8 productos por página
   - Manejo de estado de carga
   - Reinicio al llegar al final

4. **Validación de Compra**:
   ```javascript
   const handleAddToCart = (product) => {
     // Calcula total actual
     const totalCurrent = cartItems.reduce(/*...*/);
     
     // Valida presupuesto
     if (totalCurrent + productPrice > requirements.presupuesto) {
       alert("No puedes agregar este producto...");
       return;
     }
     addToCart(product);
   };
   ```
   - Verifica presupuesto disponible
   - Calcula totales
   - Muestra alertas
   - Agrega al carrito si es válido

## 5. Proceso de Compra Completo

### Flujo del Usuario
1. **Ingreso de Requisitos**:
   - Nombre
   - Presupuesto
   - Dirección (si aplica)
   - Tipo de entrega

2. **Navegación de Productos**:
   - Ver catálogo
   - Aplicar filtros
   - Scroll infinito

3. **Gestión del Carrito**:
   - Agregar productos
   - Ver total
   - Validar presupuesto

4. **Finalización de Compra**:
   - Revisar carrito
   - Confirmar datos
   - Procesar pago

### Validaciones en Cada Paso
1. **Requisitos**:
   - Campos obligatorios
   - Presupuesto válido
   - Dirección si es domicilio

2. **Productos**:
   - Stock disponible
   - Precio dentro de presupuesto
   - Límites de cantidad

3. **Carrito**:
   - Total vs Presupuesto
   - Cantidades válidas
   - Datos de entrega

## 6. Componente RecipeCard

### Estructura del Componente
```jsx
<article className="recipe-card">
    <Link to={`/recipe/${recipe.name}`}>
        <img src={recipe.image} alt={recipe.name} />
    </Link>
    <h3>{recipe.name}</h3>
    <div className="weight">{recipe.weight}</div>
    <div className="price">{formatPrice(recipe.price)}</div>
    <section className="nutrition-info">
        {/* Información nutricional */}
    </section>
    <button onClick={() => addToCart(recipe)}>AÑADIR</button>
</article>
```

### Funcionalidades Detalladas

1. **Presentación de Producto**:
   - Imagen del producto con carga lazy
   - Nombre con enlace a detalles
   - Peso del producto
   - Precio formateado en COP

2. **Información Nutricional**:
   ```jsx
   <section className="nutrition-info">
     <div className="nutrition-item">
       <img src="..." alt="Calorías" />
       <span className="value">{recipe.calories}</span>
       <span className="label">Calorías</span>
     </div>
     // Similar para grasas, carbohidratos y proteínas
   </section>
   ```
   - Calorías totales
   - Grasas en gramos
   - Carbohidratos en gramos
   - Proteínas en gramos
   - Iconos ilustrativos para cada valor

3. **Formateo de Precio**:
   ```javascript
   const formatPrice = (price) => {
       return new Intl.NumberFormat('es-CO', {
           style: 'currency',
           currency: 'COP',
           minimumFractionDigits: 0,
           maximumFractionDigits: 0
       }).format(price);
   };
   ```
   - Formato de moneda colombiana
   - Sin decimales
   - Símbolo de peso incluido

4. **Interactividad**:
   - Enlace al detalle del producto
   - Botón de "AÑADIR" al carrito
   - Integración con CartContext

5. **Accesibilidad**:
   - Atributos ARIA para mejor navegación
   - Textos alternativos en imágenes
   - Enlaces descriptivos
   - Carga lazy de imágenes

### Estructura de Datos
```javascript
recipe = {
    name: "Nombre del producto",
    image: "URL de la imagen",
    weight: "Peso del producto",
    price: "Precio en números",
    calories: "Calorías totales",
    fats: "Gramos de grasa",
    carbs: "Gramos de carbohidratos",
    proteins: "Gramos de proteína"
}
```

### Integración con el Sistema

1. **Navegación**:
   - Enlaces a páginas de detalle
   - URLs amigables con nombres codificados

2. **Carrito**:
   - Integración directa con CartContext
   - Función addToCart accesible
   - Actualización inmediata del carrito

3. **Rendimiento**:
   - Carga lazy de imágenes
   - Optimización de re-renders
   - Formateo eficiente de precios

4. **Estilos**:
   - Diseño responsivo
   - Animaciones suaves
   - Iconografía consistente
   - Información nutricional clara

Esta documentación detallada cubre todos los aspectos principales del sistema, desde la estructura base hasta los componentes más específicos. 