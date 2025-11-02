import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import AnimatedHero from "./components/AnimatedHero";
import FeatureGrid from "./components/FeatureGrid";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

import AuthGate from "./components/AuthGate";
import StroopGame from "./components/StroopGame";
import GoNoGoGame from "./components/GoNoGoGame";
import Dashboard from "./components/Dashboard";
import Learn from "./pages/Learn";
import Quiz from "./pages/Quiz";
import Blog from "./pages/Blog";

function Home(){
  return (
    <>
      <AnimatedHero />
      <FeatureGrid />
      <Testimonials />
      <Gallery />
      <Footer />
    </>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<div className="container section"><Learn/></div>} />
        <Route path="/quiz" element={<div className="container section"><Quiz/></div>} />
        <Route path="/blog" element={<div className="container section"><Blog/></div>} />
        {/* private */}
        <Route path="/game" element={<AuthGate><div className="container section"><StroopGame/></div></AuthGate>} />
        <Route path="/game/gonogo" element={<AuthGate><div className="container section"><GoNoGoGame/></div></AuthGate>} />
        <Route path="/dashboard" element={<AuthGate><div className="container section"><Dashboard/></div></AuthGate>} />
      </Routes>
    </BrowserRouter>
  );
}
