import TaskChanges from "../components/TaskChanges/TaskChanges";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const History = () => {
  const [showTasks, setShowTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:3000/api/tasks");
      setShowTasks(response.data);
      // console.log(response.data);
    };
    fetchTasks();
  }, []);
  return (
    <div>
      <Header />
      <TaskChanges showTasks={showTasks} />
      <Footer />
    </div>
  );
};

export default History;
