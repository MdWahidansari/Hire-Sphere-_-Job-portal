// Displays a table of all companies with logo, name, creation date, and actions (edit)
// Supports filtering by company name using Redux state

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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();

  //  Filter companies based on search text
  const filterCompany = useMemo(() => {
    return (companies || []).filter((company) =>
      searchCompanyByText
        ? company?.name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase())
        : true
    );
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        {/* Table caption */}
        <TableCaption>A list of your recent registered companies</TableCaption>

        {/* Table headers */}
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {filterCompany.length > 0 ? (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                {/* Company logo */}
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://via.placeholder.com/40?text=Logo"
                      }
                      alt="Company Logo"
                    />
                  </Avatar>
                </TableCell>

                {/* Company name */}
                <TableCell>{company.name}</TableCell>

                {/* Creation date */}
                <TableCell>
                  {company.createdAt ? company.createdAt.split("T")[0] : "N/A"}
                </TableCell>

                {/* Actions: Edit */}
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
