
// Displays all jobs posted by admin in a table with options to edit and view applicants

import React, { useMemo } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  // Redux state: all jobs and search text
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  // Filter jobs based on search input (title)
  const filterJobs = useMemo(() => {
    return (allAdminJobs || []).filter((job) =>
      searchJobByText
        ? job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        : true
    );
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        {/* Table caption */}
        <TableCaption>A list of your recent posted jobs</TableCaption>

        {/* Table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {filterJobs.length > 0 ? (
            // Map through filtered jobs
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>
                  {job.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  {/* Actions popover */}
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {/* Edit job */}
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      {/* View applicants */}
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span className="text-sm">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // Show message if no jobs found
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;








