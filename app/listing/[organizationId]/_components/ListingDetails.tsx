import { courseTypes, courseLevels, ageGroups } from "@/data/data";
import { FaUsers, FaClock, FaDollarSign } from "react-icons/fa";

type Props = {
  listing: {
    title: string;
    description: string;
    courseType: string;
    courseLevels: string;
    ageGroups: string;
    durationWeeks: number;
    maxStudents: number;
    price: number;
  };
};

const ListingDetailSection = ({ listing }: Props) => {
  // Find matching course type
  const courseTypeData = courseTypes.find(
    (c) => c.title === listing.courseType,
  );
  const CourseIcon = courseTypeData?.icon;

  // Find matching course level
  const courseLevelData = courseLevels.find(
    (c) => c.label === listing.courseLevels,
  );

  // Find matching age group
  const ageGroupData = ageGroups.find((a) => a.label === listing.ageGroups);

  return (
    <div className="w-full rounded-lg border bg-white p-6 shadow-sm">
      {/* Title & Description */}
      <h2 className="text-xl font-semibold">{listing.title}</h2>
      <p className="mt-1 text-gray-600">{listing.description}</p>

      {/* Course Type */}
      <div className="mt-4 flex items-center gap-3">
        {CourseIcon && <CourseIcon size={20} className="text-blue-500" />}
        <span className="text-lg font-medium">{listing.courseType}</span>
      </div>

      {/* Course Level */}
      {courseLevelData && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Level:</strong> {courseLevelData.label} -{" "}
          {courseLevelData.description}
        </div>
      )}

      {/* Age Group */}
      {ageGroupData && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Age Group:</strong> {ageGroupData.label} -{" "}
          {ageGroupData.description}
        </div>
      )}

      {/* Additional Details (Duration, Students, Price) */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FaClock size={16} className="text-gray-500" />
          <span>{listing.durationWeeks} weeks</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUsers size={16} className="text-gray-500" />
          <span>{listing.maxStudents} Max students</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-lg font-bold text-green-600">
          <FaDollarSign size={18} />
          <span>{listing.price} USD</span>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailSection;
