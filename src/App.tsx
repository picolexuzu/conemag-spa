import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Equipos from "@/pages/Equipos";
import EquipoDetail from "@/pages/EquipoDetail";
import Servicios from "@/pages/Servicios";
import Nosotros from "@/pages/Nosotros";
import Contacto from "@/pages/Contacto";
import NotFound from "@/pages/NotFound";
import EmConstrucao from "@/pages/EmConstrucao";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Modo "site em construção": ativo somente no build de produção (npm run build).
// No preview do Lovable (dev) o site completo continua acessível.
const CONSTRUCTION_MODE =
  import.meta.env.VITE_CONSTRUCTION_MODE === "false" ? false : import.meta.env.PROD;

export default function App() {
  if (CONSTRUCTION_MODE) {
    return (
      <Routes>
        <Route path="/" element={<EmConstrucao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/em-construcao" element={<EmConstrucao />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/equipos/:slug" element={<EquipoDetail />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppFloat />
    </>
  );
}
