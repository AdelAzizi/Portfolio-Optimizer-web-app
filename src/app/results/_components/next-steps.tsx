"use client";

import { useFormState, useFormStatus } from "react-dom";
import { subscribeToNotifications } from "../actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Lightbulb, Loader2 } from "lucide-react";

interface NextStepsProps {
  date: string;
  recommendation: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-accent hover:bg-accent/90">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'ثبت نام'}
    </Button>
  );
}

export function NextSteps({ date, recommendation }: NextStepsProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(subscribeToNotifications, { message: null, type: null });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.type === 'success' ? 'موفقیت‌آمیز' : 'خطا',
        description: state.message,
        variant: state.type === 'error' ? 'destructive' : 'default',
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">گام‌های بعدی</CardTitle>
        <CardDescription>برنامه‌ریزی و اطلاعیه‌ها</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start p-4 bg-muted/50 rounded-lg">
          <Lightbulb className="h-8 w-8 text-accent mr-4 mt-1" />
          <div>
            <h4 className="font-bold mb-1">توصیه هوشمند</h4>
            <p className="text-sm text-muted-foreground">{recommendation}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-primary mr-3" />
            <p className="font-semibold">تاریخ بازآرایی بعدی:</p>
          </div>
          <p className="font-bold text-lg text-primary">{date}</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">اطلاع‌رسانی</h4>
          <p className="text-sm text-muted-foreground mb-3">
            ایمیل خود را وارد کنید تا یادآوری بازآرایی سبد را برای شما ارسال کنیم.
          </p>
          <form action={formAction} className="flex gap-2">
            <Input
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              className="text-left"
            />
            <SubmitButton />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
