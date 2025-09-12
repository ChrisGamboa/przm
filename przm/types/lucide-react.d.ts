declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  type IconProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  };
  
  type Icon = ComponentType<IconProps>;
  
  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const Eye: Icon;
  export const MapPin: Icon;
  export const Clock: Icon;
  export const Car: Icon;
  export const Phone: Icon;
  export const User: Icon;
  export const Building: Icon;
  export const Navigation: Icon;
  export const Calendar: Icon;
  export const CheckCircle2: Icon;
  export const PlayCircle: Icon;
  export const XCircle: Icon;
  export const DollarSign: Icon;
  export const XIcon: Icon;
  export const AlertTriangle: Icon;
  export const Filter: Icon;
  export const SortAsc: Icon;
  export const RefreshCw: Icon;
  export const Truck: Icon;
  export const Receipt: Icon;
  export const CreditCard: Icon;
  export const Shield: Icon;
  export const AlertCircle: Icon;
  export const Banknote: Icon;
  export const FileText: Icon;
  export const RotateCcw: Icon;
  export const Check: Icon;
  export const Pen: Icon;
  
  // Add other icons as needed
  const lucideReact: {
    [key: string]: Icon;
  };
  
  export default lucideReact;
}
