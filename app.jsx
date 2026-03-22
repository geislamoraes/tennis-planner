import { useState } from "react";

const daysOfWeek = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default function TennisTrainingPlanner() {
  const [planner, setPlanner] = useState({});
  const [selectedDay, setSelectedDay] = useState("Segunda");
  const [input, setInput] = useState("");

  const addSession = () => {
    if (!input) return;

    const daySessions = planner[selectedDay] || [];

    setPlanner({
      ...planner,
      [selectedDay]: [
        ...daySessions,
        { text: input, done: false },
      ],
    });

    setInput("");
  };

  const toggleSession = (index) => {
    const updatedDay = [...(planner[selectedDay] || [])];
    updatedDay[index].done = !updatedDay[index].done;

    setPlanner({
      ...planner,
      [selectedDay]: updatedDay,
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🎾 Planner de Treinos</h1>

      <div style={{ marginBottom: 10 }}>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              margin: 4,
              padding: 6,
              background: selectedDay === day ? "#333" : "#ddd",
              color: selectedDay === day ? "#fff" : "#000",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {day}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder={`Treino de ${selectedDay}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addSession} style={{ marginLeft: 6 }}>
          Adicionar
        </button>
      </div>

      <div>
        {(planner[selectedDay] || []).map((session, index) => (
          <div
            key={index}
            onClick={() => toggleSession(index)}
            style={{
              marginBottom: 6,
              padding: 8,
              background: session.done ? "#b2f2bb" : "#eee",
              textDecoration: session.done ? "line-through" : "none",
              cursor: "pointer",
              borderRadius: 6,
            }}
          >
            {session.text}
          </div>
        ))}
      </div>
    </div>
  );
}
