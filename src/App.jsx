import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Ecommerce companies" },
    { id: 2, title: "Food delivery unicorns" },
    { id: 3, title: "Last-mile supply chain companies" },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App" class="bg-container">
      <div>
        <ul class="menu-items">
          <li>Home</li>
          <li>About</li>
          <li class="pink">Our Service</li>
          <li>Invest</li>
          <li>Contact</li>
          <li>Careers</li>
        </ul>
      </div>
      <h1>Today, Our <span>Solutions</span> Are Being Used By</h1>
      <Input onSubmit={addTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column id="toDo" tasks={tasks} />
      </DndContext>
    </div>
  );
}
