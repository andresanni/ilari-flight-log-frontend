import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const BASE_URL = "http://localhost:3000/api/diaries";

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(BASE_URL);
  return response.data;
};

const save = async (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post(BASE_URL, newEntry);
  return response.data;
};

export default { getAll, save };
