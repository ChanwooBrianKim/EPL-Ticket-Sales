import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/Storeitem.js";
import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for the store item
export interface StoreItemType {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export function Store() {
  const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get<StoreItemType[]>("/api/products");
        setStoreItems(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

// import { Col, Row } from "react-bootstrap"
// import { StoreItem } from "../components/Storeitem"
// import storeItems from "../data/items.json"

// export function Store() {
//     return (
//         <>
//             <h1>Store</h1>
//             <Row md={2} xs={1} lg={3} className="g-3">
//                 {storeItems.map(item => (
//                     <Col key={item.id}>
//                         <StoreItem {...item} />
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     )
// }