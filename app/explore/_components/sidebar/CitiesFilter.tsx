import Select from "react-select";
import { ukCities } from "@/data/data";
import { useEffect, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";

type CityOption = {
  label: string;
  value: string;
};

const CitiesFilter = () => {
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const cityOptions: CityOption[] = ukCities.map((city) => ({
    label: city,
    value: city.toLowerCase().replace(/\s+/g, "-"),
  }));

  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const toggleSelection = (label: string) => {
    setSelectedCities((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [label],
    );
  };

  const [labels, setLabels] = useQueryState(
    "organization-cities",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  useEffect(() => {
    setLabels(selectedCities.join(","));
  }, [selectedCities]);

  const handleCityChange = (option: CityOption | null) => {
    setSelectedCity(option);

    if (option) {
      toggleSelection(option.label);
    }
  };

  const handleReset = () => {
    setSelectedCity(null);
    setSelectedCities([]);
    setLabels("");
  };

  return (
    <div className="mx-auto flex min-w-full flex-col items-center gap-3">
      <Select
        options={cityOptions}
        value={selectedCity}
        onChange={handleCityChange}
        placeholder="Select a city"
        isSearchable
        className="w-full rounded-xl border-rose-500"
      />
      <Button
        variant={"outline"}
        onClick={() => handleReset()}
        className="flex w-full justify-center text-xs"
        disabled={!selectedCity}
      >
        All Cities
      </Button>
    </div>
  );
};

export default CitiesFilter;
