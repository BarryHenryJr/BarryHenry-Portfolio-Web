"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Open a Ticket</CardTitle>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Ticket submission functionality coming soon! Please use the direct contact links below.");
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

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Priority
            </legend>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="priority-low"
                  name="priority"
                  value="low"
                  className="h-4 w-4 text-primary focus:ring-primary border-border"
                />
                <Label htmlFor="priority-low" className="text-sm">
                  Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="priority-medium"
                  name="priority"
                  value="medium"
                  className="h-4 w-4 text-primary focus:ring-primary border-border"
                  defaultChecked
                />
                <Label htmlFor="priority-medium" className="text-sm">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="priority-high"
                  name="priority"
                  value="high"
                  className="h-4 w-4 text-primary focus:ring-primary border-border"
                />
                <Label htmlFor="priority-high" className="text-sm">
                  High
                </Label>
              </div>
            </div>
          </fieldset>

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
        <div className="px-6 pb-6">
          <Button type="submit" className="w-full">
            Submit Ticket
          </Button>
        </div>
      </form>
    </Card>
  );
}
