"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const learningCenters = [
  {
    name: "Bristol English Academy",
    address: "123 Park Street, Bristol, BS1 5RT",
    contact: "+44 123 456 7890",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
  {
    name: "Advanced English Learning Center",
    address: "456 Queen Road, Bristol, BS2 3HY",
    contact: "+44 987 654 3210",
    hours: "Mon-Sat: 10:00 AM - 5:00 PM",
  },
  {
    name: "Language Masters",
    address: "789 King Avenue, Bristol, BS3 1XY",
    contact: "+44 555 123 4567",
    hours: "Mon-Fri: 8:30 AM - 5:30 PM",
  },
  {
    name: "Elite English Hub",
    address: "101 English Lane, Bristol, BS4 4RT",
    contact: "+44 333 444 5555",
    hours: "Mon-Sun: 9:00 AM - 8:00 PM",
  },
];

interface CenterInfoCardProps {
  activeIndex: number;
}

export function CenterInfoCard({ activeIndex }: CenterInfoCardProps) {
  const info = learningCenters[activeIndex];

  return (
    <Card className="w-full min-w-md mx-auto mt-4 md:mt-0 bg-transparent border-none shadow-none transition-all duration-300">
      <CardHeader className=" text-3xl text-blue-900">
        <CardTitle>{info.name}</CardTitle>
        <CardDescription className="text-blue-700">
          {info.address}
        </CardDescription>
      </CardHeader>
      <CardContent className=" flex flex-col justify-start gap-3">
        <CardDescription className=" text-blue-700 text-sm">
          Open Hour: <br />
          {info.hours}
        </CardDescription>
        <CardDescription className=" text-blue-700 text-sm">
          Contact: <br />
          {info.contact}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
