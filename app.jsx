import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-xl font-semibold mb-4 text-center">
            🎾 Planner de Treinos
          </h1>

          {/* Seleção de dia */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder={`Treino de ${selectedDay}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={addSession}>Adicionar</Button>
          </div>

          {/* Lista */}
          <div className="space-y-2">
            {(planner[selectedDay] || []).length === 0 && (
              <p className="text-sm text-gray-400 text-center">
                Nenhum treino ainda 👀
              </p>
            )}

            {(planner[selectedDay] || []).map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl cursor-pointer ${
                  session.done
                    ? "bg-green-100 line-through"
                    : "bg-gray-50"
                }`}
                onClick={() => toggleSession(index)}
              >
                {session.text}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
