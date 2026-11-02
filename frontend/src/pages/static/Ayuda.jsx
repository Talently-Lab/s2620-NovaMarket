import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_DATA } from "../../const/faqData";

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden bg-white transition-all duration-200 hover:border-gray-300 shadow-sm">
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-spartan font-bold text-primary text-base pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-secondary" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="p-5 pt-0 text-gray-600 font-inter text-sm leading-relaxed border-t border-gray-100 mt-2">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Ayuda = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let globalQuestionIndex = 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="font-spartan font-bold text-3xl md:text-4xl text-primary mb-4">
          Centro de Ayuda
        </h1>
        <p className="font-inter text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
          Encontrá respuestas rápidas a las dudas más comunes sobre el proceso
          de compra, envíos y medios de pago.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {FAQ_DATA.map((section, sectionIdx) => (
          <section
            key={sectionIdx}
            className="flex flex-col md:flex-row gap-6 md:gap-12"
          >
            {/* Columna de Categoría */}
            <div className="md:w-1/3 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="bg-[#F0F4F8] p-3 rounded-2xl">
                  <section.Icon size={24} className="text-secondary" />
                </div>
                <h2 className="font-spartan font-bold text-xl text-primary">
                  {section.category}
                </h2>
              </div>
            </div>

            {/* Columna de Preguntas */}
            <div className="md:w-2/3">
              {section.questions.map((item) => {
                const currentIndex = globalQuestionIndex++;
                return (
                  <AccordionItem
                    key={currentIndex}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex === currentIndex}
                    onClick={() => handleToggle(currentIndex)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Tarjeta de Contacto */}
      <div className="mt-16 bg-[#F0F4F8] border border-gray-200 rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch shadow-sm">
        <div className="p-8 md:p-12 md:w-[45%] flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4">
          <h3 className="font-spartan font-bold text-2xl md:text-3xl text-primary">
            ¿Aún tenés dudas?
          </h3>
          <p className="font-inter text-gray-600 text-sm md:text-base leading-relaxed">
            Nuestro equipo de asesores está disponible de Lunes a Viernes de
            9:00 a 18:00 hs para ayudarte a elegir el equipamiento ideal o
            resolver cualquier inconveniente.
          </p>
          <button
            type="button"
            className="mt-4 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors cursor-pointer shadow-md"
          >
            Contactar Soporte
          </button>
        </div>

        <div className="w-full md:w-[55%] relative min-h-62.5 md:min-h-auto">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
            alt="Consultor de atención al cliente asesorando"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-left"
          />
        </div>
      </div>

    </div>
  );
};
