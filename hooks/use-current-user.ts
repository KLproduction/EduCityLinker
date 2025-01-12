import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
export const useCurrentUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const session = useSession();

      if (session.data?.user.id) {
        return {
          status: 200,
          data: session.data?.user,
        };
      }
    },
  });
};
