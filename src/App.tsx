import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PokemonPage = lazy(() => import("./pages/PokemonPage"));
const FavoritePage = lazy(() => import("./pages/FavoritePage"));

const App = () => {
  return (
    <>
      <Suspense fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Loading />
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:name" element={<PokemonPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
