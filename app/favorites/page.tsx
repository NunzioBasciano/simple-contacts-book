import React from "react";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import { labels } from "../data/label";

function Favorites() {
  return (
    <>
      <Header label={labels.favoritesLabel} />
      <MainSection />
    </>
  );
}

export default Favorites;