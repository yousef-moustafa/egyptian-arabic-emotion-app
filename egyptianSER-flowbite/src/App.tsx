import { NavbarComponent } from "./components/NavbarComponent";
import { HeroComponent } from "./components/HeroComponent";
import { FeaturesComponent } from "./components/FeaturesComponent";
import { DemoComponent } from "./components/DemoComponent";
import { UseCasesComponent } from "./components/UseCasesComponent";

import './App.css';
import { FileuploadComponent } from "./components/FileuploadComponent";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Navbar at the top (Fixed position if needed) */}
      <NavbarComponent />

      {/* ✅ Hero Section */}
      <HeroComponent />

      {/* ✅ Features Section (How It Works) */}
      <FeaturesComponent />

      {/* ✅ Demo Section (Try It Out) */}
      <DemoComponent />

      <FileuploadComponent />

      {/* ✅ Use Cases Section (Where It’s Used) */}
      <UseCasesComponent />

    </div>
  );
}

export default App;
