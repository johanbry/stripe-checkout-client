import { IProduct, useCartContext } from "./../../context/CartContext";
import "./productcard.css";

type Props = {
  product: IProduct;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  return (
    <div className="product-card">
      <img src={product.images[0]} />
      <h3>{product.name}</h3> <p>{product.description}</p>
      <span>{product.default_price.unit_amount / 100}</span>
      <button type="button" onClick={handleAddToCart}>
        Add
      </button>
    </div>
  );
};

export default ProductCard;
