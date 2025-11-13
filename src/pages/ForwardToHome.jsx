import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForwardToHome = () => {
  const navigate = useNavigate()
  useEffect( ( ) => {navigate('../home')}, [] ) //load
    return (
      <h3>Forward to home</h3>
  );
};

export default ForwardToHome;
