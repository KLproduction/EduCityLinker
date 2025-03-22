import { getOrganizationsNameAction } from "@/actions/organization";
import { useQuery } from "@tanstack/react-query";

export const useGetOrganization = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["organization"],
    queryFn: async () => await getOrganizationsNameAction(),
  });

  return { data, isLoading };
};
