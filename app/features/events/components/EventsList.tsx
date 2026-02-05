import React from 'react';
import Container from '@/app/components/Container';
import EventCard, { EventCardProps } from './EventCard';

const events: EventCardProps[] = [
  {
    date: "Sun - 12/12/2025",
    author: "Hoang Thanh Sang Kiet",
    title: "The S-LAB Competition Reveal",
    description: "Prepare to turn your partying experience into an asset! The S-LAB Competition - the event promises to ignite your creativity, challenge your problem-solving skills, and set the stage for innovation like never before.",
    imageUrl: "/images/events/event-1.png",
    tags: ["Popular", "Brand"],
    slug: "the-s-lab-competition-reveal-1"
  },
  {
    date: "Sun - 12/12/2025",
    author: "Hoang Thanh Sang Kiet",
    title: "The S-LAB Competition Reveal",
    description: "Prepare to turn your partying experience into an asset! The S-LAB Competition - the event promises to ignite your creativity, challenge your problem-solving skills, and set the stage for innovation like never before.",
    imageUrl: "/images/events/event-2.png",
    tags: ["Popular", "Brand"],
    slug: "the-s-lab-competition-reveal-2"
  },
  {
    date: "Sun - 12/12/2025",
    author: "Hoang Thanh Sang Kiet",
    title: "The S-LAB Competition Reveal",
    description: "Prepare to turn your partying experience into an asset! The S-LAB Competition - the event promises to ignite your creativity, challenge your problem-solving skills, and set the stage for innovation like never before.",
    imageUrl: "/images/events/event-3.png",
    tags: ["Popular", "Brand"],
    slug: "the-s-lab-competition-reveal-3"
  },
  {
    date: "Sun - 12/12/2025",
    author: "Hoang Thanh Sang Kiet",
    title: "The S-LAB Competition Reveal",
    description: "Prepare to turn your partying experience into an asset! The S-LAB Competition - the event promises to ignite your creativity, challenge your problem-solving skills, and set the stage for innovation like never before.",
    imageUrl: "/images/events/event-4.png",
    tags: ["Popular", "Brand"],
    slug: "the-s-lab-competition-reveal-4"
  }
];

const EventsList = () => {
  return (
    <section className="pb-20">
      <Container>
        <div className="flex flex-col border-t border-gray-200">
          {events.map((evt, idx) => (
            <EventCard key={idx} {...evt} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(EventsList);
