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
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

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

  const deleteSession = (index) => {
    const updatedDay = [...(planner[selectedDay] || [])];
    updatedDay.splice(index, 1);

    setPlanner({
      ...planner,
      [selectedDay]: updatedDay,
    });
  };

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const saveEdit = () => {
    const updatedDay = [...(planner[selectedDay] || [])];
    updatedDay[editingIndex].text = editingText;

    setPlanner({
      ...planner,
      [selectedDay]: updatedDay,
    });

    setEditingIndex(null);
    setEditingText("");
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
              style={{
                marginBottom: 10,
                padding: 10,
                borderRadius: 12,
                background: "#f5f5f5",
                fontSize: 14,
              }}
            >
              {editingIndex === index ? (
                <div>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 8,
                      marginBottom: 6,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  />
                  <button onClick={saveEdit} style={{ marginRight: 6 }}>
                    Salvar
                  </button>
                  <button onClick={() => setEditingIndex(null)}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    onClick={() => toggleSession(index)}
                    style={{
                      textDecoration: session.done ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {session.text}
                  </span>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => startEditing(index, session.text)}>
                      ✏️
                    </button>
                    <button onClick={() => deleteSession(index)}>
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
