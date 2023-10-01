import { useState, useEffect, useRef } from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import videosData from '../../data/videos.json'; // Ajusta la ruta según tu estructura de archivos

export const Sliders = () => {
    const [currentSlide, setCurrentSlide] = useState(videosData.videos[0].id);
    const [videosLoaded, setVideosLoaded] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null); // Estado para rastrear el video activo
    const videoRefs = useRef({}); // Ref para almacenar las referencias de los elementos de video

    useEffect(() => {
        // Esta función se ejecutará cuando el componente se monte
        // Aquí puedes implementar la lógica para verificar si las imágenes están cargadas
        // Vamos a suponer que las imágenes están cargadas después de 2 segundos (para fines de demostración)
        const timeout = setTimeout(() => {
            setVideosLoaded(true);
        }, 2000);

        // Limpia el temporizador cuando el componente se desmonte
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const {
        carouselFragment,
        slideToPrevItem,
        slideToNextItem,
        useListenToCustomEvent,
    } = useSpringCarousel({
        itemsPerSlide: 3,
        withLoop: true,
        gutter: 24,
        items: videosData.videos.map((item) => {
            return {
                ...item,
                renderItem: (
                    <div className={`grid aspect-[2] w-full place-items-center text-2xl text-whit`}>
                        {videosLoaded ? (
                            <div className='border-4 border-cyan-400 relative w-full h-full'>
                                {/* La imagen se superpone al video */}
                                <img
                                    src={item.linkImagen}
                                    alt={item.titulo}
                                    width="400"
                                    height="305"
                                    className={`absolute top-0 left-0 w-full h-full cursor-pointer ${activeVideo === item.id ? 'hidden' : ''}`}
                                    onClick={() => toggleVideo(item.id)}
                                />
                                <iframe
                                    src={item.linkVideo}
                                    width="400"
                                    height="305"
                                    style={{ border: 'none' }}
                                    ref={(el) => (videoRefs.current[item.id] = el)} // Ref para el elemento de video
                                    className={`absolute top-0 left-0 w-full h-full ${activeVideo !== item.id ? 'hidden' : ''}`}
                                ></iframe>
                            </div>
                        ) : (
                            <div className="loading-spinner text-white">Cargando...</div>
                        )}
                    </div>
                ),
            };
        }),
    });

    // Función para alternar entre imagen y video al hacer clic en la imagen
    const toggleVideo = (videoId) => {
        if (activeVideo === videoId) {
            // Si se hace clic en la imagen del video activo, detener el video y ocultar el video
            const video = videoRefs.current[videoId];
            if (video) {
                video.pause();
            }
            setActiveVideo(null);
        } else {
            // Si se hace clic en una nueva imagen, ocultar la imagen anterior y mostrar el nuevo video
            setActiveVideo(videoId);
        }
    };

    useListenToCustomEvent((event) => {
        if (event.eventName === 'onSlideStartChange') {
            setCurrentSlide(event?.nextItem?.id);
        }
    });

    return (
        <div>
            <div className='mt-20 mx-10 text-2xl text-center font-semibold text-white'>
                THIS IS WHY
            </div>
            <div className="py-5 relative">
                <button onClick={slideToPrevItem} className="text-white absolute top-1/2 -translate-y-1/2 -translate-x-full left-[10%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="mx-auto w-[80%] overflow-x-clip py-[4%] relative">
                    {carouselFragment}
                </div>
                <button onClick={slideToNextItem} className="text-white absolute top-1/2 -translate-y-1/2 translate-x-full right-[10%]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};