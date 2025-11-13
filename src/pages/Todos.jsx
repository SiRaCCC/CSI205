import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [numPages, setNumPages] = useState(3);
  const [curPage, setCurPage] = useState(1);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  // modal state and handle
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setItemPerPage(10);
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [itemsPerPage, todos.length]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage > numPages) setCurPage(numPages);
    else if (curPage === 0) setCurPage(1);
  }, [numPages]);

  const waitingClick = (id) => {
    //change completed
    todosRaw.find((todo) => todo.id === id).completed = true;
    //force to be effect
    setTodosRaw([...todosRaw]);
  };

  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  const saveClicked = (id, title) => {
    console.log(title, id);
    if (title.trim() !== "") {
      const newTodo = {
        userId: 1,
        id,
        title,
        completed: false,
      };
      setTodosRaw([...todosRaw, newTodo]);
    }
    handleClose();
  };

  const theNewId =
    todosRaw.reduce((prev, todo) => (todo.id > prev ? todo.id : prev), -1) + 1;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Badge>
              <i className="bi bi-plus fs-4"></i>
            </Badge>
            &nbsp; Add todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>
              ID:&nbsp;<Badge bg="secondary">{theNewId}</Badge>
            </Form.Label>
            <Form.Control
              type="hidden"
              value={theNewId}
              ref={newIdRef}
              readOnly
            />
            {/* Title */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder="typing your todo title here..."
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveClicked(
                Number(newIdRef.current.value),
                newTitleRef.current.value
              );
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal */}

      {/* filter */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
          </Form>
          Show only&nbsp;
          <Button variant="warning">
            waiting&nbsp;<i className="bi bi-clock"></i>
          </Button>
        </div>
        <Form.Select
          aria-label="Default select example"
          className="w-25"
          onChange={(e) => setItemPerPage(e.target.value)}
        >
          <option value={5}>5 items per page</option>
          <option value={10} selected>
            10 items per page
          </option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </Form.Select>
      </div>
      {/* table */}
      <div>
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "3rem" }}>
                ID
              </th>
              <th className="text-center">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button onClick={() => handleShow()}>
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo, index) => {
                return (
                  index >= (curPage - 1) * itemsPerPage &&
                  index <= curPage * itemsPerPage - 1
                );
              })
              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td className="text-center">
                      <h5>
                        <Badge bg="secondary">{todo.id}</Badge>
                      </h5>
                    </td>
                    <td>{todo.title}</td>
                    <td className="text-end">
                      {todo.completed ? (
                        <Badge bg="success" className="fs-6">
                          done
                        </Badge>
                      ) : (
                        <Button
                          variant="warning"
                          onClick={() => waitingClick(todo.id)}
                        >
                          waiting&nbsp;<i className="bi bi-clock"></i>
                        </Button>
                      )}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => deleteClicked(todo.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
      {/* page control */}
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => {
            if (curPage > 1) setCurPage((p) => p - 1);
          }}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => {
            if (curPage < numPages) setCurPage((p) => p + 1);
          }}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>
    </>
  );
};

export default Todos;
