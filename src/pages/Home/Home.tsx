import { useEffect, useState } from "react";

import "./home.css";
import ProductList from "../../components/ProductList/ProductList";
import { IProduct } from "../../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();

        const products: IProduct[] = data.map((prod: any) => {
          return {
            id: prod.id,
            name: prod.name,
            description: prod.description,
            price: prod.default_price.unit_amount,
            image: prod.images[0],
          };
        });

        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Error fetching products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <ProductList products={products} />
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Home;

{
  /* <div key={product.id} className="product-card">
<img src={product.images[0]} />
<h3>{product.name}</h3> <p>{product.description}</p>
<span>{product.default_price.unit_amount / 100}</span>
<button type="button" onClick={handleAddToCart}>
  Add
</button>
</div> */
}
