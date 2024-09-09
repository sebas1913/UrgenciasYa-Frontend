"use client";
import Slider from "./components/slider/slider";
import AboutUs from "./components/about-us/About-us";
import SearchForm from "./components/search-form/Search-form";
import HomeInformation from "./components/home-information/Home-information";

export default function Home() {
  return (
    <main>
        <HomeInformation></HomeInformation>
        <SearchForm></SearchForm>
        <Slider></Slider>
        <AboutUs></AboutUs>
    </main>
  );
}
