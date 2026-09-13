import React from 'react';
import { MessageCircle, Loader2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

// Elegant Primary, Secondary and Accent Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 cursor-pointer";
  
  const variants = {
    primary: "bg-[#B85C72] text-[#FFFFFF] hover:bg-[#A34E62] focus:ring-[#B85C72]",
    secondary: "bg-[#24191B] text-[#FFF9F7] hover:bg-black focus:ring-[#24191B]",
    accent: "bg-[#D4A373] text-[#24191B] hover:bg-[#C59262] focus:ring-[#D4A373]",
    outline: "border border-[#B85C72] text-[#B85C72] bg-transparent hover:bg-[#FFF9F7]/30 focus:ring-[#B85C72]",
    text: "text-[#B85C72] bg-transparent hover:underline px-0 py-0 focus:ring-0"
  };

  const sizes = {
    sm: "text-xs px-5 py-2",
    md: "text-sm px-7 py-3",
    lg: "text-base px-9 py-4"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// WhatsApp Button floating
export const WhatsAppButton: React.FC<{ number: string; message?: string }> = ({ 
  number, 
  message = "Hi Glow & Grace, I would like to book an appointment." 
}) => {
  const cleanNum = number.replace(/[^0-9+]/g, '');
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-sm font-medium"></span>
    </a>
  );
};

// Toast message component
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-[#24191B] border-[#D4A373]',
    error: 'bg-red-950 border-red-500',
    info: 'bg-[#24191B] border-[#B85C72]'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#D4A373] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Sparkles className="w-5 h-5 text-[#B85C72] shrink-0" />
  };

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${bgColors[type]} text-white max-w-sm animate-fade-in`}>
      {icons[type]}
      <p className="text-sm font-medium leading-tight">{message}</p>
      <button onClick={onClose} className="text-white/50 hover:text-white text-xs ml-auto pl-2 cursor-pointer">&times;</button>
    </div>
  );
};

// Loading State Spinner
export const LoadingState: React.FC<{ message?: string }> = ({ message = "Chasing elegance..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
      <Loader2 className="w-10 h-10 animate-spin text-[#B85C72] mb-4" />
      <p className="text-[#24191B]/60 font-serif italic text-base">{message}</p>
    </div>
  );
};

// Empty State illustration block
export const EmptyState: React.FC<{ title: string; message: string; actionText?: string; onAction?: () => void }> = ({
  title,
  message,
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px] border border-dashed border-[#F5DDE1] rounded-2xl bg-white max-w-md mx-auto">
      <Sparkles className="w-12 h-12 text-[#D4A373] mb-4 opacity-70" />
      <h3 className="text-lg font-serif text-[#24191B] mb-2">{title}</h3>
      <p className="text-[#24191B]/60 text-sm mb-6 leading-relaxed">{message}</p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

// Error State Block
export const ErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = "Something beautifully unexpected occurred.",
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[300px]">
      <AlertCircle className="w-12 h-12 text-[#B85C72] mb-4" />
      <h3 className="text-lg font-serif text-[#24191B] mb-2">Beautiful Glitch</h3>
      <p className="text-[#24191B]/60 text-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

// Status Badge
export const StatusBadge: React.FC<{ status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' }> = ({ status }) => {
  const styles = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Completed: 'bg-purple-50 text-purple-700 border-purple-200',
    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status}
    </span>
  );
};
