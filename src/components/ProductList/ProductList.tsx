import { IProduct } from "../../context/CartContext";
import ProductCard from "../ProductCard/ProductCard";
import "./productlist.css";

type Props = {
  products: IProduct[];
};

const ProductList = ({ products }: Props) => {
  return (
    <div className="products-wrapper">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
