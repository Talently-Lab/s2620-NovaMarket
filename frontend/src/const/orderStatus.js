import { CheckCircle2, XCircle } from 'lucide-react';

export const ORDER_STATUS_CONFIG = {
  CONFIRMED: {
    label: 'Confirmada',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dotClass: 'bg-highlight',
    Icon: CheckCircle2,
  },
  CANCELLED: {
    label: 'Cancelada',
    badgeClass: 'bg-error-light text-error-dark border-error/30',
    dotClass: 'bg-error',
    Icon: XCircle,
  },
};