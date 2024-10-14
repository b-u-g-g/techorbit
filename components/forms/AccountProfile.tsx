"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    github?: string;
    codeforcesRating?: string;
    codechefRating?: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const { startUpload } = useUploadThing("media");
  const [files, setfiles] = useState<File[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      bio: user?.bio || "",
      username: user?.username || "",
      github: user?.github || "",
      codeforcesRating: user?.codeforcesRating || "",
      codechefRating: user?.codechefRating || "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setfiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      github: values.github,
      codeforcesRating: values.codeforcesRating,
      codechefRating: values.codechefRating,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 p-3">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full p-3">
              <FormLabel className="text-base-semibold text-light-2 p-1">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full p-3">
              <FormLabel className="text-base-semibold text-light-2 p-1">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Bio Field */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full p-3">
              <FormLabel className="text-base-semibold text-light-2 p-1">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* GitHub URL Field */}
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full p-3">
              <FormLabel className="text-base-semibold text-light-2 p-1">
                GitHub URL
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Codeforces Rating Field */}
        <FormField
          control={form.control}
          name="codeforcesRating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full p-3">
              <FormLabel className="text-base-semibold text-light-2 p-1">
                Codeforces Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* CodeChef Rating Field */}
        <FormField
          control={form.control}
          name="codechefRating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full p-3">
              <FormLabel className="text-base-semibold text-light-2 p-1">
                CodeChef Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500 p-2">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;

