import { redirect } from 'next/navigation';

export default function PatientPortalRoot() {
  // Redirect to dashboard (or login if not authenticated)
  redirect('/dashboard');
}
