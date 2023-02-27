import { FetchedProduct } from "~/types";
import Price from "~/components/UI/Price";
import { CardBody } from "~/components/UI/UI";

interface ProductCardProps extends FetchedProduct {
  children?: string | JSX.Element | JSX.Element[];
  className?:string
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className='product-card'>
      <img src={props.image} alt={`${props.name} product image`} />
      <CardBody className="product-card__body">
        <p><strong>{props.name}</strong></p>
        <p>{props.description}</p>
        <p>Rating: {props.rating}/5</p>
        <p>
          <Price price={props.price} /> per unit
        </p>
        {props.children}
      </CardBody>
    </div>
  );
}
