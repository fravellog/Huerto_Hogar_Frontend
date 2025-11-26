import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importamos axios para conectar
import Title from '../atoms/Title';
import MainLayout from '../templates/MainLayout';
import ProductCard from '../molecules/ProductCard';

export default function ShopPage() {
  // 1. Estado para guardar los productos que vienen de Azure
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Efecto para cargar los datos al entrar a la página
  useEffect(() => {
    // La URL de tu backend local (cambiará cuando subas a Azure)
    const API_URL = 'http://localhost:3000/api/products';

    axios.get(API_URL)
      .then(response => {
        setProductos(response.data); // Guardamos los datos en el estado
        setLoading(false); // Apagamos el "cargando"
      })
      .catch(error => {
        console.error("Error cargando productos del huerto:", error);
        setLoading(false);
      });
  }, []);

  // 3. Filtrado dinámico basado en los datos reales
  // Nota: Asegúrate que en tu DB la columna categoria diga 'Verdura' o 'Verduras'
  // Aquí usamos 'includes' para que sea flexible (funcione con singular o plural)
  const verduras = productos.filter(p => p.categoria && p.categoria.includes('Verdura'));
  const frutas = productos.filter(p => p.categoria && p.categoria.includes('Fruta'));

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Cargando frescura... 🥬</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title level="h2" className="text-center mb-8">Nuestros Productos</Title>
      
      <div
        className="shop-categorias-container"
        style={{
          display: 'flex',
          gap: 48,
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Bloque Verduras */}
        <div className="shop-categoria-block" style={{ flex: 1, minWidth: 320, background: '#f8fff8', borderRadius: 18, padding: 28, boxShadow: '0 2px 8px rgba(60,185,23,0.06)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#388E3C', marginBottom: 24, fontWeight: 700 }}>
            🥦 Verduras
          </h2>
          <div className="shop-productos-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {verduras.length > 0 ? (
              verduras.map(producto => <ProductCard key={producto.id} product={producto} />)
            ) : (
              <p>No hay verduras disponibles por ahora.</p>
            )}
          </div>
        </div>

        {/* Bloque Frutas */}
        <div className="shop-categoria-block" style={{ flex: 1, minWidth: 320, background: '#fffef8', borderRadius: 18, padding: 28, boxShadow: '0 2px 8px rgba(60,185,23,0.06)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#388E3C', marginBottom: 24, fontWeight: 700 }}>
            🍎 Frutas
          </h2>
          <div className="shop-productos-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {frutas.length > 0 ? (
               frutas.map(producto => <ProductCard key={producto.id} product={producto} />)
            ) : (
              <p>No hay frutas disponibles por ahora.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}