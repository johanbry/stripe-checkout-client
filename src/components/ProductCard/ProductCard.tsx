import { formatPrice } from "../../utils/price";
import { IProduct } from "./../../interfaces/interfaces";
import { useCartContext } from "./../../context/CartContext";
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
      <h3>{product.name}</h3>
      <div>
        <span>{formatPrice(product.default_price.unit_amount)}</span>
        <button type="button" className="float-right" onClick={handleAddToCart}>
          KÖP
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
