import { useEffect, useState } from "react";

import "./home.css";
import ProductList from "../../components/ProductList/ProductList";
import { IProduct } from "./../../interfaces/interfaces";
import AnimationDotsPulse from "../../components/AnimationDotsPulse/AnimationDotsPulse";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data);
        }
        const products: IProduct[] = await res.json();

        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage((error as Error).message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Produkter</h1>
      <ProductList products={products} />
      {isLoading && (
        <div style={{ height: "80vh" }}>
          <AnimationDotsPulse />
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Home;
