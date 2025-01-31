import Lottie from "react-lottie-player";
import animationData from "../assets/demo-animation.json"; // ✅ Import your local JSON file

export function DemoComponent() {
  return (
    <section id="demo-section" className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-2 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Demo
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Let's see how everything works.
          </p>
        </div>

        {/* ✅ Lottie Animation (Using react-lottie-player) */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-center">
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: 300, height: 300 }}
          />
        </div>
      </div>
    </section>
  );
}
