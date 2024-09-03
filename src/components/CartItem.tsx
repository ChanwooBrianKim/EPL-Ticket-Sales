import { Stack, Button } from "react-bootstrap"; // Importing components from react-bootstrap for UI
import { useShoppingCart } from "../context/ShoppingCartContext.js"; // Importing custom hook for shopping cart context
import storeItems from "../data/items.json"; // Importing item data from JSON file
import { formatCurrency } from "../utilities/formatCurrency.js"; // Importing utility function for formatting currency

// Type definition for the props of CartItem component
type CartItemProps = {
  id: number;
  quantity: number;
};

// CartItem component definition
export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart(); // Getting removeFromCart function from context
  const item = storeItems.find(i => i.id === id); // Finding the item in storeItems with matching id

  // If the item is not found, return null
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name} // Adding alt attribute for accessibility
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
