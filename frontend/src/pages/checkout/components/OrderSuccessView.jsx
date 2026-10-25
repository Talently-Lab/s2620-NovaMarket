import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "../../../components/atoms/Button";
import { AnimatedPackage } from "./AnimatedPackage";

export const OrderSuccessView = ({ order }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const orderId = order?.id || order?.orderNumber || "1024";
  const userEmail = user?.email || "alex@correo.com";

  return (
    <div className="w-full flex justify-center py-12 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 flex flex-col items-center text-center max-w-xl w-full">
        <div className="mb-6">
          <AnimatedPackage />
        </div>

        <h1 className="font-spartan font-bold text-3xl sm:text-4xl text-[#1a202c] mb-3">
          ¡Compra exitosa!
        </h1>

        <p className="font-inter text-gray-600 mb-8 max-w-sm leading-relaxed">
          Tu pedido <span className="font-bold text-gray-800">#{orderId}</span>{" "}
          está confirmado. Te enviamos el comprobante a {userEmail}.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button
            variant="secondary"
            onClick={() => navigate("/cuenta")}
            className="w-full sm:w-auto px-8 py-3 bg-secundary text-white hover:bg-[#0a3880]"
          >
            Ver mi pedido
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/categorias")}
            className="w-full sm:w-auto px-8 py-3"
          >
            Seguir comprando
          </Button>
        </div>
      </div>
    </div>
  );
};
