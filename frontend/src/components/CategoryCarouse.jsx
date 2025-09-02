import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedhQuery } from "@/redux/jobSlice";

const CategoryCarouse = () => {
  // Define job categories to display in the carousel
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle category click: set search query and navigate to browse page
  const searchJobHandler = (query) => {
    dispatch(setSearchedhQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      {/* Carousel displaying job categories */}
      <Carousel className="w-full max-w-6xl mx-auto my-20">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation controls for carousel */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarouse;
