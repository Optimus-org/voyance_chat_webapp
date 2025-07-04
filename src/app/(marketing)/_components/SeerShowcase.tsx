"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Seer, Specialty } from "@/types/seer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useSeers } from "@/hooks/useSeers";

function formatTime(timeLeft: number) {
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

const SeerShowcase = () => {
  const { data: allSeers, isLoading, error } = useSeers();
  const [timeLeft, setTimeLeft] = useState(432000); //5 days

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return 432000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = formatTime(timeLeft);

  if (isLoading)
    return (
      <div className="flex align-center justify-center py-5">
        Chargement des voyants...
      </div>
    );

  if (error) return <p>Erreur lors du chargement des voyants.</p>;

  return (
    <>
      <section className="w-full py-8 bg-background border-b border-border/10"></section>

      <section
        id="seers"
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-bl from-primary/5 via-background to-secondary/5 border-t border-border/10"
      >
        {/* Use container class with mx-auto for centering */}
        <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
          {" "}
          {/* Added max-w */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                Nos Conseillers
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Rencontrez Nos Voyants Doués
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Découvrez des conseillers expérimentés et compatissants prêts à
                fournir la guidance que vous recherchez.
              </p>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-screen-lg text-center">
              <div className="bg-gradient-to-r from-blue-300/80 to-purple-400/80 text-white rounded-2xl p-6 shadow-xl inline-block transform hover:scale-105 transition-transform duration-300">
                <p className="text-xl sm:text-2xl font-semibold mb-4">
                  Offre Spéciale : 50% de Réduction !
                </p>
                <div className="flex justify-center gap-3 sm:gap-6 mb-4">
                  {[
                    {
                      value: time.days,
                      label: "Jour" + (parseInt(time.days) !== 1 ? "s" : ""),
                    },
                    {
                      value: time.hours,
                      label: "Heure" + (parseInt(time.hours) !== 1 ? "s" : ""),
                    },
                    {
                      value: time.minutes,
                      label:
                        "Minute" + (parseInt(time.minutes) !== 1 ? "s" : ""),
                    },
                    {
                      value: time.seconds,
                      label:
                        "Seconde" + (parseInt(time.seconds) !== 1 ? "s" : ""),
                    },
                  ].map((unit, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="bg-white/20 text-white text-2xl sm:text-3xl font-mono font-bold w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-xl">
                        {unit.value}
                      </div>
                      <p className="text-sm sm:text-base font-medium mt-2">
                        {unit.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-base sm:text-lg font-medium">
                  Dépêchez-vous, l'offre expire bientôt !
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {isLoading ? (
              <div className="col-span-full flex flex-col items-center justify-center text-center py-12">
                <Loader2 className="animate-spin w-8 h-8 text-primary mb-4" />
                <p className="text-muted-foreground text-lg">
                  Chargement des voyants...
                </p>
              </div>
            ) : allSeers?.length ? (
              allSeers.slice(0, 3).map((seer: Seer) => (
                <Card
                  key={seer.id}
                  className="flex flex-col items-center text-center p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={`https://picsum.photos/seed/${seer.id}-card/300/200`}
                      alt={seer.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    />
                  </div>
                  <Avatar className="w-20 h-20 mb-4 border-2 border-primary -mt-12 z-10 bg-background">
                    <AvatarImage src={seer.imageUrl} alt={seer.name} />
                    <AvatarFallback>
                      {seer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl mb-1 capitalize">
                    {seer.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-amber-400 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{seer.rating.toFixed(1)}</span>

                    <div className="text-xs text-red-300">
                      <Badge variant="default" className="text-xs">
                        {seer.level}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 flex-grow px-2">
                    {seer.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 mb-4 capitalize">
                    <Badge variant="secondary" className="text-xs">
                      {seer.domain}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto w-full"
                    asChild
                  >
                    <Link href="/register">
                      Connectez-vous avec {seer.name.split(" ")[0]}
                    </Link>
                  </Button>
                  <div className="flex flex-wrap justify-center gap-1 mt-4 capitalize">
                    <Badge variant="outline" className="text-xs">
                      {seer.credit_per_message} credit/message
                    </Badge>
                  </div>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                Aucun voyant disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SeerShowcase;
