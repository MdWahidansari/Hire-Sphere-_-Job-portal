import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobsCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    // Card container clickable to navigate to job description page
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer"
    >
      {/* Company name and location */}
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job title and short description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* Job metadata badges: position, type, salary */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="text-pink-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-700 font-bold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCards;
