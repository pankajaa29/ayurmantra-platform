'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { treatmentsApi, appointmentsApi } from '@/lib/api';

const steps = [
  { id: 1, label: 'Select Treatment' },
  { id: 2, label: 'Choose Doctor' },
  { id: 3, label: 'Pick Date & Time' },
  { id: 4, label: 'Confirm Booking' },
];

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    treatmentId: searchParams.get('treatment') || '',
    doctorId: '',
    date: '',
    timeSlot: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    loadTreatments();
  }, []);

  useEffect(() => {
    if (formData.treatmentId) {
      loadDoctors(formData.treatmentId);
    }
  }, [formData.treatmentId]);

  useEffect(() => {
    if (formData.doctorId && formData.date) {
      loadTimeSlots(formData.doctorId, formData.date);
    }
  }, [formData.doctorId, formData.date]);

  const loadTreatments = async () => {
    try {
      const response = await treatmentsApi.getAll({ limit: 100 });
      setTreatments(response.data || []);
    } catch (error) {
      console.error('Failed to load treatments');
    }
  };

  const loadDoctors = async (treatmentId: string) => {
    try {
      const response = await appointmentsApi.getDoctorsByTreatment(treatmentId);
      setDoctors(response || []);
    } catch (error) {
      console.error('Failed to load doctors');
    }
  };

  const loadTimeSlots = async (doctorId: string, date: string) => {
    try {
      const response = await appointmentsApi.getAvailableSlots(doctorId, date);
      setTimeSlots(response || []);
    } catch (error) {
      console.error('Failed to load time slots');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await appointmentsApi.create({
        treatmentId: formData.treatmentId,
        doctorId: formData.doctorId,
        date: formData.date,
        startTime: formData.timeSlot,
        endTime: formData.timeSlot,
        notes: formData.notes,
      });
      setCurrentStep(5);
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedTreatment = treatments.find(t => t.id === formData.treatmentId);
  const selectedDoctor = doctors.find(d => d.id === formData.doctorId);

  return (
    <>
      <section className="relative py-20 bg-ayur-primary-900">
        <div className="ayur-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
              Easy Booking
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Appointment
            </h1>
            <p className="text-white/80">Schedule your consultation in just a few simple steps.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-ayur-earth/20">
        <div className="ayur-container">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                  currentStep >= step.id ? 'bg-ayur-primary text-white' : 'bg-ayur-cream text-muted-foreground'
                }`}>
                  {currentStep > step.id ? <span>✓</span> : step.id}
                </div>
                <span className={`ml-3 hidden sm:block text-sm font-medium ${
                  currentStep >= step.id ? 'text-ayur-primary' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-ayur-primary' : 'bg-ayur-earth/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ayur-section bg-ayur-cream">
        <div className="ayur-container">
          <div className="max-w-4xl mx-auto">
            {currentStep === 1 && (
              <div className="card-ayur p-8">
                <h2 className="font-serif text-2xl font-semibold text-ayur-primary-900 mb-2">Select a Treatment</h2>
                <p className="text-muted-foreground mb-6">Choose the treatment you would like to book.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treatments.map((treatment) => (
                    <button
                      key={treatment.id}
                      onClick={() => { setFormData({ ...formData, treatmentId: treatment.id }); setCurrentStep(2); }}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        formData.treatmentId === treatment.id
                          ? 'border-ayur-primary bg-ayur-primary/5'
                          : 'border-ayur-earth/20 hover:border-ayur-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{treatment.title}</h3>
                        <span className="text-ayur-primary font-bold">₹{treatment.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{treatment.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>🕐</span> {treatment.duration} mins
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="card-ayur p-8">
                <h2 className="font-serif text-2xl font-semibold text-ayur-primary-900 mb-2">Choose a Doctor</h2>
                <p className="text-muted-foreground mb-6">Select the doctor you prefer for your treatment.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => { setFormData({ ...formData, doctorId: doctor.id }); setCurrentStep(3); }}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        formData.doctorId === doctor.id
                          ? 'border-ayur-primary bg-ayur-primary/5'
                          : 'border-ayur-earth/20 hover:border-ayur-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-ayur-earth/30 flex items-center justify-center">
                          <span className="text-3xl">👤</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Dr. {doctor.user?.firstName} {doctor.user?.lastName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                          <p className="text-sm text-ayur-primary">{doctor.experience} years experience</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setCurrentStep(1)} className="mt-6 text-ayur-primary hover:text-ayur-primary-700">
                  ← Back to treatments
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="card-ayur p-8">
                <h2 className="font-serif text-2xl font-semibold text-ayur-primary-900 mb-2">Select Date & Time</h2>
                <p className="text-muted-foreground mb-6">Choose your preferred appointment slot.</p>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Select Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-ayur-earth/30 focus:border-ayur-primary focus:ring-2 focus:ring-ayur-primary/20 outline-none"
                  />
                </div>
                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Available Time Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.length > 0 ? (
                        timeSlots.map((slot: any) => (
                          <button
                            key={slot.id}
                            onClick={() => { setFormData({ ...formData, timeSlot: slot.startTime }); setCurrentStep(4); }}
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              formData.timeSlot === slot.startTime
                                ? 'border-ayur-primary bg-ayur-primary/5'
                                : 'border-ayur-earth/20 hover:border-ayur-primary/50'
                            }`}
                          >
                            <span className="block mb-1">🕐</span>
                            <span className="text-sm font-medium">{slot.startTime}</span>
                          </button>
                        ))
                      ) : (
                        <p className="col-span-full text-muted-foreground text-center py-8">
                          No slots available for selected date. Please choose another date.
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <button onClick={() => setCurrentStep(2)} className="mt-6 text-ayur-primary hover:text-ayur-primary-700">
                  ← Back to doctors
                </button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="card-ayur p-8">
                <h2 className="font-serif text-2xl font-semibold text-ayur-primary-900 mb-2">Confirm Your Booking</h2>
                <p className="text-muted-foreground mb-6">Please review your appointment details.</p>
                <div className="bg-ayur-cream rounded-xl p-6 mb-6 space-y-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Treatment</span><span className="font-medium">{selectedTreatment?.title}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Doctor</span><span className="font-medium">Dr. {selectedDoctor?.user?.firstName} {selectedDoctor?.user?.lastName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{formData.date}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{formData.timeSlot}</span></div>
                  <div className="flex justify-between pt-4 border-t border-ayur-earth/30">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-ayur-primary text-xl">₹{selectedTreatment?.price}</span>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-ayur-earth/30 focus:border-ayur-primary focus:ring-2 focus:ring-ayur-primary/20 outline-none" placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-ayur-earth/30 focus:border-ayur-primary focus:ring-2 focus:ring-ayur-primary/20 outline-none" placeholder="Enter your email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-ayur-earth/30 focus:border-ayur-primary focus:ring-2 focus:ring-ayur-primary/20 outline-none" placeholder="Enter your phone number" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Additional Notes (Optional)</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-ayur-earth/30 focus:border-ayur-primary focus:ring-2 focus:ring-ayur-primary/20 outline-none resize-none" placeholder="Any specific concerns or requests..." />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setCurrentStep(3)} className="px-6 py-3 border-2 border-ayur-earth/30 rounded-full font-medium hover:border-ayur-primary transition-colors">
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.name || !formData.email || !formData.phone}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="card-ayur p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-ayur-primary-900 mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for booking with AyurMantra. We have received your appointment request 
                  and will send you a confirmation shortly.
                </p>
                <div className="bg-ayur-cream rounded-xl p-6 mb-6 text-left">
                  <p className="text-sm text-muted-foreground mb-1">Appointment Reference</p>
                  <p className="text-lg font-bold text-ayur-primary">#AYM{Date.now().toString().slice(-6)}</p>
                </div>
                <a href="/" className="btn-primary inline-block">Return to Home</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <section className="ayur-section bg-ayur-cream">
        <div className="ayur-container">
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin text-4xl">⏳</div>
            <span className="ml-4 text-xl text-ayur-primary font-medium">Loading Booking System...</span>
          </div>
        </div>
      </section>
    }>
      <BookAppointmentForm />
    </Suspense>
  );
}
