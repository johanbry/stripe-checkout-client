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
        if (!res.ok) throw Error;
        const products: IProduct[] = await res.json();

        /*         const products: IProduct[] = data.map((prod) => {
          return {
            id: prod.id,
            name: prod.name,
            description: prod.description,
            price: prod.default_price.unit_amount,
            price_id: prod.default_price.id,
            image: prod.images[0],
          };
        }); */

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
