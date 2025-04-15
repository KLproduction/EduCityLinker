"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditListingFromDB } from "@/hooks/create-course";
import { Listing } from "@prisma/client";
import { ageGroups, courseLevels, courseTypes } from "@/data/data";

export const EditCourseForm = ({ courseData }: { courseData: Listing }) => {
  const {
    register,
    submit,
    setValue,
    watch,
    reset,
    getValues,
    isPending,
    resetToDefault,
  } = useEditListingFromDB(courseData);

  return (
    <div className="mx-auto min-w-full max-w-4xl rounded-lg bg-white p-6">
      <div className="flex w-full flex-col gap-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-rose-500">
          Edit Course
        </h1>
        <form onSubmit={submit} className="space-y-6">
          {/* Course Title */}
          <Card>
            <CardHeader>
              <CardTitle>Course Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                {...register("title")}
                className="border-zinc-500 bg-zinc-50"
                placeholder="Course Title"
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                {...register("description")}
                rows={4}
                className="border-zinc-500 bg-zinc-50"
                placeholder="Course Description"
              />
            </CardContent>
          </Card>

          {/* Course Type */}
          <Card>
            <CardHeader>
              <CardTitle>Course Type</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={watch("courseType")}
                onValueChange={(val) => setValue("courseType", val as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select courseType" />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((label) => (
                    <SelectItem key={label.title} value={label.title}>
                      {label.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Course Level */}
          <Card>
            <CardHeader>
              <CardTitle>Course Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={watch("courseLevels")}
                onValueChange={(val) => setValue("courseLevels", val as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {courseLevels.map((label) => (
                    <SelectItem key={label.label} value={label.label}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Age Group */}
          <Card>
            <CardHeader>
              <CardTitle>Age Group</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={watch("ageGroups")}
                onValueChange={(val) => setValue("ageGroups", val as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Age Group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((label) => (
                    <SelectItem key={label.label} value={label.label}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Max Students */}
          <Card>
            <CardHeader>
              <CardTitle>Max Students</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                {...register("maxStudents", { valueAsNumber: true })}
                className="border-zinc-500 bg-zinc-50"
                placeholder="e.g. 12"
              />
            </CardContent>
          </Card>

          {/* Duration (weeks) */}
          <Card>
            <CardHeader>
              <CardTitle>Course Duration (Weeks)</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                {...register("durationWeeks", { valueAsNumber: true })}
                className="border-zinc-500 bg-zinc-50"
                placeholder="e.g. 4"
              />
            </CardContent>
          </Card>

          {/* Price */}
          <Card>
            <CardHeader>
              <CardTitle>Price (£)</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="border-zinc-500 bg-zinc-50"
                placeholder="e.g. 400"
              />
            </CardContent>
          </Card>

          {/* Submit and Reset */}
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={resetToDefault}
            >
              Reset Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
