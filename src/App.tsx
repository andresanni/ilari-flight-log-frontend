import { useEffect, useState } from "react";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
} from "./types";
import diaryEntryService from "./diaryEntryService";
import { parseWeather, parseVisibility } from "./utils";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");

  const [weatherOptions, setWeatherOptions] = useState<Array<string>>([]);
  const [visibilityOptions, setVisibilityOptions] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await diaryEntryService.getAll();
      setDiaryEntries(entries);
    };
    fetchData();
    setWeatherOptions(Object.values(Weather));
    setVisibilityOptions(Object.values(Visibility));
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const parsedWeather = parseWeather(newWeather);
      const parsedVisibility = parseVisibility(newVisibility);

      const newEntry: NewDiaryEntry = {
        date: newDate,
        visibility: parsedVisibility,
        weather: parsedWeather,
        comment: newComment,
      };

      const savedEntry = await diaryEntryService.save(newEntry);
      setDiaryEntries(diaryEntries.concat(savedEntry));
      setNewComment("");
      setNewDate("");
      setNewVisibility("");
      setNewWeather("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setTimeout(() => setError(""), 5000);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">date:</label>
        <input
          type="date"
          id="date"
          value={ newDate }
          min="1990-01-01"
          max="2028-12-31"
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br />
        weather:{" "}
        {weatherOptions.map((option) => {
          return (
            <span key={option}>
              <label htmlFor={option}>{option}</label>
              <input
                type="radio"
                id={option}
                name="Weather"
                value={option}
                onChange={(event) => setNewWeather(event.target.value)}
                checked={newWeather === option}
              />
            </span>
          );
        })}
        <br />
        visibility:{" "}
        {visibilityOptions.map((option) => {
          return (
            <span key={option}>
              <label htmlFor={option}>{option}</label>
              <input
                type="radio"
                id={option}
                name="Visibility"
                value={option}
                onChange={(event) => setNewVisibility(event.target.value)}
                checked={newVisibility === option}
              />
            </span>
          );
        })}
        <br />
        comment:{" "}
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>

      <h2>Diary Entries</h2>
      <ul>
        {diaryEntries.map((entry) => {
          return (
            <li key={entry.id}>
              <h3>{entry.date}</h3>
              <p>Visibility: {entry.visibility}</p>
              <p>Weather: {entry.weather}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
