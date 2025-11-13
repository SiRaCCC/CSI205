import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";

// ข้อมูลผู้ใช้
const users = [
  {
    user: "com",
    pass: "1234",
    role: "admin",
    token: "user",
  },
];

// ฟังก์ชันตรวจสอบผู้ใช้
export function verifyUser(username, password) {
  const userFound = users.find(
    (u) => u.user === username && u.pass === password
  );
  return userFound ? { role: userFound.role, token: userFound.token } : null;
}

// Component Login
const Login = ({ setToken, setRole }) => {
  const userRef = useRef();
  const passRef = useRef();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div
        className="p-4 rounded shadow bg-white"
        style={{ width: "280px" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username is com"
            ref={userRef}
            title="Username is com"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password is 1234"
            ref={passRef}
            title="Password is 1234"
          />
        </Form.Group>

        <Button
          variant="success"
          className="w-100"
          onClick={() => {
            const username = userRef.current.value.trim();
            const password = passRef.current.value.trim();
            const userInfo = verifyUser(username, password);

            // ล้างค่า input
            userRef.current.value = "";
            passRef.current.value = "";

            if (userInfo === null) {
              alert("Wrong username or password");
              userRef.current.focus();
            } else {
              setToken(userInfo.token);
              setRole(userInfo.role);
            }
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
