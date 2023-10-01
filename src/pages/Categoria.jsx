import { useEffect, useState } from "react";
import { Button, Footer, Header, TextField } from "../components";
import videosData from '../data/videos.json';

export const Categoria = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '', // Agregamos el campo de descripción
    color: '',
    codigoSeguridad: '',
  });

  const [categorias, setCategorias] = useState(videosData.categorias);
  const [editIndex, setEditIndex] = useState(-1); // Estado para el índice de edición
  const [videosRelacionados, setVideosRelacionados] = useState([]); // Estado para los videos relacionados

  useEffect(() => {
    // Filtrar los videos relacionados cuando cambie la categoría seleccionada
    if (formData.nombre) {
      const videosCategoria = videosData.videos.filter(video => video.categoria === formData.nombre);
      setVideosRelacionados(videosCategoria);
    }
  }, [formData.nombre]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      color: '',
      codigoSeguridad: '',
    });
    setEditIndex(-1);
    setVideosRelacionados([]); // Limpiar videos relacionados al limpiar el formulario
  };

  const handleSave = () => {
    const newCategoria = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      color: formData.color,
      codigoSeguridad: formData.codigoSeguridad,
    };

    if (editIndex === -1) {
      setCategorias([...categorias, newCategoria]);
    } else {
      const updatedCategorias = [...categorias];
      updatedCategorias[editIndex] = newCategoria;
      setCategorias(updatedCategorias);
      setEditIndex(-1);
    }

    // También puedes realizar otras acciones necesarias, como guardar en videos.json
    console.log('Form Data:', formData);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const categoriaEdit = categorias[index];
    setFormData({
      nombre: categoriaEdit.nombre,
      descripcion: categoriaEdit.descripcion,
      color: categoriaEdit.color,
      codigoSeguridad: categoriaEdit.codigoSeguridad,
    });
  };

  const handleRemove = (index) => {
    const updatedCategorias = [...categorias];
    updatedCategorias.splice(index, 1);
    setCategorias(updatedCategorias);

    // Puedes actualizar el archivo videos.json o realizar otras acciones necesarias
  };

  return (
    <div className="bg-[#000000E5] min-h-screen text-white">
      <Header />
      <div className="text-4xl font-bold text-center mt-10">
        NUEVA CATEGORÍA
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="shadow-md rounded mx-10"
      >
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder="Nombre de la categoría"
        />

        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción de la categoría"
        />

        <TextField
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          placeholder="Color de la categoría"
        />

        <TextField
          label="Código de Seguridad"
          name="codigoSeguridad"
          value={formData.codigoSeguridad}
          onChange={handleInputChange}
          placeholder="Código de seguridad"
        />

        <div className="flex items-center justify-between mt-4">
          <div>
            <Button
              text="Limpiar"
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />

            <Button
              text={editIndex === -1 ? 'Guardar' : 'Editar'}
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </form>

      {editIndex !== -1 && (
        <div className="mx-10 mt-10">
          <h2 className="text-2xl font-bold mb-4">Videos Relacionados</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody>
              {videosRelacionados.map((video, index) => (
                <tr key={index} className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm leading-5 font-medium text-gray-900">
                          {video.titulo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {video.descripcion}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mx-10 mt-10">
        <h2 className="text-2xl font-bold mb-4">Categorías Existenes</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Editar
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
            {categorias.map((categoria, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {categoria.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {categoria.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    text="Editar"
                    onClick={() => handleEdit(index)}
                    className="text-indigo-600 hover:text-indigo-900"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    text="Eliminar"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-900"
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};