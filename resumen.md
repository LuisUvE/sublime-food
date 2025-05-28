on # Resumen del Proyecto Sublime Food

## 1. Estructura del Proyecto
```
src/
  ├── components/         // Componentes reutilizables
  │   ├── Cart.jsx       // Carrito de compras
  │   ├── RecipeCard.jsx // Tarjeta de producto
  │   └── RecipeList.jsx // Lista de productos
  ├── context/           // Gestión de estado global
  │   ├── CartContext.jsx
  │   └── RequirementsContext.jsx
  ├── pages/             // Páginas principales
  │   ├── Requirements.jsx
  │   ├── Checkout.jsx
  │   └── RecipeDetail.jsx
  └── App.jsx            // Componente principal
```

## 2. Flujo de la Aplicación

### Paso 1: Requisitos Iniciales
- Usuario llega a la página principal
- Completa formulario con:
  - Nombre
  - Presupuesto
  - Dirección
  - Tipo de entrega (domicilio/retiro)

### Paso 2: Catálogo de Productos
- Visualización de recetas
- Sistema de filtros:
  - Por tipo de cocina
  - Por nombre
- Scroll infinito (8 productos por página)

### Paso 3: Gestión del Carrito
- Agregar/remover productos
- Validación contra presupuesto
- Cálculo de totales
- Persistente en toda la app

### Paso 4: Proceso de Pago
- Formulario de pago
- Validaciones de tarjeta
- Confirmación de compra
- Limpieza post-pago

## 3. Características Técnicas Importantes

### Gestión de Estado
```jsx
// Estado Global (Context API)
- CartContext
  - cartItems
  - addToCart
  - removeFromCart
  - totalQuantity

- RequirementsContext
  - nombre
  - presupuesto
  - direccion
  - tipoEntrega
```

### Validaciones Principales
```jsx
// Presupuesto
if (totalCurrent + productPrice > requirements.presupuesto) {
    alert("Supera el presupuesto");
    return;
}

// Tarjeta
const isValidCardNumber = (number) => {
    const digits = number.replace(/\D/g, '');
    return digits.length === 16;
};

// Fecha Expiración
const isValidExpiryDate = (value) => {
    if (!value.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) return false;
    // Validación de fecha no vencida
};
```

## 4. Scroll Infinito

### Configuración
```jsx
const PAGE_SIZE = 8;
const [page, setPage] = useState(1);
const [displayedItems, setDisplayedItems] = useState([]);
```

### Funcionamiento
1. Muestra primeros 8 productos
2. Al hacer scroll cerca del final:
   - Carga siguientes 8 productos
   - Muestra loader mientras carga
3. Al llegar al final:
   - Vuelve a empezar (scroll circular)
4. Integración con filtros:
   - Reinicia paginación
   - Mantiene filtros activos

## 5. Formulario de Pago

### Estados
```jsx
const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    tarjeta: "",
    fechaExp: "",
    cvv: ""
});
```

### Validaciones
- Nombre completo requerido
- Dirección válida
- Número de tarjeta (16 dígitos)
- Fecha de expiración válida
- CVV (3-4 dígitos)

### Proceso
1. Validación de campos
2. Verificación de presupuesto
3. Procesamiento de pago
4. Confirmación y limpieza

## 6. Optimizaciones

### Rendimiento
```jsx
// Lazy Loading
<img loading="lazy" src={recipe.image} />

// Paginación Eficiente
const PAGE_SIZE = 8;

// Memoización
const MemoizedComponent = React.memo(Component);
```

### Seguridad
- Validación de inputs
- Sanitización de datos
- Protección de información sensible
- Manejo seguro de pagos

## 7. Mejores Prácticas

### Código Limpio
- Nombres descriptivos
- Funciones pequeñas y específicas
- Comentarios explicativos
- Estructura modular

### Accesibilidad
- Atributos ARIA
- Manejo de teclado
- Textos alternativos
- Contraste adecuado

### Responsive Design
- Grid layout
- Media queries
- Unidades relativas
- Diseño adaptativo

## 8. Puntos Clave para Entrevista

### Arquitectura
- Modular y escalable
- Fácil mantenimiento
- Separación de responsabilidades
- Reutilización de componentes

### Experiencia de Usuario
- Feedback inmediato
- Validaciones claras
- Navegación intuitiva
- Interfaz responsiva

### Seguridad
- Validación de datos
- Protección de información
- Manejo seguro de pagos
- Control de presupuesto

### Performance
- Carga optimizada
- Renderizado eficiente
- Gestión de recursos
- Scroll infinito optimizado

## 9. Hooks y Funcionalidades Principales

### useState en el Proyecto

#### En Requirements.jsx
```jsx
// Estado del formulario
const [form, setForm] = useState({
    nombre: requirements.nombre,
    presupuesto: requirements.presupuesto,
    direccion: requirements.direccion,
    tipoEntrega: requirements.tipoEntrega,
});

// Estado de errores
const [errors, setErrors] = useState({});
```

#### En Checkout.jsx
```jsx
// Estados para el catálogo
const [page, setPage] = useState(1);
const [filteredRecipes, setFilteredRecipes] = useState([]);
const [cuisineFilter, setCuisineFilter] = useState("");
const [textFilter, setTextFilter] = useState("");
const [displayedItems, setDisplayedItems] = useState([]);
const [isLoading, setIsLoading] = useState(true);
```

### useContext en el Proyecto

#### Definición de Contextos
```jsx
// CartContext.jsx
export const CartContext = createContext();

// RequirementsContext.jsx
export const RequirementsContext = createContext();
```

#### Uso en Componentes
```jsx
// En RecipeCard.jsx
const { addToCart } = useContext(CartContext);

// En Checkout.jsx
const { requirements } = useContext(RequirementsContext);
const { cartItems, addToCart } = useContext(CartContext);
```

### useEffect en el Proyecto

#### Inicialización de Datos
```jsx
// En Checkout.jsx - Carga inicial
useEffect(() => {
    if (recipes && recipes.length > 0) {
        setFilteredRecipes(recipes);
        setDisplayedItems(recipes.slice(0, PAGE_SIZE));
        setIsLoading(false);
        setHasMore(recipes.length > PAGE_SIZE);
    }
}, []); // Se ejecuta solo al montar

// Sistema de Filtros
useEffect(() => {
    if (!recipes) return;
    let filtered = [...recipes];
    
    if (cuisineFilter) {
        filtered = filtered.filter(r => r.cuisine === cuisineFilter);
    }
    if (textFilter) {
        filtered = filtered.filter(r =>
            r.name.toLowerCase().includes(textFilter.toLowerCase())
        );
    }
    
    setFilteredRecipes(filtered);
    setDisplayedItems(filtered.slice(0, PAGE_SIZE));
    setPage(1);
}, [cuisineFilter, textFilter]); // Se ejecuta cuando cambian los filtros
```

### Scroll Infinito Detallado

#### Configuración Base
```jsx
const PAGE_SIZE = 8;  // Productos por página
const [page, setPage] = useState(1);
const [displayedItems, setDisplayedItems] = useState([]);
const [hasMore, setHasMore] = useState(true);
```

#### Función de Carga
```jsx
const fetchMoreData = () => {
    if (!filteredRecipes || filteredRecipes.length === 0) return;

    let nextPage = page + 1;
    let start = page * PAGE_SIZE;
    let end = nextPage * PAGE_SIZE;

    let nextItems = filteredRecipes.slice(start, end);

    // Sistema circular
    if (nextItems.length === 0) {
        start = 0;
        end = PAGE_SIZE;
        nextItems = filteredRecipes.slice(start, end);
        nextPage = 1;
    }

    setDisplayedItems(prev => [...prev, ...nextItems]);
    setPage(nextPage);
};
```

#### Componente InfiniteScroll
```jsx
<InfiniteScroll
    dataLength={displayedItems.length}
    next={fetchMoreData}
    hasMore={true}
    loader={<p className="loading">Cargando productos...</p>}
>
    <main className="app-container">
        {displayedItems.map((recipe, index) => (
            <RecipeCard
                key={`${recipe.name}-${index}`}
                recipe={recipe}
                addToCart={handleAddToCart}
            />
        ))}
    </main>
</InfiniteScroll>
```

### Gestión del Carrito Detallada

#### Estado del Carrito
```jsx
const [cartItems, setCartItems] = useState([]);
const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
```

#### Funciones Principales
```jsx
// Agregar al carrito
const addToCart = (product) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.name === product.name);
        
        if (existingItem) {
            return prevItems.map(item => 
                item.name === product.name 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        
        return [...prevItems, { ...product, quantity: 1 }];
    });
};

// Remover del carrito
const removeFromCart = (productName) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.name === productName);
        
        if (existingItem.quantity > 1) {
            return prevItems.map(item =>
                item.name === productName
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        } else {
            return prevItems.filter(item => item.name !== productName);
        }
    });
};
```

### Sistema de Validaciones Detallado

#### Validación de Formulario
```jsx
const validate = () => {
    const newErrors = {};
    
    // Validación de nombre
    if (!form.nombre.trim()) {
        newErrors.nombre = 'El nombre es obligatorio.';
    } else if (form.nombre.trim().length > 20) {
        newErrors.nombre = 'El nombre no puede tener más de 20 caracteres.';
    }
    
    // Validación de presupuesto
    if (!form.presupuesto || isNaN(form.presupuesto)) {
        newErrors.presupuesto = 'El presupuesto es obligatorio y debe ser un número.';
    } else if (Number(form.presupuesto) <= 0) {
        newErrors.presupuesto = 'El presupuesto debe ser mayor que cero.';
    }
    
    // Validación de dirección
    if (!form.direccion.trim()) {
        newErrors.direccion = 'La dirección es obligatoria.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
```

#### Validación de Tarjeta
```jsx
const validateCardInfo = () => {
    // Validación de número de tarjeta
    const cardNumber = formData.tarjeta.replace(/\s/g, '');
    if (!isValidCardNumber(cardNumber)) {
        return false;
    }
    
    // Validación de fecha de expiración
    if (!isValidExpiryDate(formData.fechaExp)) {
        return false;
    }
    
    // Validación de CVV
    if (!formData.cvv.match(/^\d{3,4}$/)) {
        return false;
    }
    
    return true;
};
```

### Manejo de Efectos Secundarios

#### Limpieza de Recursos
```jsx
useEffect(() => {
    // Efecto
    const handler = () => {
        // Lógica del efecto
    };
    
    // Suscripción al evento
    window.addEventListener('scroll', handler);
    
    // Limpieza
    return () => {
        window.removeEventListener('scroll', handler);
    };
}, []);
```

#### Actualización de Datos
```jsx
useEffect(() => {
    // Actualiza totales cuando cambia el carrito
    const newTotal = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
    setTotal(newTotal);
}, [cartItems]);
```

## 10. Preguntas y Conceptos Críticos

### Preguntas Técnicas Frecuentes

1. **¿Por qué usar Context API en lugar de Redux?**
```jsx
// Respuesta:
- Proyecto de tamaño medio
- Estado global simple
- No necesitamos middleware
- Reducción de complejidad
- Integración nativa con React
```

2. **¿Cómo manejas la memoria en el scroll infinito?**
```jsx
// Respuesta:
- Paginación con tamaño fijo (PAGE_SIZE = 8)
- Carga bajo demanda
- Limpieza de elementos no visibles
- Optimización de imágenes con lazy loading
```

3. **¿Cómo garantizas la seguridad en el proceso de pago?**
```jsx
// Respuesta:
- Validación en frontend y backend
- Sanitización de inputs
- No almacenamiento de datos sensibles
- Uso de HTTPS
- Tokenización de datos de tarjeta
```

4. **¿Cómo manejas los errores en la aplicación?**
```jsx
// Sistema de manejo de errores
try {
    // Operaciones críticas
} catch (error) {
    // Clasificación de errores
    if (error instanceof ValidationError) {
        setErrors(error.details);
    } else if (error instanceof NetworkError) {
        showNetworkError();
    } else {
        logError(error);
    }
}
```

### Conceptos Críticos

1. **Ciclo de Vida en Hooks**
```jsx
// Equivalencias con ciclos de vida tradicionales
// ComponentDidMount
useEffect(() => {
    // código
}, []);

// ComponentDidUpdate
useEffect(() => {
    // código
}, [dependencia]);

// ComponentWillUnmount
useEffect(() => {
    return () => {
        // limpieza
    };
}, []);
```

2. **Optimización de Rendimiento**
```jsx
// Memorización de componentes
const MemoizedComponent = React.memo(Component);

// Memorización de valores
const memoizedValue = useMemo(() => computeValue(a, b), [a, b]);

// Memorización de funciones
const memoizedCallback = useCallback(
    () => {
        doSomething(a, b);
    },
    [a, b],
);
```

3. **Patrones de Diseño Implementados**
```jsx
// Compound Components
const Cart = {
    Container: CartContainer,
    Item: CartItem,
    Total: CartTotal
};

// Render Props
<CartContext.Consumer>
    {(cart) => (
        // Renderizado condicional
    )}
</CartContext.Consumer>

// Custom Hooks
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
```

### Puntos Técnicos Avanzados

1. **Manejo de Referencias**
```jsx
// Uso de refs para elementos DOM
const scrollRef = useRef(null);

// Acceso a valores previos
const prevCount = useRef(count);
useEffect(() => {
    prevCount.current = count;
}, [count]);
```

2. **Optimización de Listas**
```jsx
// Virtualización de listas largas
<VirtualList
    height={400}
    itemCount={items.length}
    itemSize={50}
    width={300}
>
    {({ index, style }) => (
        <div style={style}>
            {items[index]}
        </div>
    )}
</VirtualList>
```

3. **Manejo de Estado Asíncrono**
```jsx
// Control de carreras de condiciones
useEffect(() => {
    let isSubscribed = true;

    async function fetchData() {
        try {
            const data = await api.getData();
            if (isSubscribed) {
                setData(data);
            }
        } catch (error) {
            if (isSubscribed) {
                setError(error);
            }
        }
    }

    fetchData();

    return () => {
        isSubscribed = false;
    };
}, []);
```

### Consideraciones de Producción

1. **Monitoreo y Logging**
```jsx
// Sistema de tracking de errores
const errorTracker = {
    log: (error, context) => {
        console.error(error);
        // Enviar a servicio de monitoreo
    },
    warn: (message) => {
        console.warn(message);
        // Registrar advertencia
    }
};
```

2. **Performance Metrics**
```jsx
// Medición de rendimiento
const trackPerformance = (component) => {
    console.time(component);
    // Operación
    console.timeEnd(component);
};
```

3. **Accesibilidad (A11y)**
```jsx
// Implementaciones de accesibilidad
<button
    aria-label="Agregar al carrito"
    role="button"
    onKeyDown={(e) => {
        if (e.key === 'Enter') {
            addToCart(product);
        }
    }}
>
    Agregar
</button>
```

### Tips para la Entrevista

1. **Explica el flujo de datos**:
   - Context → Components → UI
   - User Action → State Update → Re-render

2. **Menciona las optimizaciones**:
   - Lazy loading
   - Memorización
   - Virtualización
   - Limpieza de efectos

3. **Destaca las buenas prácticas**:
   - Separación de responsabilidades
   - Reutilización de código
   - Manejo de errores
   - Testing (si aplica)

4. **Conoce las alternativas**:
   - Redux vs Context
   - Class vs Hooks
   - CSS-in-JS vs CSS Modules 

## 11. Conceptos Fundamentales de React

### Virtual DOM y Reconciliación
```jsx
// ¿Qué es el Virtual DOM?
- Es una representación ligera del DOM real
- React mantiene dos copias: Real y Virtual
- Cuando hay cambios, React:
  1. Actualiza el Virtual DOM
  2. Compara con el DOM real (diffing)
  3. Actualiza solo lo necesario (reconciliación)

// Ejemplo de actualización eficiente
const Component = () => {
    const [count, setCount] = useState(0);
    return (
        // Solo este número se actualiza, no todo el árbol
        <div>Contador: {count}</div>
    );
};
```

### Props vs State
```jsx
// Props (inmutables)
const ChildComponent = (props) => {
    // props no se pueden modificar
    return <div>{props.value}</div>;
};

// State (mutable)
const ParentComponent = () => {
    // Estado local que puede cambiar
    const [value, setValue] = useState(0);
    return <ChildComponent value={value} />;
};

// ¿Cuándo usar cada uno?
- Props: Para pasar datos de padre a hijo
- State: Para datos que cambian dentro del componente
```

### Ciclo de Vida con Hooks
```jsx
// Montaje
useEffect(() => {
    // ComponentDidMount
    console.log('Componente montado');
    
    // ComponentWillUnmount
    return () => {
        console.log('Componente desmontado');
    };
}, []);

// Actualización
useEffect(() => {
    // ComponentDidUpdate
    console.log('Prop o estado actualizado');
}, [prop, estado]);

// ¿Por qué usar Hooks?
- Más sencillos que las clases
- Reutilización de lógica
- Mejor manejo de efectos secundarios
```

### Renderizado Condicional
```jsx
// Operador ternario
{isLoggedIn ? <UserProfile /> : <LoginButton />}

// Operador &&
{isLoading && <LoadingSpinner />}

// Switch con objetos
const components = {
    draft: DraftComponent,
    published: PublishedComponent,
    archived: ArchivedComponent
};
return components[status] || DefaultComponent;
```

### Manejo de Eventos
```jsx
// Eventos sintéticos en React
const handleClick = (e) => {
    e.preventDefault(); // Previene comportamiento por defecto
    e.stopPropagation(); // Detiene propagación
};

// Paso de parámetros
<button onClick={(e) => handleClick(id, e)}>
    Click me
</button>
```

### Refs y DOM
```jsx
// Uso de refs
const inputRef = useRef(null);

useEffect(() => {
    // Acceso directo al DOM
    inputRef.current.focus();
}, []);

return <input ref={inputRef} />;

// ¿Cuándo usar refs?
- Manejo de focus
- Animaciones
- Integración con librerías third-party
```

### Componentes Controlados vs No Controlados
```jsx
// Controlado (el estado maneja el valor)
const [value, setValue] = useState('');
<input 
    value={value}
    onChange={e => setValue(e.target.value)}
/>;

// No Controlado (el DOM maneja el valor)
const inputRef = useRef();
<input ref={inputRef} />;
```

### Optimización de Rendimiento
```jsx
// React.memo para evitar re-renders innecesarios
const MemoizedComponent = React.memo(({ data }) => {
    return <div>{data}</div>;
});

// useMemo para valores computados costosos
const memoizedValue = useMemo(() => {
    return expensiveOperation(prop1, prop2);
}, [prop1, prop2]);

// useCallback para funciones
const memoizedCallback = useCallback(() => {
    doSomething(prop);
}, [prop]);
```

### Context API vs Props Drilling
```jsx
// Props Drilling (evitar)
const App = () => {
    const value = "data";
    return (
        <ComponentA value={value}>
            <ComponentB value={value}>
                <ComponentC value={value} />
            </ComponentB>
        </ComponentA>
    );
};

// Context (mejor solución)
const MyContext = createContext();

const App = () => {
    return (
        <MyContext.Provider value="data">
            <ComponentA>
                <ComponentB>
                    <ComponentC />
                </ComponentB>
            </ComponentA>
        </MyContext.Provider>
    );
};
```

### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        logErrorToService(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Algo salió mal</h1>;
        }
        return this.props.children;
    }
}
```

### Preguntas Comunes de React

1. **¿Qué es JSX?**
```jsx
// JSX es azúcar sintáctico para:
React.createElement('div', null, 'Hello World');
// Se escribe como:
<div>Hello World</div>
```

2. **¿Qué son las keys en React?**
```jsx
// Keys ayudan a React a identificar qué items han cambiado
<ul>
    {items.map(item => (
        <li key={item.id}>{item.text}</li>
    ))}
</ul>
```

3. **¿Qué son los Fragments?**
```jsx
// Evitan nodos extra en el DOM
return (
    <>
        <ChildA />
        <ChildB />
    </>
);
```

4. **¿Qué es el Strict Mode?**
```jsx
// Ayuda a encontrar problemas potenciales
<React.StrictMode>
    <App />
</React.StrictMode>
```

5. **¿Cómo manejar formularios?**
```jsx
const [form, setForm] = useState({
    name: '',
    email: ''
});

const handleChange = (e) => {
    setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
};
```

### Tips de Optimización en React

1. **Code Splitting**
```jsx
const MyComponent = React.lazy(() => import('./MyComponent'));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <MyComponent />
        </Suspense>
    );
}
```

2. **Evitar Re-renders**
```jsx
// Usar React.memo para componentes puros
const PureComponent = React.memo(({ data }) => {
    return <div>{data}</div>;
});

// Usar useCallback para funciones
const handleClick = useCallback(() => {
    // lógica
}, [dependencies]);
```

3. **Manejo de Listas Grandes**
```jsx
// Usar virtualización
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
);

const List = () => (
    <FixedSizeList
        height={400}
        width={300}
        itemCount={1000}
        itemSize={35}
    >
        {Row}
    </FixedSizeList>
);
``` 