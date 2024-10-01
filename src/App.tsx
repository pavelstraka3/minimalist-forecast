import "./App.css";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {fetchWeatherData, WeatherData} from "@/lib/fetchWeatherData.ts";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";

function App() {
    const {data, error, isLoading} = useQuery({queryKey: ["weather"], queryFn: fetchWeatherData});
    const [weatherNow, setWeatherNow] = useState<WeatherData | null>(null);

    useEffect(() => {
        if (data) {
            // find data in current hour
            const now = new Date();
            const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());

            const currentWeather = data?.find((weather: WeatherData) => {
                const weatherTime = new Date(weather.time);
                return weatherTime.getTime() === currentHour.getTime();
            });
            setWeatherNow(currentWeather || null);
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex justify-center items-center">
            {/*<pre>{JSON.stringify(weatherNow)}</pre>*/}
            <Card className="w-[350px] flex justify-center">
                <CardContent>
                    <div className="text-2xl">{weatherNow?.temperature2m.toFixed(1)}°C</div>
                    <div>Sunny</div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
