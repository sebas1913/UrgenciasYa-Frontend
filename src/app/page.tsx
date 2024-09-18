"use client";
import Slider from "../components/slider/slider";
import AboutUs from "../components/about-us/About-us";
import HomeInformation from "../components/home-information/Home-information";
import ButtonFloating from "../components/button-floating/Button-floating";

export default function Home() {
  return (
    <main>
        <HomeInformation></HomeInformation>
        <ButtonFloating></ButtonFloating>
        <Slider></Slider>
        <AboutUs></AboutUs>
        
    </main>
  );
}
