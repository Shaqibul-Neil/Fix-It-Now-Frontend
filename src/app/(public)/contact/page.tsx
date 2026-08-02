import { CONTACT_METADATA } from "@/src/features/public/contact/dependencies/constants/contact.content";
import ContactPage from "@/src/features/public/contact/pages/ContactPage";

export const metadata = CONTACT_METADATA;

export default function ContactRoute() {
  return <ContactPage />;
}
