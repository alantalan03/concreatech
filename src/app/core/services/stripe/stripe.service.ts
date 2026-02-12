// stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise = loadStripe('pk_live_51He4DYLgXqRicYzDspK7DHbSIlpBnKhRkWd2QV3oueX3IetWGEvU79BspgaeMlql5KiQE4gyx18XRg7NviLNZCt500eNzrVUIZ');

  getStripe() {
    return this.stripePromise;
  }
}