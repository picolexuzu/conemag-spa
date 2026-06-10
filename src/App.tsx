import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Equipos from "@/pages/Equipos";
import EquipoDetail from "@/pages/EquipoDetail";
import Servicios from "@/pages/Servicios";
import Nosotros from "@/pages/Nosotros";
import Contacto from "@/pages/Contacto";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/equipos/:slug" element={<EquipoDetail />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppFloat />
    </>
  );
}
