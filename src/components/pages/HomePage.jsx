import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Importamos axios
import MainLayout from '../templates/MainLayout';
import FeaturedProducts from '../organisms/FeaturedProducts';
import Banner from '../organisms/Banner';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  
  // 1. Estado para productos destacados
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // 2. Cargar productos desde Azure al montar el componente
  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        // Tomamos, por ejemplo, los primeros 3 productos para mostrar como destacados
        // O podrías filtrar los que tengan stock > 0, etc.
        const destacados = response.data.slice(0, 3);
        setFeaturedProducts(destacados);
      })
      .catch(error => console.error("Error al cargar destacados:", error));
  }, []);

  const handleAddToCart = (product) => {
    console.log('Añadir al carrito:', product);
    // Aquí puedes disparar la lógica del carrito o evento window
    // (Igual a como lo haces en ProductCard)
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const idx = carrito.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({ ...product, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
    alert(`${product.nombre} agregado al carrito desde Home`);
  };

  return (
    <MainLayout>
      <Banner />
      
      {/* Pasamos los datos REALES (featuredProducts) en lugar del array falso */}
      <FeaturedProducts 
        products={featuredProducts} 
        onAddToCart={handleAddToCart} 
      />

       <div style={{display:'flex', justifyContent:'center', margin:'32px 0'}}>
        <Link to={isAuthenticated ? '/tienda' : '/login'} className="btn btn-ver-productos">
          Ver productos
        </Link>
       </div>
    </MainLayout>
  );
}