import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCheckout } from '../../hooks/useCheckout';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { OrderSuccessView } from './components/OrderSuccessView';

export const CheckoutPage = () => {
  const {
    formData,
    submitting,
    error,
    orderSuccess,
    handleChange,
    handleSubmit,
    items,
    totalItems,
    totalAmount
  } = useCheckout();

  if (orderSuccess) {
    return <OrderSuccessView order={orderSuccess} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
      <Link to="/carrito" className="inline-flex items-center gap-2 font-inter text-sm font-medium text-gray-500 hover:text-primary transition-colors min-h-11 mb-6">
        <ArrowLeft size={16} /> Volver al carrito
      </Link>

      <h1 className="font-spartan font-bold text-3xl text-primary mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <CheckoutForm 
          formData={formData} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          submitting={submitting} 
          error={error} 
        />
        
        <OrderSummary 
          items={items} 
          totalItems={totalItems} 
          totalAmount={totalAmount} 
        />
      </div>
    </div>
  );
};