import { Truck, ShieldCheck, Undo2, Lock } from 'lucide-react';
import { FeatureCard } from '../molecules/FeatureCard';

export const FeatureList = () => {
    const features = [
        { icon: <Truck size={24} strokeWidth={1.5} />, title: "Envío con seguimiento", desc: "En todo el país" },
        { icon: <ShieldCheck size={24} strokeWidth={1.5} />, title: "Garantía oficial", desc: "12 meses en todos los productos" },
        { icon: <Undo2 size={24} strokeWidth={1.5} />, title: "Devolución gratis", desc: "30 días sin preguntas" },
        { icon: <Lock size={24} strokeWidth={1.5} />, title: "Pago seguro", desc: "Tus datos protegidos" },
    ];

    return (
        <section className='flex flex-col md:flex-row gap-4 justify-between w-full'>
            {features.map((feature, index) => (
                <FeatureCard 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.desc}
                />
            ))}
        </section>
    );
}