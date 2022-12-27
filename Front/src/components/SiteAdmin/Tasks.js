import TaskItem from "./Task-Item/Task-Item";
import TaskItemUsers from "./Task-Item/Task-Item-Users";

const Tasks = ({ tasks , type}) => {
  // Type
  // True = Requests
  // False = Users
  return (
    <>
      {type &&tasks.map((task) => (
        <TaskItem
            key={task._id}
            Request={task}
        />
      ))}
       {!type &&tasks.map((task) => (
        <TaskItemUsers
            key={task._id}
            Request={task}
        />
      ))}
    </>
  );
};

export default Tasks;
