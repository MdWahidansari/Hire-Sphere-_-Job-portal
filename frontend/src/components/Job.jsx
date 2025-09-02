import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Function to calculate how many days ago the job was posted
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Top section: Posted time and bookmark button */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company info section */}
      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage className="w-8" src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job title and description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* Job badges: Position, Type, Salary */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="text-pink-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-700 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;

