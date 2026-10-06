import { Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tag } from '../atoms/Tag';
import { Button } from '../atoms/Button';


export const HeroBanner = () => {
    const navigate = useNavigate();

    return (
        <section className='bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full shadow-lg'>

            {/* Lado Izquierdo */}
            <div className='flex-1 flex flex-col items-start gap-5'>
                <Tag text="Nuevo"></Tag>
                <h1 className='font-spartan font-bold text-4xl md:text-5xl lg:text-6xl text-neutral-white leading-tight tracking-tight'>
                    Tecnología que se siente fácil
                </h1>

                <p className='font-inter text-gray-300 text-sm md:text-base max-w-md'>
                    Mejora tu setup sin equivocarte: specs claras, garantía oficial y envío con seguimiento
                </p>

                <Button variant='primary' onClick={() => navigate('/categorias')} >
                    Ver Productos
                </Button>
            </div>

            {/* Lado Derecho */}
            <div className="flex-1 w-full flex justify-center md:justify-end">
                <div className="w-full max-w-md aspect-16/10 bg-linear-to-br from-accent to-secondary rounded-xl flex items-center justify-center shadow-inner">
                <Headphones size={80} className="text-neutral-white opacity-80" strokeWidth={1} />
                </div>
            </div>


        </section>
    )
}