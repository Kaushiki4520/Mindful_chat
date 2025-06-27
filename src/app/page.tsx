import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Chatbot } from '@/components/chatbot';

const HeroDoodle = () => (
  <div className="relative w-full max-w-lg mx-auto flex items-center justify-center p-4">
    <svg viewBox="0 0 200 200" className="w-full h-auto">
      <path d="M100 50 L100 70 M150 100 L130 100 M100 150 L100 130 M50 100 L70 100 M71 71 L85 85 M129 71 L115 85 M129 129 L115 115 M71 129 L85 115" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="100" cy="100" r="30" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
      <path d="M30 160 Q 80 120, 130 170 T 180 150" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M160 40 C 170 50, 170 60, 160 70 C 150 60, 150 50, 160 40" fill="hsl(var(--accent) / 0.2)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <circle cx="40" cy="50" r="3" fill="hsl(var(--primary))"/>
      <circle cx="170" cy="120" r="4" fill="hsl(var(--accent))"/>
      <circle cx="60" cy="140" r="2" fill="hsl(var(--primary) / 0.5)"/>
    </svg>
  </div>
);

const SymptomDoodle = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
    <path d="M7 10C7 6.68629 9.68629 4 13 4H19C22.3137 4 25 6.68629 25 10C25 13.3137 22.3137 16 19 16H18L13 21V16H12C9.23858 16 7 13.7614 7 11V10Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 13L14.5858 11.5858C13.8047 10.8047 12.5384 10.8047 11.7574 11.5858C10.9763 12.3668 10.9763 13.6332 11.7574 14.4142L16 18.6569L20.2426 14.4142C21.0237 13.6332 21.0237 12.3668 20.2426 11.5858C19.4616 10.8047 18.1953 10.8047 17.4142 11.5858L16 13Z" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

const HealthLibDoodle = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
    <path d="M7 26V6C7 4.89543 7.89543 4 9 4H24C25.1046 4 26 4.89543 26 6V26L16.5 21L7 26Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.5 21V12C16.5 10 18.5 9 19.5 9C20.5 9 22.5 10 22.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19.5 13C18.5 14 18.5 16 19.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoodTrackerDoodle = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
    <path d="M9 4H23C24.1046 4 25 4.89543 25 6V26C25 27.1046 24.1046 28 23 28H9C7.89543 28 7 27.1046 7 26V6C7 4.89543 7.89543 4 9 4Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 11H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 19H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 24C17.6569 24 19 22.6569 19 21C19 19.3431 17.6569 18 16 18C14.3431 18 13 19.3431 13 21C13 22.6569 14.3431 24 16 24Z" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export default function Home() {
  const features = [
    {
      title: "Symptom Checker",
      description: "Gently explore your feelings and symptoms with our AI-guided tool. Get insights, not diagnoses, to help you understand what you're going through.",
      link: "/diagnosis",
      buttonText: "Try the Checker",
      doodle: <SymptomDoodle />,
    },
    {
      title: "Daily Mood Tracker",
      description: "Log your daily mood with emojis and notes. Our AI can help you discover patterns and offer personalized tips for your well-being.",
      link: "/mood-tracker",
      buttonText: "Track Your Mood",
      doodle: <MoodTrackerDoodle />,
    },
    {
      title: "Health Library",
      description: "Knowledge is power. Browse our library of articles on various mental health conditions to learn more about them.",
      link: "/health-info",
      buttonText: "Browse Articles",
      doodle: <HealthLibDoodle />,
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                  Your Compassionate Partner in Mental Wellness
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  MindfulChat offers a safe space to explore your feelings, understand your mind, and find resources for a healthier life.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/diagnosis">
                    <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/health-info">
                    <Button size="lg" variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:order-last">
                <HeroDoodle />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Talk to Our Mindful AI
              </h2>
              <p className="max-w-[600px] text-muted-foreground">
                Get compassionate, non-judgmental support from our AI assistant.
              </p>
            </div>
            <Chatbot />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Tools for Your Well-being</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide a suite of tools designed to support you on your mental health journey, from initial curiosity to ongoing support.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12 mt-12">
            {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow grid grid-rows-[auto_1fr_auto]">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    {feature.doodle}
                    <div className="flex-1">
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent />
                  <CardContent>
                    <Link href={feature.link}>
                      <Button variant="outline" className="w-full">{feature.buttonText}</Button>
                    </Link>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}