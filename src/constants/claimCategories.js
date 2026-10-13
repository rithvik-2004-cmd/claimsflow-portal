import { Car, HeartPulse, House, Plane, Scale, Smartphone } from 'lucide-react';

export const CLAIM_CATEGORIES = [
  { value: 'motor', label: 'Motor', icon: Car, description: 'Accident, theft or damage to your vehicle' },
  { value: 'health', label: 'Health', icon: HeartPulse, description: 'Hospitalisation and medical expenses' },
  { value: 'home', label: 'Home & Property', icon: House, description: 'Fire, flood, burglary or structural damage' },
  { value: 'travel', label: 'Travel', icon: Plane, description: 'Trip cancellation, delay or lost baggage' },
  { value: 'device', label: 'Mobile & Appliances', icon: Smartphone, description: 'Screen damage, theft or breakdown' },
  { value: 'liability', label: 'Liability', icon: Scale, description: 'Third-party injury or property damage' },
];

export const getCategoryLabel = (value) =>
  CLAIM_CATEGORIES.find((category) => category.value === value)?.label ?? value;