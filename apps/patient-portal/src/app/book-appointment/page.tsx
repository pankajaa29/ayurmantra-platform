'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight, ChevronLeft, Calendar, Clock, User } from 'lucide-react';

const steps = [
  { id: 1, title: 'Select Treatment' },
  { id: 2, title: 'Choose Doctor' },
  { id: 3, title: 'Pick Date & Time' },
  { id: 4, title: 'Confirm' },
];

const treatments = [
  { id: '1', name: 'Panchakarma Detox', duration: '120 min', price: '₹5,000', icon: '✨' },
  { id: '2', name: 'Abhyanga Massage', duration: '60 min', price: '₹1,500', icon: '💆' },
  { id: '3', name: 'Shirodhara Therapy', duration: '45 min', price: '₹1,200', icon: '🧘' },
  { id: '4', name: 'Ayurvedic Facial', duration: '60 min', price: '₹1,800', icon: '🌿' },
  { id: '5', name: 'Stress Management', duration: '90 min', price: '₹2,500', icon: '🧘‍♀️' },
  { id: '6', name: 'Herbal Steam Therapy', duration: '30 min', price: '₹800', icon: '🌸' },
];

const doctors = [
  { id: '1', name: 'Dr. Rajesh Sharma', specialization: 'Panchakarma Specialist', experience: '15 years', rating: 4.9 },
  { id: '2', name: 'Dr. Priya Patel', specialization: 'Ayurvedic Physician', experience: '12 years', rating: 4.8 },
  { id: '3', name: 'Dr. Ananya Iyer', specialization: 'Wellness Consultant', experience: '10 years', rating: 4.9 },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedTreatment;
      case 2: return selectedDoctor;
      case 3: return selectedDate && selectedTime;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', { selectedTreatment, selectedDoctor, selectedDate, selectedTime, notes });
    setCurrentStep(5); // Success state
  };

  // Generate dates for next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      full: date.toISOString().split('T')[0],
      day: date.getDate(),
      weekday: date.toLocaleString('default', { weekday: 'short' }),
      month: date.toLocaleString('default', { month: 'short' }),
    };
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#2D5A3D]">Book Appointment</h1>
        <p className="text-gray-500 mt-1">Schedule your Ayurvedic consultation in 4 simple steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= step.id
                      ? 'bg-[#2D5A3D] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <span className={`text-xs mt-2 ${currentStep >= step.id ? 'text-[#2D5A3D] font-medium' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 ${currentStep > step.id ? 'bg-[#2D5A3D]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-[#E8E2D5] overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 5 ? (
            // Success State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                Appointment Booked Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been confirmed. We've sent a confirmation email with all details.
              </p>
              <div className="bg-[#F8F6F0] rounded-xl p-6 max-w-md mx-auto mb-6">
                <p className="text-sm text-gray-500 mb-1">Appointment Reference</p>
                <p className="text-xl font-bold text-[#2D5A3D]">#AYM{(Date.now()).toString().slice(-6)}</p>
              </div>
              <div className="flex gap-4 justify-center">
                <a href="/dashboard" className="px-6 py-3 bg-[#2D5A3D] text-white rounded-xl font-medium">
                  Go to Dashboard
                </a>
                <a href="/appointments" className="px-6 py-3 border border-[#E8E2D5] text-gray-700 rounded-xl font-medium">
                  View All Appointments
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-8"
            >
              {/* Step 1: Select Treatment */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
                    Select a Treatment
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {treatments.map((treatment) => (
                      <button
                        key={treatment.id}
                        onClick={() => setSelectedTreatment(treatment.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedTreatment === treatment.id
                            ? 'border-[#2D5A3D] bg-[#2D5A3D]/5'
                            : 'border-[#E8E2D5] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{treatment.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{treatment.name}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {treatment.duration}
                              </span>
                              <span className="font-medium text-[#D4853C]">{treatment.price}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Choose Doctor */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
                    Choose Your Doctor
                  </h2>
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => setSelectedDoctor(doctor.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                          selectedDoctor === doctor.id
                            ? 'border-[#2D5A3D] bg-[#2D5A3D]/5'
                            : 'border-[#E8E2D5] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] 
                                      flex items-center justify-center text-white text-2xl">
                          <User className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-lg">{doctor.name}</h3>
                          <p className="text-[#D4853C] text-sm">{doctor.specialization}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>{doctor.experience} experience</span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {doctor.rating}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
                      Select Date
                    </h2>
                    <div className="grid grid-cols-7 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date.full}
                          onClick={() => setSelectedDate(date.full)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            selectedDate === date.full
                              ? 'border-[#2D5A3D] bg-[#2D5A3D] text-white'
                              : 'border-[#E8E2D5] hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <p className="text-xs uppercase">{date.weekday}</p>
                          <p className="text-xl font-bold">{date.day}</p>
                          <p className="text-xs">{date.month}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
                      Select Time
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            selectedTime === time
                              ? 'border-[#2D5A3D] bg-[#2D5A3D] text-white'
                              : 'border-[#E8E2D5] hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <Clock className="w-4 h-4 mx-auto mb-1" />
                          <span className="text-sm">{time}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#2D5A3D] mb-4">
                      Additional Notes (Optional)
                    </h2>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific concerns or requirements..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E2D5] 
                               focus:border-[#2D5A3D] focus:ring-2 focus:ring-[#2D5A3D]/20 outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Confirm */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-xl font-semibold text-[#2D5A3D]">
                    Confirm Your Appointment
                  </h2>
                  
                  <div className="bg-[#F8F6F0] rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-[#E8E2D5]">
                      <span className="text-gray-500">Treatment</span>
                      <span className="font-medium">
                        {treatments.find(t => t.id === selectedTreatment)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-[#E8E2D5]">
                      <span className="text-gray-500">Doctor</span>
                      <span className="font-medium">
                        {doctors.find(d => d.id === selectedDoctor)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-[#E8E2D5]">
                      <span className="text-gray-500">Date & Time</span>
                      <span className="font-medium">{selectedDate} at {selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-[#E8E2D5]">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">
                        {treatments.find(t => t.id === selectedTreatment)?.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-xl font-bold text-[#D4853C]">
                        {treatments.find(t => t.id === selectedTreatment)?.price}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Payment will be collected at the clinic. 
                      Please arrive 15 minutes before your scheduled time.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        {currentStep !== 5 && (
          <div className="px-6 md:px-8 py-6 border-t border-[#E8E2D5] bg-gray-50 
                        flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
                  canProceed()
                    ? 'bg-[#2D5A3D] text-white hover:bg-[#1F4030] shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 bg-[#D4853C] text-white 
                         rounded-xl font-medium hover:bg-[#B86E2E] transition-all shadow-lg"
              >
                Confirm Booking
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
