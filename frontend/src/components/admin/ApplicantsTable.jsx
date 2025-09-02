
// Displays a table of users who applied for a job
// Allows admin to update application status (Accepted / Rejected)

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_PONT } from "@/utils/constant";

// Options for shortlisting applicants
const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  // Handle updating applicant's status
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_PONT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { applicants } = useSelector((store) => store.application);

  return (
    <div>
      <Table>
        <TableCaption>A list of recent applicants</TableCaption>

        {/* Table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                {/* Applicant details */}
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                {/* Resume link */}
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                    >
                      {item?.applicant?.profile?.resumeOrignalName}
                    </a>
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </TableCell>

                {/* Application date */}
                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>

                {/* Action popover for status update */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div
                          className="cursor-pointer"
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

