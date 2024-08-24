"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useStateContext } from "@/context";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 as LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation"; // Make sure you're importing from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  target: z.string().min(1, { message: "Required" }),
  deadline: z.date().refine((date) => date.getTime() > Date.now(), {
    message: "Deadline must be a future date",
  }),
  image: z.string().min(1, { message: "Required" }),
  equityHolders: z.array(
    z.object({
      name: z.string().min(1, { message: "Required" }),
      percentage: z.string().min(1, { message: "Required" }),
    })
  ),
  video: z.string().min(1, { message: "Required" }),
});

const CreateStartup = () => {
  const router = useRouter(); // Move the useRouter call here
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      target: "",
      deadline: new Date(),
      image: "",
      video: "",
      equityHolders: [{ name: "", percentage: "" }],
    },
  });

  const { createStartupCampaign } = useStateContext();
  const [loading, setLoading] = React.useState(false);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createStartupCampaign(
        data.title,
        data.description,
        data.target,
        data.deadline.getTime(),
        data.image,
        data.video,
        data.equityHolders.map((holder) => ({
          name: holder.name,
          percentage: BigInt(holder.percentage), // Convert string to bigint
        }))
      );
      router.push("/startups");
    } catch (error) {
      console.error("Failed to create startup campaign", error);
      // Handle error accordingly
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full overflow-hidden flex items-center justify-center">
      <div className=" max-w-xl mt-16 mx-auto overflow-x-hidden p-6 bg-zinc-800 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Startup Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Describe your startup" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input placeholder="Target amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange} // Update form state directly
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="URL of the startup image"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="URL of the startup video"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Render equity holders fields */}
            <div className="space-y-4">
              {form.watch("equityHolders").map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`equityHolders.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equity Holder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`equityHolders.${index}.percentage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equity Percentage</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Percentage"
                            {...field}
                            type="text" // Use text input to handle large numbers as strings
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  form.setValue("equityHolders", [
                    ...form.getValues("equityHolders"),
                    { name: "", percentage: "" },
                  ])
                }
              >
                Add Equity Holder
              </Button>
            </div>

            <div className="flex justify-end">
              <Button className="bg-[#00d8ff]" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderIcon className="animate-spin mr-2" size={16} />
                  </>
                ) : (
                  "Create Startup"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateStartup;