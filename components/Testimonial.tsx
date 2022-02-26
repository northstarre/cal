import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
export default function IndexPage() {
  return (
    <div className="my-12 mx-16 h-[700px] items-center overflow-hidden rounded-[20px] bg-[#F0D1CC] text-center">
      <h3
        role="heading"
        className="text-1xl my-4 font-semibold leading-6 text-[#272d67] xl:text-4xl xl:leading-10">
        What are mentors Saying about Northstarre
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative w-full">
          <CarouselProvider
            naturalSlideWidth={0}
            naturalSlideHeight={125}
            totalSlides={3}
            infinite={true}
            interval={10000}
            isPlaying={true}
            playDirection={"forward"}
            isIntrinsicHeight={true}>
            <Slider>
              <Slide index={0}>
                <div className="flex justify-center ">
                  <div className="pt-18 relative items-center bg-[url('/assets/Group%20129.svg')] bg-cover px-8 pb-16 lg:w-4/5">
                    <div className="relative z-10 mt-6 flex items-center justify-center ">
                      <div className="mx-12 flex w-3/5 flex-col items-center justify-center rounded-[20px] bg-white py-2 px-12">
                        <div>
                          <p className=" pb-12  text-center text-lg leading-relaxed text-gray-600">
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using this project.In
                            the first place we have granted to God, and by this our present charter confirmed
                            for us and our heirs forever that the English Church shall be free, and shall have
                            her rights entire, and her liberties inviolate; and we will that it be thus
                            observed; which is apparent from
                          </p>
                          <div className="flex flex-col items-center">
                            <img
                              className="mt-6 pb-4"
                              src="https://i.ibb.co/KwCJZR5/Ellipse-3-1.png"
                              alt="a student"
                            />
                            <h2 className="pb-2 text-xl font-semibold leading-tight text-gray-800">
                              Jane Doe
                            </h2>
                            <p className="text-base leading-none text-gray-600">Michigan University</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-16">
                      <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide index={1}>
                <div className="flex justify-center ">
                  <div className="pt-18 relative items-center bg-[url('/assets/Group%20129.svg')] bg-cover px-8 pb-16 lg:w-4/5">
                    <div className="relative z-10 mt-6 flex items-center justify-center ">
                      <div className="mx-12 flex w-3/5 flex-col items-center justify-center rounded-[20px] bg-white py-2 px-12">
                        <div>
                          <p className=" pb-12  text-center text-lg leading-relaxed text-gray-600">
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using this project.In
                            the first place we have granted to God, and by this our present charter confirmed
                            for us and our heirs forever that the English Church shall be free, and shall have
                            her rights entire, and her liberties inviolate; and we will that it be thus
                            observed; which is apparent from
                          </p>
                          <div className="flex flex-col items-center">
                            <img
                              className="mt-6 pb-4"
                              src="https://i.ibb.co/KwCJZR5/Ellipse-3-1.png"
                              alt="a student"
                            />
                            <h2 className="pb-2 text-xl font-semibold leading-tight text-gray-800">
                              Jane Doe
                            </h2>
                            <p className="text-base leading-none text-gray-600">Michigan University</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-16">
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide index={2}>
                <div className="flex justify-center ">
                  <div className="pt-18 relative items-center bg-[url('/assets/Group%20129.svg')] bg-cover px-8 pb-16 lg:w-4/5">
                    <div className="relative z-10 mt-6 flex items-center justify-center ">
                      <div className="mx-12 flex w-3/5 flex-col items-center justify-center rounded-[20px] bg-white py-2 px-12">
                        <div>
                          <p className=" pb-12  text-center text-lg leading-relaxed text-gray-600">
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using this project.In
                            the first place we have granted to God, and by this our present charter confirmed
                            for us and our heirs forever that the English Church shall be free, and shall have
                            her rights entire, and her liberties inviolate; and we will that it be thus
                            observed; which is apparent from
                          </p>
                          <div className="flex flex-col items-center">
                            <img
                              className="mt-6 pb-4"
                              src="https://i.ibb.co/KwCJZR5/Ellipse-3-1.png"
                              alt="a student"
                            />
                            <h2 className="pb-2 text-xl font-semibold leading-tight text-gray-800">
                              Jane Doe
                            </h2>
                            <p className="text-base leading-none text-gray-600">Michigan University</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-16">
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                    </div>
                  </div>
                </div>
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
}
