import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  // Access applied jobs from Redux store
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        {/* Table caption describing the content */}
        <TableCaption>A list of your applied jobs</TableCaption>

        {/* Table header with column names */}
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body containing job rows */}
        <TableBody>
          {allAppliedJobs && allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((job) => (
              <TableRow key={job._id}>
                {/* Display job creation date or fallback */}
                <TableCell>
                  {job.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                </TableCell>

                {/* Job title */}
                <TableCell>{job.title || "N/A"}</TableCell>

                {/* Company name */}
                <TableCell>{job.company?.name || "N/A"}</TableCell>

                {/* Job status with color-coded badge */}
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      job?.status?.toLowerCase() === "rejected"
                        ? "bg-red-400" // Red for rejected
                        : job?.status?.toLowerCase() === "pending"
                        ? "bg-gray-400" // Gray for pending
                        : job?.status?.toLowerCase() === "accepted"
                        ? "bg-green-400" // Green for accepted
                        : "bg-blue-400" // Blue for any other status
                    }`}
                  >
                    {job?.status ? job.status.toUpperCase() : "UNKNOWN"} 
                    {/* Fallback if status is missing */}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // Display message if no jobs applied
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't applied to any job yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;

