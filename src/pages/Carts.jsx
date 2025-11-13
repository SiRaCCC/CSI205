import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Carts = ({ carts, setCarts }) => {
  return (
    <div>
      <div
        className="d-grid gap-4 overflow-auto"
        style={{ gridTemplateColumns: "repeat(4, 1fr)", height: "560px" }}
      >
        {carts.map((cart) => {
          return (
            <Card style={{ width: "18rem" }} key={cart.id}>
              <Card.Img variant="top" src={cart} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>
                <Card.Text>{cart.price}</Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCarts(carts.filter((c) => c.id !== cart.id));
                  }}
                >
                  Remove From Carts
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4 className="text-center">
        Products: <i className="badge bg-danger">{carts.length} item</i> - Total Price:
        <i className="badge bg-success">${carts.reduce((prev, cart) => prev + cart.price, 0).toFixed(2)}</i>
      </h4>
    </div>
  );
};
export default Carts;
