import { Button, Card } from "react-bootstrap"; // Importing Button and Card components from react-bootstrap
import { formatCurrency } from "../utilities/formatCurrency"; // Importing utility function for formatting currency
import { useShoppingCart } from "../context/ShoppingCartContext"; // Importing custom hook for shopping cart context

// Type definition for the props of StoreItem component
type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

// StoreItem component definition
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart(); // Getting functions from the shopping cart context
    const quantity = getItemQuantity(id); // Getting the current quantity of the item in the cart

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
                    ) : (
                        <div
                            className="d-flex align-items-center flex-column"
                            style={{ gap: ".5rem" }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ gap: ".5rem" }}
                            >
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <span className="fs-3">{quantity}</span>in cart
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
