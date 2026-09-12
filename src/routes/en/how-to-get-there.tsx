import { createFileRoute } from "@tanstack/react-router";
import { AnswerSection, ContentPage } from "@/components/content-page";
import { PHOTOS } from "@/lib/photos";
import { MapEmbed } from "@/components/map-embed";
import { SITE, breadcrumbSchema, jsonLd, pageHead, webPageSchema } from "@/lib/site";
import { DISTANCES_EN, EN, hostelSchemaEn } from "@/lib/site-en";

export const Route = createFileRoute("/en/how-to-get-there")({
  head: () => ({
    ...pageHead(
      "How to get to Luxx Aparts hostel in Almaty",
      "Hostel by Sairan bus station in Almaty: how to reach Luxx Aparts from Almaty-2 railway station (7 km), the airport (about 20 km) and by metro. Map and entrance.",
      "/en/how-to-get-there",
    ),
    scripts: jsonLd(
      webPageSchema("/en/how-to-get-there"),
      breadcrumbSchema("Getting here", "/en/how-to-get-there"),
      hostelSchemaEn(),
    ),
  }),
  component: DirectionsPageEn,
});

function DirectionsPageEn() {
  return (
    <ContentPage
      eyebrow="Getting here"
      title="How to get to Luxx Aparts hostel"
      intro={`Luxx Aparts is at ${EN.address}, entrance through the ${EN.complex}. Sairan bus station is on the same street, Sairan metro station is 1.9 km away, Almaty-2 railway station 7 km, the airport about 20 km. At night a taxi is easiest: tell the driver “Tole Bi 286/8”.`}
      photo={PHOTOS.reception}
    >
      <AnswerSection title="Where is the hostel on the map?">
        <MapEmbed className="h-[300px] lg:h-[360px]" />
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {DISTANCES_EN.map((d) => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Distances are the hostel's own figures from its Hostelworld listing, as of{" "}
          {EN.factsUpdated}.
        </p>
      </AnswerSection>

      <AnswerSection title="How do I get there from Almaty-2 railway station?">
        <p>
          Seven kilometres, 15–25 minutes by taxi depending on traffic. By bus: to Sairan bus
          station or the stop at the Kausar complex on Tole Bi; route numbers change, so ask the
          desk.
        </p>
        <ol>
          <li>Order a taxi in an app or ask the desk for the bus number.</li>
          <li>Give the address: 286/8 Tole Bi Street, Kausar residential complex.</li>
          <li>On arrival call the desk and someone will meet you at the entrance.</li>
        </ol>
      </AnswerSection>

      <AnswerSection title="How do I get there from Sairan bus station?">
        <p>
          On foot: the bus station is on the same street, Tole Bi, a few minutes away. With heavy
          luggage take a taxi for one stop.
        </p>
      </AnswerSection>

      <AnswerSection title="How do I get there from Almaty airport?">
        <p>
          About 20 km, easiest by taxi. If you land at night, message your arrival time on WhatsApp
          in advance: the desk works 24/7, but a late check-in has to be agreed.
        </p>
      </AnswerSection>

      <AnswerSection title="How do I get there by metro?">
        <p>
          The nearest stations are Sairan (1.9 km) and Moskva (2.4 km). From there it is 20–25
          minutes on foot or a few minutes by taxi.
        </p>
      </AnswerSection>

      <AnswerSection title="How do I get there from Almaty-1 railway station?">
        <p>
          Almaty-1 is 14 km away, about 30 minutes by taxi. Public transport takes longer and needs
          a change; the desk will suggest a route.
        </p>
      </AnswerSection>

      <AnswerSection title="Is there parking?">
        <p>Yes, next to the building. Check availability and terms when booking.</p>
      </AnswerSection>

      <AnswerSection title="How do I find the entrance?">
        <p>
          Look for the {EN.complex}; the hostel is on the second floor. If it is your first visit or
          you arrive at night, call <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a> and
          someone will meet you at the entrance.
        </p>
      </AnswerSection>
    </ContentPage>
  );
}
