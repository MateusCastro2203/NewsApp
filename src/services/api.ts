import axios from "axios";

export const fetchNews = async () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { data } = await axios.get(
    `${apiUrl}/top-headlines?country=br?language=pt&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`
  );
  console.log("Response:", data);
  console.log("API URL:", apiUrl);
};
