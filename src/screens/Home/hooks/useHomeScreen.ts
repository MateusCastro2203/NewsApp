import { fetchNews } from "@/services/api";
import { usePreferencesStore } from "@/store";
import React from "react";
import { useEffect } from "react";

import { useQuery } from "react-query";

export const fetchAllArticles = async (category: string[]) => {
  const api = process.env.EXPO_PUBLIC_NEWS_LAST_URL;

  const response = await fetch(
    `${api}language=pt&category=${category}&apikey=pub_78082765991020c3d0b6a44052ff7ae1ecc84`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useHomeScreen = async (category: string[]) => {
  //const data = fetchNews();

  try {
    const response = await fetchAllArticles(category);
    console.log("Fetched data:", response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //newsdata.io/api/1/latest?apikey=pub_78082765991020c3d0b6a44052ff7ae1ecc84&category=science
};
