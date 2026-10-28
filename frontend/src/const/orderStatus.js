import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export const ORDER_STATUS_CONFIG = {
  COMPLETED: {
    label: 'Completada',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dotClass: 'bg-highlight',
    Icon: CheckCircle2,
  },
  CONFIRMED: {
    label: 'Confirmada',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dotClass: 'bg-highlight',
    Icon: CheckCircle2,
  },
  PENDING: {
    label: 'Pendiente',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
    dotClass: 'bg-amber-500',
    Icon: Clock,
  },
  CANCELLED: {
    label: 'Cancelada',
    badgeClass: 'bg-error-light text-error-dark border-error/30',
    dotClass: 'bg-error',
    Icon: XCircle,
  },
};