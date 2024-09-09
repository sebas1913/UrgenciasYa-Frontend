"use client";
import Slider from "./components/slider/slider";
import AboutUs from "./components/about-us/About-us";
import SearchForm from "./components/search-form/Search-form";
export default function Home() {
  return (
    <main>
        <SearchForm></SearchForm>
        <Slider></Slider>
        <AboutUs></AboutUs>

    </main>
  );
}
