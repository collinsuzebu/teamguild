import React from "react";
import { Badge, Button, Table } from "reactstrap";

export function TodoList({ todos, edit, onDelete }) {
  return (
    todos.length > 0 && (
      <>
        <div className="header">All Todos for this project.</div>
        <Table borderless>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo._id}>
                  <td>
                    <div
                      className="btn btn-light"
                      onClick={() => edit(todo._id)}
                    >
                      Edit
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>{todo.title}</p>
                    </div>
                  </td>
                  <td>
                    <Badge
                      color={todo.status === "completed" ? "success" : "info"}
                      pill
                    >
                      {todo.status}
                    </Badge>
                  </td>
                  <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      outline
                      size="sm"
                      color="danger"
                      onClick={() => onDelete(todo)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    )
  );
}

export default TodoList;
