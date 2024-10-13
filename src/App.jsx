import { useState } from 'react';
import './App.css';

function App() {
  const defaultValues = {
    name: '',
    price: '',
    quality: ''
  };

  const [productValues, setProductValues] = useState(defaultValues);
  const [products, setProducts] = useState([]);
  const [buyQuantities, setBuyQuantities] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      name: productValues.name,
      price: productValues.price,
      quality: productValues.quality
    };

    if (productValues.name === '' || productValues.price === '' || productValues.quality === '') {
      alert('Please fill in all fields');
      return;
    }

    setProducts([...products, newProduct]);
    setProductValues(defaultValues);
  };

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleBuy = (index) => {
    const quantityToBuy = buyQuantities[index] || 0;
    const newProducts = [...products];
    const newQuantity = newProducts[index].quality - quantityToBuy;
    if (newQuantity >= 0) {
      newProducts[index].quality = newQuantity;
      setProducts(newProducts);
    } else {
      alert('Not enough quantity available');
    }
  };

  const handleQuantityChange = (index, value) => {
    if (isNaN(value) || value < 0) {
      alert('Please enter a valid quantity');
      return;
    }
    
    setBuyQuantities({
      ...buyQuantities,
      [index]: parseInt(value) || 0
    });
  };

  return (
    <div className='container'>
      <h2>VEG SHOP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productValues.name}
            onChange={(e) => setProductValues({ ...productValues, name: e.target.value })}
          />
        </label>
        
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productValues.price}
            onChange={(e) => setProductValues({ ...productValues, price: e.target.value })}
          />
        </label>
        
        <label>
          Quality:
          <input
            type="number"
            name="quality"
            value={productValues.quality}
            onChange={(e) => setProductValues({ ...productValues, quality: e.target.value })}
          />
        </label>
        
        <input type="submit" value="Submit" />
      </form>

      <h3>Total: {products.length}</h3>

      {products.length !== 0 && (
        <div>
          <h3>Products</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name}, Rs. {product.price}, {product.quality}KG
                <input
                  type="number"
                  name="qty"
                  min="0"
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
                <button onClick={() => handleBuy(index)}>Buy</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;