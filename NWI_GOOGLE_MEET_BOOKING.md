# Local Digital Ops NWI: Google Calendar + Google Meet booking

Public consultation page: https://www.localdigitalops.com/nwi/book

The page already exists and works as a free-call request form. Direct self-booking activates when a valid Google Calendar booking URL is configured for the Vercel production build. No Lovable credits are needed.

## Set up the free Google Calendar booking page

1. Sign into your own Google Calendar account at https://calendar.google.com/ on desktop.
2. Choose **Create > Appointment schedule**. If you already have a Google booking page, edit that one or create the single free appointment type available to your account.
3. Title: **Free 15-Minute Business Advice Call | Local Digital Ops NWI**.
4. Duration: **15 minutes**. Use America/Chicago as the visitor-facing timezone and set times you can actually attend. For November 2026, 9:00 to 11:00 AM Chicago corresponds to 4:00 to 6:00 PM Zagreb.
5. Set booking notice and buffer preferences that fit your working day.
6. Choose **Google Meet video conferencing** under location.
7. Description: **A free, practical 15-minute conversation about your local business. Ask about websites, local SEO, Google Business Profile, content, customer calls, follow-up, or any other business problem. You'll receive a useful recommendation whether or not we work together.**
8. Booking form: name and email (Google defaults); optional custom questions: "Business name", "Website / social link", and "What would you most like advice on?" Do not request unnecessary personal details.
9. Save the schedule. Open your booking page, select **Share > Copy link** for the single appointment schedule.
10. In a separate browser or incognito window, verify that the public link shows available times and that a test booking produces a Google Meet URL. Cancel the test afterward.

Official help: https://support.google.com/calendar/answer/10729749

## Connect the page to the site

The NWI booking page reads the Vite build variable **VITE_NWI_GOOGLE_BOOKING_URL**. Use the full HTTPS URL from Google's Share action. Supported hostnames are `calendar.app.google` and `calendar.google.com`.

Option A: Give the URL to the site maintainer. They can put it into the production Vercel environment and redeploy, or update the source configuration using that verified link.

Option B: In Vercel project `digital-digger-pro`, open **Settings > Environment Variables**, add:
- Name: `VITE_NWI_GOOGLE_BOOKING_URL`
- Value: your exact Google booking page URL, with no quotation marks.
- Environment: Production.

Then redeploy the current `main` commit and verify `/nwi/book`. Because this is a Vite build variable, changing its value requires a new production build.

## What the visitor experiences

When a real Google booking URL is configured: the page shows a button **Choose an available Google Meet time**. Google owns slot selection, confirmation and calendar blocking.

Until the link is configured: the page provides a short **Request my free call** form, using the existing NWI enquiry system. It stores the request but does not claim a booking has happened. Confirm the time and send a Meet invitation manually from Google Calendar. Verify the notifications in the live enquiry system before relying on the fallback.

## Owner checks

- Check your Google public profile name and photo, which may appear on the Google booking page.
- Check event timezone and automatic Google Meet link creation.
- Protect against double booking by selecting the calendar containing your existing events.
- Keep the public call completely free.
- No untested appointment schedule or placeholder URL should ever be presented as a live booking calendar.

Source: https://support.google.com/calendar/answer/10729749
