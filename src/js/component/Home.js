import React, { useState, useEffect } from "react";


const Home = () => {

	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);


	useEffect(() => {
		function createUser() {
			fetch("https://playground.4geeks.com/todo/users/michaelrick88", {
				method: "POST",
				body: JSON.stringify({}),
				headers: { "Content-Type": "application/json" },
			})
				.then((response) => {
					console.log(response);
					return response.json()
				})
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
		createUser();
	}, []);

	useEffect(() => {
		getTodos();
	}, []);

	function getTodos() {
		fetch("https://playground.4geeks.com/todo/users/michaelrick88")
			.then((response) => {
				console.log(response);
				return response.json()
			})
			.then((data) => {
				setTasks(data.todos)
				console.log(data.todos);
			})
			.catch((error) => { error })
	}

	function postTodos() {
		fetch("https://playground.4geeks.com/todo/todos/michaelrick88", {
			method: "POST",
			body: JSON.stringify({ label: task, done: false }),
			headers: { "Content-type": "application/json" }
		})
			.then((response) => {
				console.log(response);
				return response.json()
			})
			.then((data) => {
				setTasks((prevTasks) => [...prevTasks, data]);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	function deleteTodos(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setTasks((prevTasks) => prevTasks.filter((todo) => todo.id !== id));
			})
			.catch((error) => { error });

	}

	const addTask = (e) => {
		e.preventDefault();
		if (task.trim() === "")
			return;
		postTodos();
		setTask("");
	};

	return (
		<div className="container">
			<div className="text-center bg-warning">
				<h1 className="text-center p-5">Todo List</h1>

				<form onSubmit={addTask}>
					<input
						className="form-control my-3"
						type="text"
						placeholder="Add a Task"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>

				</form>
				<ul className="list-group mt-4">
					{tasks.map((todo, index) => (
						<li key={todo.id}
							className="list-group-item d-flex justify-content-between alingn-items-center flex-wrap"
							style={{
								wordWrap: "break-word",
								whiteSpace: "normal",
								overflow: "hidden",
							}}>
							<div className="d-flex"
								style={{ gap: "10px" }}>

								<span style={{ minWidth: "30px" }}>{index + 1}.</span>
								<span
									style={{
										flex: 1,
										overflowWrap: "break-word",
										wordBreak: "break-word",
									}}>
									{todo.label} {/* {todo.id} */}
								</span>
							</div>
							<button className="btn btn-danger btn-sm p-1"
								style={{ marginLeft: "auto" }}
								onClick={() => deleteTodos(todo.id)}
							>
								X
							</button>
						</li>
					))}
				</ul>
				<p className="m-3">tasks:{tasks.length} </p>
				{/* <button className="btn btn-primary" onClick={getTodos}>Get Todos</button> */}
			</div>
		</div>
	);
};

export default Home;
