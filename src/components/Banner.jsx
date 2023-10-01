
export const Banner = () => {
    return (
        <div className="relative">
            <img src="/banner.png" alt="Descripción de la imagen" className="w-full h-auto" />
            <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
            <div className="absolute inset-0 flex items-center flex-col justify-end m-10">
                <div className="text-white text-4xl font-bold m-10">
                    Challenge React
                </div>
                <div className="text-2xl bg-white px-10 py-1 rounded-lg">
                    Ver
                </div>
            </div>
        </div >
    )
}
