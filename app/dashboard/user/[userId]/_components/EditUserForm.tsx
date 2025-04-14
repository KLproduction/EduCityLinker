"use client";

import { useState } from "react";
import { User, UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditUserRole } from "@/hooks/user"; // you’ll need to create or reuse this
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";

type Props = {
  user: User;
};

const EditUserForm = ({ user }: Props) => {
  const [isEditable, setIsEditable] = useState(false);

  const { register, onSubmit, errors, isSubmitting, watch, setValue } =
    useEditUserRole({
      user,
      setIsEditable,
    });

  return (
    <Card className="mx-auto my-6 w-full max-w-[280px] sm:max-w-7xl">
      <form onSubmit={onSubmit} className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <CardTitle>Edit User</CardTitle>
          <Button
            type="button"
            variant={isEditable ? "secondary" : "default"}
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? "Cancel Edit" : "Edit Role"}
          </Button>
        </div>

        {/* Name (read-only) */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={user.name ?? ""} disabled />
        </div>

        {/* Email (read-only) */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email ?? ""} disabled />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            disabled={!isEditable}
            value={watch("role")}
            onValueChange={(value: UserRole) => setValue("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </div>

        {/* Two-Factor Auth */}
        <div className="space-y-2">
          <Label htmlFor="isTwoFactorEnabled">Two-Factor Enabled</Label>
          <div className="flex items-center gap-4">
            <Switch
              id="isTwoFactorEnabled"
              checked={user.isTwoFactorEnabled}
              disabled
            />
            <span className="text-sm text-muted-foreground">
              {user.isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          {/* Created At */}
          <div className="space-y-2">
            <Label htmlFor="createdAt">Account Created</Label>
            <Input
              id="createdAt"
              value={format(new Date(user.createdAt), "PPP")}
              disabled
            />
          </div>

          {/* Email Verified */}
          <div className="space-y-2">
            <Label htmlFor="emailVerified">Email Verified</Label>
            <Input
              id="emailVerified"
              value={
                user.emailVerified
                  ? format(new Date(user.emailVerified), "PPP")
                  : "Not Verified"
              }
              disabled
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isEditable || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Updating..." : "Update Role"}
        </Button>
      </form>
    </Card>
  );
};

export default EditUserForm;
