import { useCreateCourse, useSelectCountry } from "@/hooks/create-course";
import { useAppDispatch, useAppSelector, setCourseData } from "@/redux/store";
import { divide } from "lodash";
import React, { useEffect } from "react";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const CountrySelect = () => {
  const { register, setValue, watch, getValues, errors } = useCreateCourse();
  const { getAll, getByValue } = useSelectCountry();

  const courseData = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();
  console.log(courseData);

  return (
    <div className="flex flex-col">
      <Select
        {...register}
        value={courseData.location || ""}
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        onChange={(value) => {
          dispatch(setCourseData({ location: value }));
        }}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="ml-1 text-zinc-500">{option.region}</span>
            </div>
          </div>
        )}
        styles={{
          control: (provided) => ({
            ...provided,
            padding: "0.75rem",
            borderWidth: "2px",
          }),
          option: (provided) => ({ ...provided, fontCol: "1.125rem" }),
          input: (provided) => ({ ...provided, fontSize: "1.125rem" }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
      {errors && errors.location && <p>{errors.location.message}</p>}
    </div>
  );
};

export default CountrySelect;
