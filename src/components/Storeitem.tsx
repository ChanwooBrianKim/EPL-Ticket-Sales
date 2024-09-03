import { Button, Card } from "react-bootstrap"; // Importing Button and Card components from react-bootstrap
import { formatCurrency } from "../utilities/formatCurrency.js"; // Importing utility function for formatting currency
import { useShoppingCart } from "../context/ShoppingCartContext.js"; // Importing custom hook for shopping cart context
import { StoreItemType } from "../pages/Store.js"; // Importing StoreItemType for type safety

// StoreItem component definition
export function StoreItem({ id, name, price, imgUrl }: StoreItemType) {
    // Getting functions from the shopping cart context
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    
    // Getting the current quantity of the item in the cart
    const quantity = getItemQuantity(id);

    return (
        <Card className="h-100">
            {/* Displaying the product image */}
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                style={{ objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                {/* Displaying the product name and price */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {/* Conditional rendering based on whether the item is in the cart */}
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id, name, price)}>
                            + Add To Cart
                        </Button>
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
                                <span className="fs-3">{quantity}</span> in cart
                                <Button onClick={() => increaseCartQuantity(id, name, price)}>+</Button>
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
