import TaskItem from "./Task-Item/Task-Item";

const Tasks = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskItem
            key={task.id}
            Request={task}
        />
      ))}
    </>
  );
};

export default Tasks;
