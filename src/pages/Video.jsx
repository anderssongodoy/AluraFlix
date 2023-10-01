import { useState } from "react";
import { Button, Footer, Header, TextField } from "../components";
import { Link } from "react-router-dom";
import videosData from '../data/videos.json'; // Importa los datos de videos

export const Video = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    linkVideo: '',
    linkImagen: '',
    categoria: '', // Cambia el campo de categoría a un campo de texto
    codigoSeguridad: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      linkVideo: '',
      linkImagen: '',
      categoria: '',
      codigoSeguridad: '',
    });
  };

  const handleSave = () => {
    const newVideo = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      linkVideo: formData.linkVideo,
      linkImagen: formData.linkImagen,
      categoria: formData.categoria,
      codigoSeguridad: formData.codigoSeguridad,
    };

    // Agrega el nuevo video al archivo videos.json
    videosData.videos.push(newVideo);

    // Puedes guardar los datos en el almacenamiento local si quieres persistencia
    localStorage.setItem('videosData', JSON.stringify(videosData));

    // También puedes realizar alguna acción adicional aquí, como enviar los datos a un servidor
    console.log('Form Data:', formData);
    console.log(videosData)
  };

  return (
    <div className="bg-[#000000E5] min-h-screen text-white">
      <Header />
      <div className="text-4xl font-bold text-center mt-10">
        NUEVO VIDEO
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="shadow-md rounded mx-10"
      >
        <TextField
          label="Title"
          name="titulo"
          value={formData.titulo}
          onChange={handleInputChange}
          placeholder="Enter the title"
        />

        <TextField
          label="Video URL"
          name="linkVideo"
          value={formData.linkVideo}
          onChange={handleInputChange}
          placeholder="Enter the video URL"
        />

        <TextField
          label="Image URL"
          name="linkImagen"
          value={formData.linkImagen}
          onChange={handleInputChange}
          placeholder="Enter the image URL"
        />

        {/* Campo de categoría como un elemento desplegable */}
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="categoria"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a category</option>
            {videosData.categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="descripcion"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Enter the description"
            rows="4"
          />
        </div>

        <TextField
          label="Security Code"
          name="codigoSeguridad"
          value={formData.codigoSeguridad}
          onChange={handleInputChange}
          placeholder="Enter the security code"
        />

        <div className="flex items-center justify-between mt-4">
          <div>
            <Button
              text="Limpiar"
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />

            <Button
              text="Save"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <Link to="/categoria">Nueva Categoria</Link>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};