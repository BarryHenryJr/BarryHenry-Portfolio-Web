import React from "react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">
          Submit a ticket or check channel status.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Open a Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Open a Ticket</CardTitle>
          </CardHeader>
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
        </Card>

        {/* Column 2: Channel Status */}
        <div className="space-y-6">
          {/* System Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Email</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">GitHub</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">LinkedIn</span>
                </div>
                <span className="text-sm text-muted-foreground">Operational</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Avg. Response Time</span>
                <Badge variant="secondary" className="text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800">
                  2-4 hours
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Direct Access Card */}
          <Card>
            <CardHeader>
              <CardTitle>Direct Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full justify-start">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full justify-start">
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
