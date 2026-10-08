import { StudioPolicy } from '../types';

export const POLICIES_DATA: StudioPolicy[] = [
  {
    id: 1,
    title: '1. Non-Refundable Booking Deposit via Paystack',
    shortDesc: 'A mandatory deposit is required to lock in your appointment slot.',
    severity: 'vital',
    fullDetails: [
      'To honor the deliberate preparation and 1:1 dedication required for each bespoke session, all appointments require a non-refundable booking deposit settled securely via Paystack (Debit/Credit Cards, Bank Transfer, or USSD).',
      'This deposit is immediately credited towards your final service balance on appointment day.',
      'Appointments are held for a maximum of 30 minutes pending deposit payment before releasing back into public studio availability.',
      'Deposits are strictly non-refundable in the event of client cancellation or failure to attend.',
    ],
  },
  {
    id: 2,
    title: '2. Punctuality & 10–15 Minute Grace Period',
    shortDesc: 'Respecting the architectural precision schedule of each studio guest.',
    severity: 'standard',
    fullDetails: [
      'Please arrive 5 to 10 minutes prior to your scheduled time to settle into the studio and complete your pre-treatment consultation.',
      'We observe a strict 10-minute grace period for standard appointments and 15 minutes for extended full sets.',
      'Late arrivals beyond 15 minutes may experience a shortened service time (to prevent delays for subsequent guests) while still incurring the full service fee, or appointment cancellation forfeiting deposit.',
    ],
  },
  {
    id: 3,
    title: '3. Strict Foreign Work Policy (No Outside Fills)',
    shortDesc: 'We do not fill over work executed by other lash technicians.',
    severity: 'vital',
    fullDetails: [
      'To guarantee our uncompromising safety standards, ocular hygiene, and structural lash health, Leoessential does NOT perform refills over foreign work applied elsewhere.',
      'Variations in adhesive formulations, isolation quality, lash diameters, and technique prevent us from guaranteeing retention or natural lash preservation.',
      'If you currently wear extensions from another salon, kindly book a "Gentle Lash Removal" alongside your "Full Set" of choice.',
    ],
  },
  {
    id: 4,
    title: '4. Solo Sanctuary Rule (Strictly No Guests or Children)',
    shortDesc: 'A tranquil, sterile environment dedicated exclusively to your relaxation.',
    severity: 'vital',
    fullDetails: [
      'Leoessential operates as an intimate private beauty sanctuary. In adherence to strict clinical sanitization guidelines and liability insurance policies, additional guests, friends, partners, or children are strictly prohibited inside the procedure area.',
      'Your procedure requires your eyes to remain completely closed in undisturbed stillness for 60 to 150 minutes.',
      'Arriving with unauthorized companions will result in service refusal and forfeiture of your deposit.',
    ],
  },
  {
    id: 5,
    title: '5. Health, Sensitive Disclosures & Ocular Suitability',
    shortDesc: 'Pre-existing ophthalmic conditions, patch testing, and contraindications.',
    severity: 'standard',
    fullDetails: [
      'Please notify Adedoyin prior to booking if you have a history of ocular allergies, recent eye surgeries (LASIK/cataracts within 6 months), blepharitis, active styes, or skin sensitivities.',
      'Complimentary 48-hour patch tests are gladly accommodated for clients with hyper-sensitive skin upon request.',
      'Contact lens wearers must arrive wearing glasses or remove contact lenses prior to procedure start.',
      'For semi-permanent brows, clients must not be pregnant, nursing, or undergoing active chemotherapy treatments.',
    ],
  },
  {
    id: 6,
    title: '6. Studio Conduct, Rescheduling & 48-Hour Cancellation Terms',
    shortDesc: 'Transparent terms governing reschedules, no-shows, and studio mutual respect.',
    severity: 'standard',
    fullDetails: [
      'Rescheduling requests must be communicated at least 48 hours prior to your scheduled booking via Square or direct WhatsApp to transfer your deposit to a new date.',
      'Only one (1) reschedule transfer is permitted per booking deposit within a 30-day window.',
      'Cancellations made within 24 hours of appointment time or "No-Shows" forfeit the deposit and will require 100% prepayment before scheduling any future services.',
      'Kindly ensure cell phones are placed on silent upon entering the studio to maintain a deeply restorative sanctuary atmosphere.',
    ],
  },
];
