import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, FileText, Clock, Sparkles, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { MockDB } from '../data';
import { Service, Artist, Appointment } from '../types';
import { Button } from './Common';

interface BookingFormProps {
  onSuccess: (booking: Appointment) => void;
  initialServiceSlug?: string;
  initialArtistSlug?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ 
  onSuccess, 
  initialServiceSlug,
  initialArtistSlug 
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  
  // Form fields state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [artistId, setArtistId] = useState('');

  // Mobile multi-step wizard state
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch options from DB
    const listServices = MockDB.getServices().filter(s => s.status === 'Active');
    const listArtists = MockDB.getArtists().filter(a => a.status === 'Active');
    setServices(listServices);
    setArtists(listArtists);

    if (initialServiceSlug) {
      const activeServ = listServices.find(s => s.slug === initialServiceSlug);
      if (activeServ) {
        setServiceId(activeServ.id);
      }
    } else if (listServices.length > 0) {
      setServiceId(listServices[0].id);
    }

    if (initialArtistSlug) {
      const activeArt = listArtists.find(a => a.slug === initialArtistSlug);
      if (activeArt) {
        setArtistId(activeArt.id);
      }
    }
  }, [initialServiceSlug, initialArtistSlug]);

  const validateStep = (currentStep: number) => {
    const errs: Record<string, string> = {};
    if (currentStep === 1) {
      if (!customerName.trim()) errs.customerName = 'Please enter your beautiful name';
      if (!phone.trim()) {
        errs.phone = 'Please enter your contact number';
      } else if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
        errs.phone = 'Please enter a valid phone number';
      }
      if (!email.trim()) {
        errs.email = 'Please enter your email';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errs.email = 'Please enter a valid email address';
      }
    } else if (currentStep === 2) {
      if (!serviceId) errs.serviceId = 'Please select a service';
      if (!date) errs.date = 'Please select a preferred date';
      if (!time) errs.time = 'Please select an appointment time';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      if (!validateStep(1)) setStep(1);
      return;
    }

    const matchedService = services.find(s => s.id === serviceId);
    const matchedArtist = artists.find(a => a.id === artistId);

    const appt = MockDB.saveAppointment({
      customerName,
      phone,
      email,
      serviceId,
      serviceName: matchedService ? matchedService.name : 'Beauty Treatment',
      artistId: artistId || 'any',
      artistName: matchedArtist ? matchedArtist.name : 'Any Available Artist',
      date,
      time,
      specialRequest
    });

    onSuccess(appt);
  };

  return (
    <div className="bg-white border border-[#F5DDE1] rounded-3xl p-6 md:p-10 shadow-lg">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-8 border-b border-[#F5DDE1]/60 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#B85C72] block font-sans font-bold">
            Step {step} of 3
          </span>
          <h3 className="font-serif text-lg font-bold text-[#24191B]">
            {step === 1 ? 'Your Details' : step === 2 ? 'Select Services & Timing' : 'Review & Confirm'}
          </h3>
        </div>
        
        {/* Step Indicator dots */}
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === step ? 'bg-[#B85C72] w-6' : i < step ? 'bg-[#D4A373]' : 'bg-[#F5DDE1]'
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- STEP 1: Customer Details --- */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            {/* Customer Name */}
            <div>
              <label htmlFor="name-input" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B85C72]/60" />
                <input
                  id="name-input"
                  type="text"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={e => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors(p => ({ ...p, customerName: '' }));
                  }}
                  className={`w-full bg-[#FFF9F7] border ${
                    errors.customerName ? 'border-red-400 focus:ring-red-300' : 'border-[#F5DDE1] focus:ring-[#B85C72]/30'
                  } rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#24191B] outline-none transition-all focus:ring-4`}
                />
              </div>
              {errors.customerName && <p className="text-red-500 text-xs mt-1.5">{errors.customerName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone-input" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B85C72]/60" />
                <input
                  id="phone-input"
                  type="tel"
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={e => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(p => ({ ...p, phone: '' }));
                  }}
                  className={`w-full bg-[#FFF9F7] border ${
                    errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-[#F5DDE1] focus:ring-[#B85C72]/30'
                  } rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#24191B] outline-none transition-all focus:ring-4`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email-input" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B85C72]/60" />
                <input
                  id="email-input"
                  type="email"
                  placeholder="e.g. you@example.com"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(p => ({ ...p, email: '' }));
                  }}
                  className={`w-full bg-[#FFF9F7] border ${
                    errors.email ? 'border-red-400 focus:ring-red-300' : 'border-[#F5DDE1] focus:ring-[#B85C72]/30'
                  } rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#24191B] outline-none transition-all focus:ring-4`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
            </div>
          </div>
        )}

        {/* --- STEP 2: Services & Timing --- */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            {/* Select Service */}
            <div>
              <label htmlFor="service-select" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                Select Service *
              </label>
              <select
                id="service-select"
                value={serviceId}
                onChange={e => {
                  setServiceId(e.target.value);
                  if (errors.serviceId) setErrors(p => ({ ...p, serviceId: '' }));
                }}
                className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-2xl py-3.5 px-4 text-sm text-[#24191B] outline-none focus:ring-4 focus:ring-[#B85C72]/30 transition-all appearance-none cursor-pointer"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} (starting ₹{s.startingPrice})
                  </option>
                ))}
              </select>
              {errors.serviceId && <p className="text-red-500 text-xs mt-1.5">{errors.serviceId}</p>}
            </div>

            {/* Select Preferred Artist */}
            <div>
              <label htmlFor="artist-select" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                Preferred Artist (Optional)
              </label>
              <select
                id="artist-select"
                value={artistId}
                onChange={e => setArtistId(e.target.value)}
                className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-2xl py-3.5 px-4 text-sm text-[#24191B] outline-none focus:ring-4 focus:ring-[#B85C72]/30 transition-all appearance-none cursor-pointer"
              >
                <option value="">Any Available Professional</option>
                {artists.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Select Date and Time Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date-input" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                  Date *
                </label>
                <input
                  id="date-input"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={e => {
                    setDate(e.target.value);
                    if (errors.date) setErrors(p => ({ ...p, date: '' }));
                  }}
                  className={`w-full bg-[#FFF9F7] border ${
                    errors.date ? 'border-red-400 focus:ring-red-300' : 'border-[#F5DDE1] focus:ring-[#B85C72]/30'
                  } rounded-2xl py-3.5 px-4 text-sm text-[#24191B] outline-none focus:ring-4 transition-all`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1.5">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time-input" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                  Preferred Time *
                </label>
                <select
                  id="time-input"
                  value={time}
                  onChange={e => {
                    setTime(e.target.value);
                    if (errors.time) setErrors(p => ({ ...p, time: '' }));
                  }}
                  className={`w-full bg-[#FFF9F7] border ${
                    errors.time ? 'border-red-400 focus:ring-red-300' : 'border-[#F5DDE1] focus:ring-[#B85C72]/30'
                  } rounded-2xl py-3.5 px-4 text-sm text-[#24191B] outline-none focus:ring-4 focus:ring-[#B85C72]/30 transition-all appearance-none cursor-pointer`}
                >
                  <option value="">Select Time Slot</option>
                  {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(t => (
                    <option key={t} value={t}>
                      {t} {parseInt(t) >= 12 ? 'PM' : 'AM'}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-xs mt-1.5">{errors.time}</p>}
              </div>
            </div>
          </div>
        )}

        {/* --- STEP 3: Special Request & Confirm --- */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            {/* Special Request */}
            <div>
              <label htmlFor="request-textarea" className="block text-xs font-semibold tracking-wider uppercase text-[#24191B]/80 mb-2">
                Special Requests or Custom Themes
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-[#B85C72]/60" />
                <textarea
                  id="request-textarea"
                  placeholder="e.g. specific skin tones, allergic details, or hair accessory requests"
                  value={specialRequest}
                  onChange={e => setSpecialRequest(e.target.value)}
                  rows={4}
                  className="w-full bg-[#FFF9F7] border border-[#F5DDE1] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-[#24191B] outline-none transition-all focus:ring-4 focus:ring-[#B85C72]/30"
                />
              </div>
            </div>

            {/* Summary details review card */}
            <div className="bg-[#FFF9F7] border border-[#F5DDE1] rounded-2xl p-5 space-y-3 text-sm">
              <span className="text-[10px] uppercase tracking-widest text-[#D4A373] block font-bold">
                Verification Summary
              </span>
              <div className="flex justify-between border-b border-[#F5DDE1]/40 pb-2">
                <span className="text-[#24191B]/60">Client:</span>
                <span className="font-semibold text-[#24191B]">{customerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#F5DDE1]/40 pb-2">
                <span className="text-[#24191B]/60">Service:</span>
                <span className="font-semibold text-[#B85C72]">
                  {services.find(s => s.id === serviceId)?.name}
                </span>
              </div>
              {artistId && (
                <div className="flex justify-between border-b border-[#F5DDE1]/40 pb-2">
                  <span className="text-[#24191B]/60">Artist:</span>
                  <span className="font-semibold text-[#24191B]">
                    {artists.find(a => a.id === artistId)?.name}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#24191B]/60">Scheduled:</span>
                <span className="font-semibold text-[#24191B]">{date} @ {time}</span>
              </div>
            </div>
          </div>
        )}

        {/* --- Buttons Controller Navigation --- */}
        <div className="flex items-center justify-between border-t border-[#F5DDE1]/60 pt-6 mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 text-sm text-[#24191B]/70 hover:text-[#B85C72] transition-colors font-medium cursor-pointer focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              Confirm Appointment
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};


// --- BOOKING CONFIRMATION SCREEN ---
interface BookingConfirmationProps {
  booking: Appointment;
  onReset: () => void;
  whatsappNumber: string;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onReset,
  whatsappNumber
}) => {
  const getWhatsAppMessage = () => {
    return `Hi Glow & Grace, I would like to check status for my appointment:
*Booking ID:* ${booking.bookingId}
*Name:* ${booking.customerName}
*Service:* ${booking.serviceName}
*Date:* ${booking.date}
*Time:* ${booking.time}
*Status:* Pending Confirmation 💕`;
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div className="bg-white border border-[#F5DDE1] rounded-3xl p-8 md:p-12 text-center shadow-xl max-w-2xl mx-auto animate-scale-up">
      <div className="w-16 h-16 bg-[#F5DDE1] text-[#B85C72] rounded-full flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-8 h-8" />
      </div>

      <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-[#24191B] mb-2">
        Appointment Request Received 💕
      </h3>
      <p className="text-[#24191B]/60 text-sm md:text-base max-w-md mx-auto mb-8">
        Thank you for choosing Glow & Grace. Your reservation has been logged into our salon scheduler.
      </p>

      {/* Confirmation details receipt card */}
      <div className="bg-[#FFF9F7] border border-[#F5DDE1] rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto mb-10 shadow-xs">
        <div className="flex justify-between items-center border-b border-[#F5DDE1] pb-3">
          <span className="text-xs uppercase tracking-widest text-[#24191B]/50">Booking ID</span>
          <span className="font-mono text-sm font-bold text-[#B85C72] bg-white border border-[#F5DDE1] px-3 py-1 rounded-md">
            {booking.bookingId}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-[#24191B]/50 block">Customer Name</span>
            <span className="font-bold text-[#24191B]">{booking.customerName}</span>
          </div>
          <div>
            <span className="text-xs text-[#24191B]/50 block">Phone</span>
            <span className="font-bold text-[#24191B]">{booking.phone}</span>
          </div>
          <div>
            <span className="text-xs text-[#24191B]/50 block">Service Selected</span>
            <span className="font-bold text-[#B85C72]">{booking.serviceName}</span>
          </div>
          {booking.artistName && (
            <div>
              <span className="text-xs text-[#24191B]/50 block">Preferred Stylist</span>
              <span className="font-bold text-[#24191B]">{booking.artistName}</span>
            </div>
          )}
          <div>
            <span className="text-xs text-[#24191B]/50 block">Scheduled Date</span>
            <span className="font-bold text-[#24191B]">{booking.date}</span>
          </div>
          <div>
            <span className="text-xs text-[#24191B]/50 block">Time Slot</span>
            <span className="font-bold text-[#24191B]">{booking.time}</span>
          </div>
        </div>

        <div className="border-t border-[#F5DDE1] pt-3 flex items-center justify-between text-xs">
          <span className="text-[#24191B]/50">Status:</span>
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-semibold">
            Pending Confirmation
          </span>
        </div>
      </div>

      {/* Interactive Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-medium hover:bg-[#20ba59] transition-colors py-3.5 px-8 rounded-full shadow-md text-sm"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          Verify on WhatsApp
        </a>

        <Button
          variant="outline"
          onClick={onReset}
          className="w-full sm:w-auto"
        >
          Book Another Session
        </Button>
      </div>
    </div>
  );
};
