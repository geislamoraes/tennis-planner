import { useState, useEffect } from "react";

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
  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem("planner");
    return saved ? JSON.parse(saved) : {};
  });

  const [selectedDay, setSelectedDay] = useState("Segunda");
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("planner", JSON.stringify(planner));
  }, [planner]);

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f8f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#ffffff",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          🎾 Tennis Planner
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: "6px 10px",
                borderRadius: 10,
                border: "none",
                fontSize: 12,
                background:
                  selectedDay === day ? "#111" : "#f0f0f0",
                color: selectedDay === day ? "#fff" : "#333",
                cursor: "pointer",
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 16,
          }}
        >
          <input
            placeholder={`Treino de ${selectedDay}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <button
            onClick={addSession}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>

        <div>
          {(planner[selectedDay] || []).length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "#aaa",
                fontSize: 13,
              }}
            >
              Nada planejado ainda ✨
            </p>
          )}

          {(planner[selectedDay] || []).map((session, index) => (
            <div
              key={index}
              onClick={() => toggleSession(index)}
              style={{
                marginBottom: 8,
                padding: 10,
                borderRadius: 12,
                background: session.done ? "#e8f5e9" : "#f5f5f5",
                textDecoration: session.done ? "line-through" : "none",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              {session.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


