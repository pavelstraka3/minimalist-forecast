import "./App.css";
import { Card, CardContent } from "@/components/ui/card.tsx";

function App() {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px] flex justify-center">
        <CardContent>
          <div className="text-2xl">9°C</div>
          <div>Sunny</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
