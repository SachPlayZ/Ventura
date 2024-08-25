"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, Loader2 as LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  address: z.string().min(1, { message: "Required" }),
  fullName: z.string().min(1, { message: "Required" }),
  dateOfBirth: z.date().refine((date) => date.getTime() < Date.now(), {
    message: "Date of Birth must be in the past",
  }),
  nationality: z.string().min(1, { message: "Required" }),
  gender: z.enum(["Male", "Female", "Other"], { message: "Select a gender" }),
  residentialAddress: z.object({
    street: z.string().min(1, { message: "Required" }),
    city: z.string().min(1, { message: "Required" }),
    state: z.string().min(1, { message: "Required" }),
    postalCode: z.string().min(1, { message: "Required" }),
    country: z.string().min(1, { message: "Required" }),
  }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Required" }),
  identification: z.object({
    idNumber: z.string().min(1, { message: "Required" }),
    idType: z.enum(["PAN", "Aadhar", "Passport", "Social Security Number"]),
    issuingAuthority: z.string().min(1, { message: "Required" }),
  }),
  proofOfIdentity: z.string().min(1, { message: "Required" }), // Assuming this is a URL or filepath
  proofOfAddress: z.string().min(1, { message: "Required" }), // Assuming this is a URL or filepath
  occupation: z.string().min(1, { message: "Required" }),
  companyName: z.string().optional(),
});

const KYCForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      fullName: "",
      dateOfBirth: new Date(),
      nationality: "",
      gender: "Male",
      residentialAddress: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      email: "",
      phoneNumber: "",
      identification: {
        idNumber: "",
        idType: "PAN",
        issuingAuthority: "",
      },
      proofOfIdentity: "",
      proofOfAddress: "",
      occupation: "",
      companyName: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/kyc", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log("Submitted KYC data", response);
      router.push("/");
    } catch (error) {
      console.error("Failed to submit KYC data", error);
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Wallet Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2">
                      <FormLabel>Date of Birth</FormLabel>
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
                              onSelect={field.onChange}
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
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Indian">Indian</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          {/* Add other nationality options as needed */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residentialAddress.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residentialAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residentialAddress.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residentialAddress.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="residentialAddress.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identification.idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ID Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identification.idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PAN">PAN</SelectItem>
                          <SelectItem value="Aadhar">Aadhar</SelectItem>
                          <SelectItem value="Passport">Passport</SelectItem>
                          <SelectItem value="Social Security Number">
                            Social Security Number
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identification.issuingAuthority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Authority</FormLabel>
                    <FormControl>
                      <Input placeholder="Issuing Authority" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proofOfIdentity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proof of Identity</FormLabel>
                    <FormControl>
                      <Input placeholder="Proof of Identity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="proofOfAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proof of Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Proof of Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Occupation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default KYCForm;
