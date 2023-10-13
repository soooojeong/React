import React, { useState } from "react";
import styles from "./TodoList.module.css";

function TodoList() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (event) => setToDo(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };

  const deleteBtn = (index) => {
    setToDos(toDos.filter((item, todoIndex) => index !== todoIndex));
  };

  return (
    <div>
      <div className={styles.bg}></div>
      <h1 className={styles.title}>Todo list</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          value={toDo}
          onChange={onChange}
          className={styles.input}
        />
        <button className={styles.check}>add</button>
      </form>

      <ul className={styles.list}>
        {toDos.map((item, index) => (
          <li key={index}>
            {item}
            <button className={styles.btn} onClick={() => deleteBtn(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoList;
