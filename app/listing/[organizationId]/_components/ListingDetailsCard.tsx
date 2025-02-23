interface CourseDetailProps {
  title: string;
  description: string;
  courseType: string;
  courseLevel: string;
  ageGroup: string;
  durationWeeks: number;
  maxStudents: number;
  price: number;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ageGroups, courseLevels, courseTypes } from "@/data/data";
import { formattedPrice } from "@/lib/formatPrice";
import {
  FaBookOpen,
  FaBriefcase,
  FaClock,
  FaComments,
  FaDollarSign,
  FaGraduationCap,
  FaMicrophoneAlt,
  FaPencilAlt,
  FaUniversity,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { MdPublic } from "react-icons/md";

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ElementType } = {
    MdPublic,
    FaGraduationCap,
    FaBriefcase,
    FaComments,
    FaUniversity,
    FaWrench,
    FaPencilAlt,
    FaMicrophoneAlt,
    FaBookOpen,
  };
  return icons[iconName] || MdPublic;
};

export default function CourseDetailDisplay({
  title,
  description,
  courseType,
  courseLevel,
  ageGroup,
  durationWeeks,
  maxStudents,
  price,
}: CourseDetailProps) {
  const IconComponent = getIconComponent(courseType.replace(/\s+/g, ""));
  const courseTypeInfo =
    courseTypes.find((type) => type.title === courseType) || courseTypes[0];

  const ageGroupInfo =
    ageGroups.find((type) => type.label === ageGroup) || ageGroups[0];

  const courseLevelInfo =
    courseLevels.find((type) => type.label === courseLevel) || courseLevels[0];

  return (
    <Card className="mx-auto w-full rounded-none border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start space-x-2">
            <IconComponent className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h1 className="font-medium">Course Type</h1>
              <p className="text-sm text-muted-foreground">{courseType}</p>
              <p className="mt-1 text-sm">{courseTypeInfo.description}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaGraduationCap className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h1 className="font-medium">Course Level</h1>
              <p className="text-sm text-muted-foreground">{courseLevel}</p>
              <p className="mt-1 text-sm">{courseLevelInfo.description}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaUsers className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h1 className="font-medium">Age Group</h1>
              <p className="text-sm text-muted-foreground">{ageGroup}</p>
              <p className="mt-1 text-sm">{ageGroupInfo.description}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaClock className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h1 className="font-medium">Duration</h1>
              <p className="text-sm text-muted-foreground">
                {durationWeeks} weeks
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaUsers className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h1 className="font-medium">Max Students</h1>
              <p className="text-sm text-muted-foreground">{maxStudents}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaDollarSign className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h1 className="font-medium">Price</h1>
              <p className="text-sm text-muted-foreground">
                {formattedPrice(price)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
