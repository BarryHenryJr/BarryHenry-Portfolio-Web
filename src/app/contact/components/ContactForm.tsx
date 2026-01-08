"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

export function ContactForm() {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Open a Ticket</CardTitle>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000); // Hide after 5 seconds
        }}
      >
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
        <div className="mx-6 mb-6 p-4 bg-green-50 border border-green-200 rounded-md animate-in fade-in-0 duration-300">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Ticket submission coming soon!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Please use the direct contact links below for now.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
