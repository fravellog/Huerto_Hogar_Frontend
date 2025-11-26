import Image from '../atoms/Image';
import Button from '../atoms/Button';

export default function ProductCard({ product }) {
  // 1. Desestructuración con valores por defecto para evitar errores
  const { 
    id, 
    nombre = "Producto sin nombre", 
    precio = 0, 
    imagen = "/placeholder.png", 
    unidad = "unidad" // Valor por defecto si falta en la DB
  } = product || {}; // Protección si 'product' llega null

  const handleAddToCartClick = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const idx = carrito.findIndex(p => p.id === id);
    if (idx >= 0) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
    alert(`${nombre} agregado al carrito`);
  };

  // Función segura para formatear pesos
  const formatoPeso = (valor) => {
    if (typeof valor !== 'number') return '$0';
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="producto-card">
      <Image src={imagen} alt={nombre} className="producto-img" />
      <h3>{nombre}</h3>
      
      {/* 2. Renderizado seguro del precio */}
      <h4 className="precio">
        Precio: {formatoPeso(precio)} / {unidad}
      </h4>

      <Button onClick={handleAddToCartClick} className="agregar-carrito">
        Agregar al carrito
      </Button>
    </div>
  );
}