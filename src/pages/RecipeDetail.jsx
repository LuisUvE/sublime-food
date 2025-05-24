import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Usa el mismo array allRecipes que en Checkout.jsx (puedes exportarlo de un archivo común)
const allRecipes = [
  {
    name: "Penne rigate con longaniza",
    image: "https://images.ctfassets.net/43ibah8kumsy/ea4c468f-30c4-4ad8-b56c-0b090d7ebf62/9d10ed4e561bef13baf0574a7114258a/5pastapennebarilla_upscaled.jpg?w=1600&h=1600&fm=webp&q=50",
    weight: "420g",
    price: "7.150",
    calories: 865,
    fats: 59,
    carbs: 58,
    proteins: 26,
    cuisine: "italiana",
    ingredients: ["Pasta penne", "Longaniza", "Salsa de tomate", "Queso parmesano", "Aceite de oliva", "Ajo", "Cebolla"],
    instructions: [
      "Cocina la pasta penne en agua con sal hasta que esté al dente.",

      "En una sartén, sofríe ajo y cebolla picados con un poco de aceite de oliva.",
      "Agrega la longaniza cortada en trozos y cocina hasta que esté dorada.",
      "Añade salsa de tomate y deja cocinar por 10 minutos.",
      "Mezcla la pasta con la salsa y espolvorea queso parmesano rallado antes de servir."
    ]
  },
  {
    name: "Ensalada quinoa y aguacate",
    image: "https://recetasdecocina.elmundo.es/wp-content/uploads/2021/03/IMG_20200321_150823.jpg",
    weight: "350g",
    price: "6.500",
    calories: 420,
    fats: 20,
    carbs: 45,
    proteins: 10,
    cuisine: "mexicana",
    ingredients: ["Quinoa", "Aguacate", "Tomate cherry", "Cebolla morada", "Lima", "Cilantro", "Aceite de oliva"],
    instructions: [
      "Cocina la quinoa en agua con sal hasta que esté tierna, luego escúrrela y déjala enfriar.",
      "Corta el aguacate en cubos y los tomates cherry a la mitad.",
      "Pica finamente la cebolla morada y el cilantro.",
      "En un bol grande mezcla la quinoa, aguacate, tomates, cebolla y cilantro.",
      "Aliña con jugo de lima, aceite de oliva, sal y pimienta al gusto."
    ]
  },
  {
    name: "Bowl vegano con hummus",
    image: "https://recetasveganas.net/wp-content/uploads/2020/09/bowl-arroz-hummus-verdura-saludable-vegano-recetas.jpg",
    weight: "400g",
    price: "8.000",
    calories: 520,
    fats: 22,
    carbs: 60,
    proteins: 12,
    cuisine: "asiatica",
    ingredients: ["Arroz integral", "Hummus", "Zanahoria rallada", "Pepino", "Aguacate", "Espinacas", "Aceite de oliva"],
    instructions: [
      "Cocina el arroz integral según las instrucciones del paquete.",
      "En un bowl, coloca una base de arroz.",
      "Añade hummus, zanahoria rallada, pepino en rodajas, aguacate en cubos y espinacas frescas.",
      "Rocía con un poco de aceite de oliva y mezcla suavemente antes de comer."
    ]
  },
  {
    name: "Sushi vegetariano",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    weight: "300g",
    price: "9.200",
    calories: 410,
    fats: 18,
    carbs: 50,
    proteins: 14,
    cuisine: "asiatica",
    ingredients: ["Arroz para sushi", "Alga nori", "Pepino", "Aguacate", "Zanahoria", "Salsa de soja", "Vinagre de arroz"],
    instructions: [
      "Cocina el arroz para sushi y mezcla con vinagre de arroz.",
      "Sobre una esterilla de bambú, coloca una hoja de alga nori.",
      "Extiende el arroz sobre el alga, dejando un borde libre.",
      "Coloca tiras de pepino, aguacate y zanahoria en el centro.",
      "Enrolla con la ayuda de la esterilla y corta en piezas.",
      "Sirve con salsa de soja para acompañar."
    ]
  },
  {
    name: "Pollo asado con hierbas",
    image: "hhttps://www.demoslavueltaaldia.com/sites/default/files/956_polloverduras_g.png",
    weight: "450g",
    price: "10.000",
    calories: 780,
    fats: 40,
    carbs: 15,
    proteins: 65,
    cuisine: "mexicana",
    ingredients: ["Pollo entero", "Romero", "Tomillo", "Ajo", "Aceite de oliva", "Limón", "Sal y pimienta"],
    instructions: [
      "Precalienta el horno a 200°C.",
      "Mezcla aceite de oliva, ajo picado, romero, tomillo, sal y pimienta.",
      "Unta el pollo con la mezcla y exprime jugo de limón sobre él.",
      "Hornea durante aproximadamente 1 hora o hasta que el pollo esté dorado y cocido.",
      "Deja reposar 10 minutos antes de servir."
    ]
  },
  {
    name: "Pasta carbonara tradicional",
    image: "https://theobjective.com/wp-content/uploads/2022/02/carbonara_1.jpg",
    weight: "400g",
    price: "8.750",
    calories: 890,
    fats: 55,
    carbs: 65,
    proteins: 30,
    cuisine: "italiana",
    ingredients: ["Pasta spaghetti", "Huevos", "Queso pecorino", "Panceta", "Pimienta negra", "Sal"],
    instructions: [
      "Cocina la pasta al dente.",
      "Fríe la panceta hasta que esté crujiente.",
      "Bate huevos con queso pecorino rallado.",
      "Mezcla la pasta caliente con la panceta y luego con la mezcla de huevos rápidamente para crear la salsa cremosa.",
      "Agrega pimienta negra al gusto y sirve."
    ]
  },
  {
    name: "Ceviche de camarón",
    image: "https://i0.wp.com/recetaskwa.com/wp-content/uploads/2023/09/ceviche_camaron.jpg?ssl=1",
    weight: "350g",
    price: "12.500",
    calories: 350,
    fats: 10,
    carbs: 30,
    proteins: 40,
    cuisine: "mexicana",
    ingredients: ["Camarón", "Jugo de limón", "Cebolla morada", "Cilantro", "Tomate", "Chile", "Sal"],
    instructions: [
      "Marina los camarones en jugo de limón por 15-20 minutos.",
      "Pica finamente cebolla, cilantro, tomate y chile.",
      "Mezcla todo con los camarones marinados.",
      "Sazona con sal al gusto.",
      "Sirve frío, acompañado de tostadas o galletas saladas."
    ]
  },
  {
    name: "Hamburguesa vegana",
    image: "https://tienda.vegusta.cl/wp-content/uploads/2022/03/Dark-Side-Pin%CC%83a-Cuadrada-para-WEB.jpg",
    weight: "380g",
    price: "9.300",
    calories: 620,
    fats: 25,
    carbs: 70,
    proteins: 20,
    cuisine: "mexicana",
    ingredients: ["Pan integral", "Hamburguesa vegana", "Aguacate", "Lechuga", "Tomate", "Cebolla", "Mostaza"],
    instructions: [
      "Cocina la hamburguesa vegana según instrucciones del paquete.",
      "Tuesta ligeramente el pan integral.",
      "Unta mostaza en el pan.",
      "Coloca la hamburguesa, rodajas de aguacate, lechuga, tomate y cebolla.",
      "Sirve inmediatamente."
    ]
  },
  {
    name: "Lasagna de verduras",
    image: "https://www.bekiacocina.com/images/cocina/0000/976-h.jpg",
    weight: "500g",
    price: "11.000",
    calories: 700,
    fats: 30,
    carbs: 60,
    proteins: 25,
    cuisine: "italiana",
    ingredients: ["Pasta para lasaña", "Berenjena", "Calabacín", "Salsa bechamel", "Queso mozzarella", "Tomate"],
    instructions: [
      "Corta las verduras en rodajas y saltéalas.",
      "Cocina la pasta para lasaña según indicaciones.",
      "En un molde, coloca capas alternas de pasta, verduras, salsa bechamel y queso.",
      "Hornea a 180°C por 30 minutos o hasta que el queso esté dorado.",
      "Deja reposar 10 minutos antes de servir."
    ]
  },
  {
    name: "Tacos vegetarianos",
    image: "https://laroussecocina.mx/wp-content/uploads/2020/02/S050419-24-TACOS-VEGETARIANOS-0555-1.jpg.webp",
    weight: "300g",
    price: "7.800",
    calories: 480,
    fats: 18,
    carbs: 55,
    proteins: 15,
    cuisine: "mexicana",
    ingredients: ["Tortillas de maíz", "Frijoles negros", "Lechuga", "Tomate", "Aguacate", "Cilantro", "Limón"],
    instructions: [
      "Calienta las tortillas.",
      "Cocina y sazona los frijoles negros.",
      "Rellena las tortillas con frijoles, lechuga, tomate y aguacate.",
      "Decora con cilantro picado y jugo de limón.",
      "Sirve de inmediato."
    ]
  },
  {
    name: "Sopa miso",
    image: "https://d36fw6y2wq3bat.cloudfront.net/recipes/sopa-de-miso-con-tofu-y-vegetales/900/sopa-de-miso-con-tofu-y-vegetales_version_1687406461.jpg",
    weight: "400g",
    price: "6.200",
    calories: 300,
    fats: 10,
    carbs: 40,
    proteins: 12,
    cuisine: "asiatica",
    ingredients: ["Pasta de miso", "Caldo dashi", "Tofu", "Cebolla verde", "Alga wakame"],
    instructions: [
      "Calienta el caldo dashi.",
      "Disuelve la pasta de miso en un poco de caldo y luego mézclalo con el resto del caldo.",
      "Añade tofu cortado en cubos y alga wakame.",
      "Cocina a fuego bajo sin dejar que hierva.",
      "Sirve con cebolla verde picada por encima."
    ]
  },
  {
    name: "Ensalada César",
    image: "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
    weight: "350g",
    price: "7.100",
    calories: 400,
    fats: 25,
    carbs: 35,
    proteins: 18,
    cuisine: "italiana",
    ingredients: ["Lechuga romana", "Croutons", "Queso parmesano", "Aderezo César", "Pollo a la plancha"],
    instructions: [
      "Lava y corta la lechuga romana.",
      "Añade croutons y queso parmesano rallado.",
      "Agrega pollo a la plancha cortado en tiras.",
      "Mezcla con el aderezo César al gusto.",
      "Sirve fría."
    ]
  },
  {
    name: "Pollo teriyaki",
    image: "https://fedecocina.net/static/aaa48f1f8a7e0773be2404e00d8fef08/a764f/pollo-teriyaki.jpg",
    weight: "450g",
    price: "12.000",
    calories: 600,
    fats: 30,
    carbs: 50,
    proteins: 40,
    cuisine: "asiatica",
    ingredients: ["Pechuga de pollo", "Salsa teriyaki", "Arroz blanco", "Brócoli", "Aceite de sésamo"],
    instructions: [
      "Marina la pechuga de pollo en salsa teriyaki durante 30 minutos.",
      "Cocina el pollo en una sartén con aceite de sésamo hasta que esté dorado.",
      "Cocina arroz blanco y brócoli al vapor como acompañamiento.",
      "Sirve el pollo con arroz y brócoli."
    ]
  },
  {
    name: "Pizza margarita",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    weight: "400g",
    price: "9.000",
    calories: 750,
    fats: 35,
    carbs: 80,
    proteins: 25,
    cuisine: "italiana",
    ingredients: ["Masa de pizza", "Salsa de tomate", "Queso mozzarella", "Albahaca fresca", "Aceite de oliva"],
    instructions: [
      "Precalienta el horno a 250°C.",
      "Extiende la masa de pizza en una bandeja.",
      "Cubre con salsa de tomate y queso mozzarella.",
      "Hornea durante 10-15 minutos hasta que el queso se derrita y la masa esté dorada.",
      "Decora con hojas de albahaca fresca y un chorrito de aceite de oliva antes de servir."
    ]
  },
  {
    name: "Sushi de salmón",
    image: "https://okdiario.com/img/2018/04/23/makis-salmon.jpg",
    weight: "320g",
    price: "13.000",
    calories: 500,
    fats: 20,
    carbs: 55,
    proteins: 30,
    cuisine: "asiatica",
    ingredients: ["Arroz para sushi", "Salmón fresco", "Alga nori", "Vinagre de arroz", "Pepino", "Aguacate"],
    instructions: [
      "Cocina el arroz para sushi y mezcla con vinagre de arroz.",
      "Corta el salmón, pepino y aguacate en tiras.",
      "Coloca una hoja de alga nori sobre la esterilla.",
      "Extiende el arroz sobre el alga y agrega el salmón, pepino y aguacate.",
      "Enrolla con la esterilla y corta en piezas.",
      "Sirve con salsa de soja y wasabi si deseas."
    ]
  },
];



const normalizeString = (str) => str.trim().toLowerCase();

const getRecipeByName = (name) => {
  const normalized = decodeURIComponent(name);
  return allRecipes.find(
    (r) => normalizeString(r.name) === normalizeString(normalized)
  );
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const r = getRecipeByName(id);
    if (r) {
      setRecipe(r);
      setNotFound(false);
    } else {
      setRecipe(null);
      setNotFound(true);
    }
  }, [id]);

  if (notFound)
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Receta no encontrada.</p>
        <Link to="/products">Volver a la lista de recetas</Link>
      </div>
    );

  if (!recipe) return <p className="message">Cargando...</p>;

  return (
    <div className="container" style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Link to="/products" style={{ color: '#ff5722', fontWeight: '600' }}>
        ← Volver a recetas
      </Link>
      <h1>{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <h2>Ingredientes</h2>
      <ul>
        {(recipe.ingredients || []).map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
      <h2>Instrucciones</h2>
      <ol>
        {recipe.instructions && recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
};

export default RecipeDetail;
