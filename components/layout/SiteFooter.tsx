import Link from "next/link";
import { Map } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Map className="size-5 text-primary" />
              <span>DreamedTrip</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ideal trip across Central America, one questionnaire away. Plan, explore, and book with confidence.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-muted-foreground hover:text-foreground transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/register-business" className="text-muted-foreground hover:text-foreground transition-colors">
                  Register Your Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 border-t pt-8">
          <h3 className="mb-4 text-sm font-semibold text-center">Payment Methods</h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex h-10 items-center justify-center rounded border bg-background px-4 text-xs font-medium text-muted-foreground">
              Visa
            </div>
            <div className="flex h-10 items-center justify-center rounded border bg-background px-4 text-xs font-medium text-muted-foreground">
              Mastercard
            </div>
            <div className="flex h-10 items-center justify-center rounded border bg-background px-4 text-xs font-medium text-muted-foreground">
              American Express
            </div>
            <div className="flex h-10 items-center justify-center rounded border bg-background px-4 text-xs font-medium text-muted-foreground">
              PayPal
            </div>
            <div className="flex h-10 items-center justify-center rounded border bg-background px-4 text-xs font-medium text-muted-foreground">
              Apple Pay
            </div>
            <div className="flex h-10 items-center justify-center rounded border bg-background px-4 text-xs font-medium text-muted-foreground">
              Google Pay
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DreamedTrip. All rights reserved. | Registered Travel Agency
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Made with ❤️ for travelers exploring Central America
          </p>
        </div>
      </div>
    </footer>
  );
}
