export interface PlanProps {
  id: string;
  name: string;
  pixPrice: number;
  creditCardPrice: number; // Assumindo que sua API retorna isso
  yearlyDiscount: number;
  description?: string;
}

export interface ProfileProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  number: string;
  postalCode: string;
  role: string;
  paymentDoc: string;
  paymentId: string;
  paymentType: string;
}
