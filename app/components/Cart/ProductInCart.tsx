import { CartProduct } from "~/types";
import Price from "~/components/UI/Price";
import { CardBody } from "~/components/UI/UI";

interface ProductCardProps extends CartProduct {
  children?: string | JSX.Element | JSX.Element[];
  className?:string
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className='product-card'>
      <img src={props.image} alt={`${props.name} product image`} />
      <CardBody className="product-card__body">
        <p className="name"><strong>{props.name}</strong></p>
        <p>Rating: {props.rating}/5</p>
        <p className="quantity">Quantity in cart: <strong>{props.quantity}</strong></p>
        <p>
          Price: <strong><Price price={props.price * props.quantity} /></strong>
        </p>
        {props.children}
      </CardBody>
    </div>
  );
}
