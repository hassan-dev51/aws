import { Todo } from ".";

const getTodo = () => {
  const todo: Todo[] = [
    {
      id: "1",
      title: "Todo 1",
      done: false,
    },
    {
      id: "2",
      title: "Todo 2",
      done: true,
    },
  ];
  return todo;
};
export default getTodo;
