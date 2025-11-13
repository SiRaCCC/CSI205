import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ products, carts, setCarts }) => {
  return (
    <div>
      <div
        className="d-grid gap-4 overflow-auto"
        style={{ gridTemplateColumns: "repeat(4, 1fr)", height: "560px" }}
      >
        {products.map((product) => {
          return (
            <Card style={{ width: "18rem" }} key={product.id}>
              <Card.Img variant="top" src={product} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                {carts.find((cart) => cart.id === product.id) ? (
                  <span className="badge bg-danger">Added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setCarts([...carts, product]);
                    }}
                  >
                    Add to Carts
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Products;
