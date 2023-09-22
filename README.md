# Webshop med Stripe Checkout (klient)

> Målet med denna inlämningsuppgift hos Medieinstitutet var att skapa en enkel webbshop med integrerad betalning med Stripe Checkout. I frontend skulle man använda React/TypeScript och i backend Node/Express. All kommunikation med Stripe API måste ske från servern. Detta repo är klient-delen.

## Uppfyllda krav

### För godkänt

- Produkter skapas i Stripe och hämtas därifrån för att visas i shopen.
- Man kan lägga till produkter i en kundvagn.
- Från kundvagnen kan man lägga en order genom Stripe, men endast om man är inloggad.
- Man kan registrera sig som en användare i webbshoppen.
- Användaren skapas i Stripe och sparas i en JSON-fil på servern (lösenord hashas).
- Man kan logga in som kund, och det är den inloggade kunden som används för ordern.

### För väl godkänt

- Det går att ange en rabattkod för att få rabatt på sitt köp i Stripe.
- Samtliga placerade ordrar sparas i en JSON-fil.
- Man kan som inloggad se sina lagda ordrar.
- Betalning valideras så att en order inte kan läggas utan en genomförd betalning.

## Köra projektet (klient-delen)

Kör följande kommandon för att starta projektet i dev mode. Visa sedan applikation på angiven adress i webbläsaren.

`npm install`

`npm run dev`

## Använda tekniker/språk/ramverk/paket etc.

- React
- Typescript
- Vite
- React Router
- React Hook Form
- Joi

## Reflektioner/förbättringar

- Vad gäller koden i frontend bör det skapas custom hook och/eller återanvändningsbar funktion för fetch av data. Som det är nu blir det mycket upprepning av kod, men jag hann inte implementera det.

- Webhooks hade varit ett bättre sätt att bekräfta ordern och validera betalningen från Stripe, istället för att låta klienten kontakta vår server från konfirmationssidan för att skapa ordern.

## Länk repo

[Github repo](https://github.com/johanbry/stripe-checkout-client)

## Repo för backend

[Github repo](https://github.com/johanbry/stripe-checkout-server)
