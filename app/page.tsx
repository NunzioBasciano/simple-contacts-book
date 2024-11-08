import Header from "./components/Header";
import MainSection from "./components/MainSection";
import { labels } from "./data/label";

export default function Home() {
  return (
    <>
      <Header label={labels.contactsLabel} />
      <MainSection />
    </>
  );
}
