"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { travelerProfileSchema, type TravelerProfileSchema } from "@/lib/schemas/traveler";
import {
  DESTINATION_TYPES,
  BUDGET_LEVELS,
  TRAVEL_PARTY,
  PACE_OPTIONS,
  INTERESTS,
} from "@/lib/types/traveler";
import { saveProfile, getProfileFromStorage } from "@/lib/api/profile";
import { getItineraryFromProfile } from "@/lib/api/itinerary";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STEPS = 4;
const STEP_LABELS: Record<number, string> = {
  1: "Destination",
  2: "Duration & budget",
  3: "Who & pace",
  4: "Interests",
};

const DESTINATION_LABELS: Record<string, string> = {
  city: "City",
  nature: "Nature",
  beach: "Beach",
  mixed: "Mixed",
};

const BUDGET_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid-range",
  premium: "Premium",
};

const PARTY_LABELS: Record<string, string> = {
  solo: "Solo",
  couple: "Couple",
  family: "Family",
  friends: "Friends",
};

const PACE_LABELS: Record<string, string> = {
  relaxed: "Relaxed",
  balanced: "Balanced",
  intense: "Intense",
};

const INTEREST_LABELS: Record<string, string> = {
  food: "Food",
  culture: "Culture",
  adventure: "Adventure",
  relax: "Relax",
  photography: "Photography",
  nightlife: "Nightlife",
  shopping: "Shopping",
  history: "History",
};

const defaultValues: TravelerProfileSchema = {
  destinationType: "city",
  days: 3,
  budget: "mid",
  party: "couple",
  pace: "balanced",
  interests: [],
};

export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TravelerProfileSchema>({
    resolver: zodResolver(travelerProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    const stored = getProfileFromStorage();
    if (stored) form.reset(stored);
  }, [form]);

  const progress = (step / STEPS) * 100;

  const onNext = async () => {
    const fields: (keyof TravelerProfileSchema)[] =
      step === 1
        ? ["destinationType"]
        : step === 2
          ? ["days", "budget"]
          : step === 3
            ? ["party", "pace"]
            : ["interests"];
    const ok = await form.trigger(fields);
    if (!ok) return;
    if (step < STEPS) {
      setStep(step + 1);
    } else {
      await handleSubmit(form.getValues());
    }
  };

  const handleSubmit = async (values: TravelerProfileSchema) => {
    setIsSubmitting(true);
    try {
      await saveProfile(values);
      await getItineraryFromProfile(values);
      router.push("/itinerary?from=plan");
    } catch {
      form.setError("root", { message: "Something went wrong. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Plan your trip
          </h1>
          <p className="mt-1 text-muted-foreground">
            Answer a few questions so we can recommend your ideal itinerary.
          </p>
          <Progress value={progress} className="mt-4 h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            Step {step} of {STEPS}: {STEP_LABELS[step]}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}
            className="space-y-8"
          >
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <FormField
                  control={form.control}
                  name="destinationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What type of destination do you prefer?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          {DESTINATION_TYPES.map((value) => (
                            <div
                              key={value}
                              className={cn(
                                "flex items-center space-x-2 rounded-lg border p-4 transition-colors",
                                field.value === value
                                  ? "border-primary bg-primary/5"
                                  : "border-input hover:bg-muted/50"
                              )}
                            >
                              <RadioGroupItem value={value} id={value} />
                              <FormLabel
                                htmlFor={value}
                                className="cursor-pointer font-normal"
                              >
                                {DESTINATION_LABELS[value]}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <FormField
                  control={form.control}
                  name="days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How many days?</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={14}
                          value={field.value ?? ""}
                          onChange={(e) => {
                            const v = e.target.valueAsNumber;
                            field.onChange(Number.isFinite(v) ? v : 1);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BUDGET_LEVELS.map((value) => (
                            <SelectItem key={value} value={value}>
                              {BUDGET_LABELS[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <FormField
                  control={form.control}
                  name="party"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who is traveling?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          {TRAVEL_PARTY.map((value) => (
                            <div
                              key={value}
                              className={cn(
                                "flex items-center space-x-2 rounded-lg border p-4 transition-colors",
                                field.value === value
                                  ? "border-primary bg-primary/5"
                                  : "border-input hover:bg-muted/50"
                              )}
                            >
                              <RadioGroupItem value={value} id={`party-${value}`} />
                              <FormLabel
                                htmlFor={`party-${value}`}
                                className="cursor-pointer font-normal"
                              >
                                {PARTY_LABELS[value]}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred pace</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select pace" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PACE_OPTIONS.map((value) => (
                            <SelectItem key={value} value={value}>
                              {PACE_LABELS[value]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you interested in? (select at least one)</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {INTERESTS.map((value) => (
                            <FormItem
                              key={value}
                              className="flex flex-row items-center space-x-2 space-y-0 rounded-lg border p-4"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(value)}
                                  onCheckedChange={(checked) => {
                                    const next = checked
                                      ? [...(field.value ?? []), value]
                                      : (field.value ?? []).filter((i) => i !== value);
                                    field.onChange(next);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal">
                                {INTEREST_LABELS[value]}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {form.formState.errors.root && (
              <p className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className={step > 1 ? "flex-1" : "w-full"}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Loading…"
                  : step === STEPS
                    ? "See my itinerary"
                    : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
