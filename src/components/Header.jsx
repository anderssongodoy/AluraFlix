import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {

    const [ventanaPequena, setVentanaPequena] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setVentanaPequena(window.innerWidth <= 768);
    };

    // Agregar un event listener para cambiar el estado cuando cambie el tamaño de la ventana.
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonta.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <div className="flex justify-center md:justify-between bg-topbar text-white">
            <div className="m-5">
                <img src="/LogoMain.png" alt="logito" />
            </div>
            <div className="mt-7 mr-5">
            <Link to="/video" className={`border px-7 py-3 ${ventanaPequena ? 'hidden' : ''}`}>
                Nuevo Video
            </Link>
            </div>
        </div>
    );
};
