import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
export const useCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const session = useSession();
      return session.data?.user;
    },
  });
  return data;
};
