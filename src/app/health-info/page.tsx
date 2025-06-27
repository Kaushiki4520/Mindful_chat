import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthInfoPage() {
  const conditions = [
    {
      id: "anxiety",
      name: "Anxiety Disorders",
      description: "Anxiety disorders are a group of mental illnesses that cause constant and overwhelming anxiety and fear. The excessive anxiety can make you avoid work, school, family get-togethers, and other social situations that might trigger or worsen your symptoms.",
      details: "Common types include Generalized Anxiety Disorder (GAD), Panic Disorder, and Social Anxiety Disorder. Treatments often involve psychotherapy, such as Cognitive Behavioral Therapy (CBT), and medication."
    },
    {
      id: "depression",
      name: "Depression",
      description: "Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Fortunately, it is also treatable.",
      details: "Symptoms can range from mild to severe and can include feeling sad or having a depressed mood, loss of interest or pleasure in activities once enjoyed, changes in appetite, and trouble sleeping. It's more than just a bout of the blues; it requires a long-term treatment plan."
    },
    {
      id: "ptsd",
      name: "Post-Traumatic Stress Disorder (PTSD)",
      description: "PTSD is a mental health condition that's triggered by a terrifying event — either experiencing it or witnessing it. Symptoms may include flashbacks, nightmares and severe anxiety, as well as uncontrollable thoughts about the event.",
      details: "Many people who go through traumatic events may have temporary difficulty adjusting and coping, but with time and good self-care, they usually get better. If the symptoms get worse, last for months or even years, and interfere with your day-to-day functioning, you may have PTSD."
    },
    {
        id: "bipolar",
        name: "Bipolar Disorder",
        description: "Bipolar disorder is a mental illness that brings severe high and low moods and changes in sleep, energy, thinking, and behavior. People who have bipolar disorder can have periods in which they feel overly happy and energized and other periods of feeling very sad, hopeless, and sluggish.",
        details: "The periods of high energy are known as manic episodes, while the periods of low mood are called depressive episodes. In between, they may feel normal. Treatment is lifelong and often involves a combination of medications and psychotherapy."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Mental Health Library</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
          Learn about various mental health conditions. This information is for educational purposes only.
        </p>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Common Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {conditions.map(condition => (
              <AccordionItem value={condition.id} key={condition.id}>
                <AccordionTrigger className="text-lg">{condition.name}</AccordionTrigger>
                <AccordionContent className="space-y-2 text-base text-muted-foreground">
                  <p className="font-semibold text-foreground">{condition.description}</p>
                  <p>{condition.details}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
