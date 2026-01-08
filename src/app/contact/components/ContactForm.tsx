"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNotification(true);
    (e.target as HTMLFormElement).reset();
  };

  React.useEffect(() => {
    if (showNotification) {
      const timerId = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [showNotification]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Open a Ticket</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <RadioGroup
            name="priority"
            legend="Priority"
            options={[
              { id: "priority-low", label: "Low", value: "low" },
              { id: "priority-medium", label: "Medium", value: "medium", defaultChecked: true },
              { id: "priority-high", label: "High", value: "high" }
            ]}
          />

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Please provide details about your issue..."
              rows={4}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Ticket
          </Button>
        </CardFooter>
      </form>

      {showNotification && (
        <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-md animate-in fade-in-0 duration-300 dark:bg-green-950 dark:border-green-800">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-400">
                Ticket submission coming soon!
              </p>
              <p className="text-sm text-green-700 mt-1 dark:text-green-400">
                Please use the direct contact links below for now.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
