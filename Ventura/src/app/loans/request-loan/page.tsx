"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useStateContext } from "@/context";
import { Button } from "@/components/ui/button";
import { Loader2 as LoaderIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  amount: z.string().min(1, { message: "Required" }),
  purpose: z.string().min(1, { message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
  duration: z
    .string()
    .min(1, { message: "Required" })
    .refine(
      (value) => {
        const parsedValue = parseInt(value, 10);
        return !isNaN(parsedValue) && Number.isInteger(parsedValue);
      },
      {
        message: "Duration must be a valid integer",
      }
    ),
});

const RequestLoan = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      purpose: "",
      name: "",
      duration: "",
    },
  });

  const { applyForLoan } = useStateContext();
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await applyForLoan(
        data.amount,
        data.purpose,
        data.name,
        parseInt(data.duration)
      );
      router.push("/loans");
    } catch (error) {
      console.error("Failed to request loan", error);
      // Handle error accordingly
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full overflow-hidden flex items-center justify-center h-[80vh]">
      <div className="max-w-xl mt-16 mx-auto overflow-x-hidden p-6 bg-zinc-800 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="Loan amount in AVAX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <FormControl>
                      <Input placeholder="Purpose of the loan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in months)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Loan duration in months"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-[#00d8ff]" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderIcon className="animate-spin mr-2" size={16} />
                  </>
                ) : (
                  "Request Loan"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RequestLoan;
