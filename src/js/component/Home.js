import React, { useState } from "react";



//create your first component
const Home = () => {

	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const addTask = (e) => {
		e.preventDefault();
		if (task.trim() === "")
			return;
		setTasks([...tasks, task]);
		setTask("");
	};

	const deleteTask = (index) => {
		const updatedTasks = tasks.filter((_, i) => i !== index);
		setTasks(updatedTasks);
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
					{tasks.map((element, index) => (
						<li key={index}
							className="list-group-item d-flex justify-content-between alingn-items-center flex-wrap"
							style={{
								wordWrap: "break-word",
								whiteSpace: "normal",
								overflow: "hidden",
							}}>
							<div className="d-flex"
								style={{ gap: "10px" }}>

								<span style={{ minWidth: "30px" }}>{index + 1}.</span>
								<span /* className="flex-grow-1" */
									style={{
										flex: 1,
										overflowWrap: "break-word",
										wordBreak: "break-word",
									}}>
									{element}
								</span>
							</div>
							<button className="btn btn-danger btn-sm p-1"
								style={{ marginLeft: "auto" }}
								onClick={() => deleteTask(index)}
							>
								X
							</button>
						</li>
					))}
				</ul>
				<p className="m-3">tasks:{tasks.length} </p>
			</div>
		</div>
	);
};

export default Home;
