import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
export default function IndexPage() {
  return (
    <div className=" 2xl:container mx-auto">
    <div className="my-0 mx-16 h-[auto] items-center overflow-hidden rounded-[20px] bg-[#FFEFED] text-center">
      <h3
        role="heading"
        className="text-2xl mt-12 mb-6 font-bold leading-6 text-[#272D67] xl:text-4xl xl:leading-10 font-[Raleway]">
        What Mentors Are Saying About Northstarre
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
                <div className="w-[100%] flex justify-center">
                  <div className="w-[100%] pt-18 relative items-center bg-[url('/assets/Group%20129.svg')] bg-contain bg-no-repeat bg-center px-8 pb-4">
                    <div className="relative z-10 mt-6 flex items-center justify-center ">
                      <div className="mx-auto flex flex-col items-center justify-center max-w-[633px]">
                        <div>
                          <p className=" text-center text-xl leading-6 text-[#272D67] font-[Raleway] font-normal rounded-[12px] bg-white p-6">
                            “I knew I wanted to be a pre-med student in high school but was unsure of so many things. What should I major in: engineering or a traditional science? How do I prepare for the pre-med track as a freshman? What university should I attend? Do extra curricular activites matter? Do I set myself apart by minoring in something outside of traditional sciences? How should I spend my summers?
                            <br></br>
                            <br></br>
                            I wish I had Northstarre in high school. I had to navigate these questions without a structured support system. I’m the first doctor in our family, and my parents tried their best to help me figure it all out. It would have been helpful to talk someone who had been in my shoes.”
                          </p>
                          <span className="inline-block border-t-[50px] border-r-[30px] border-l-[30px] border-solid border-l-[transparent] border-r-[transparent] border-t-[#fff]"></span>
                          <div className="flex flex-col items-center">
                            <img
                              className="mt-6 pb-4"
                              src="https://i.ibb.co/KwCJZR5/Ellipse-3-1.png"
                              alt="a student"
                            />
                            <h2 className="pb-2 text-2xl font-medium leading-[28px] text-[#000]">
                              Jane Doe
                            </h2>
                            <p className="text-2xl text-[#000] hidden">Michigan University</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-16 hidden">
                      <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide index={1}>
                <div className="w-[100%] flex justify-center 2xl:container">
                  <div className="w-[100%] pt-18 relative items-center bg-[url('/assets/Group%20129.svg')] bg-contain bg-no-repeat bg-center px-8 pb-4">
                    <div className="relative z-10 mt-6 flex items-center justify-center ">
                      <div className="mx-auto flex flex-col items-center justify-center max-w-[633px]">
                        <div>
                          <p className=" text-center text-xl leading-6 text-[#272D67] font-[Raleway] font-normal rounded-[12px] bg-white p-6">
                          “I knew I wanted to be a pre-med student in high school but was unsure of so many things. What should I major in: engineering or a traditional science? How do I prepare for the pre-med track as a freshman? What university should I attend? Do extra curricular activites matter? Do I set myself apart by minoring in something outside of traditional sciences? How should I spend my summers?
                            <br></br>
                            <br></br>
                            I wish I had Northstarre in high school. I had to navigate these questions without a structured support system. I’m the first doctor in our family, and my parents tried their best to help me figure it all out. It would have been helpful to talk someone who had been in my shoes.”
                          </p>
                          <span className="inline-block border-t-[50px] border-r-[30px] border-l-[30px] border-solid border-l-[transparent] border-r-[transparent] border-t-[#fff]"></span>
                          <div className="flex flex-col items-center">
                            <img
                              className="mt-6 pb-4"
                              src="https://i.ibb.co/KwCJZR5/Ellipse-3-1.png"
                              alt="a student"
                            />
                            <h2 className="pb-2 text-2xl font-medium leading-[28px] text-[#000]">
                              Jane Doe
                            </h2>
                            <p className="text-2xl text-[#000] hidden">Michigan University</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-16 hidden">
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                      <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide index={2}>
                <div className="w-[100%] flex justify-center 2xl:container">
                  <div className="w-[100%] pt-18 relative items-center bg-[url('/assets/Group%20129.svg')] bg-contain bg-no-repeat bg-center px-8 pb-4">
                    <div className="relative z-10 mt-6 flex items-center justify-center ">
                      <div className="mx-auto flex flex-col items-center justify-center max-w-[633px]">
                        <div>
                          <p className=" text-center text-xl leading-6 text-[#272D67] font-[Raleway] font-normal rounded-[12px] bg-white p-6">
                            “I knew I wanted to be a pre-med student in high school but was unsure of so many things. What should I major in: engineering or a traditional science? How do I prepare for the pre-med track as a freshman? What university should I attend? Do extra curricular activites matter? Do I set myself apart by minoring in something outside of traditional sciences? How should I spend my summers?
                            <br></br>
                            <br></br>
                            I wish I had Northstarre in high school. I had to navigate these questions without a structured support system. I’m the first doctor in our family, and my parents tried their best to help me figure it all out. It would have been helpful to talk someone who had been in my shoes.”
                          </p>
                          <span className="inline-block border-t-[50px] border-r-[30px] border-l-[30px] border-solid border-l-[transparent] border-r-[transparent] border-t-[#fff]"></span>
                          <div className="flex flex-col items-center">
                            <img
                              className="mt-6 pb-4"
                              src="https://i.ibb.co/KwCJZR5/Ellipse-3-1.png"
                              alt="a student"
                            />
                            <h2 className="pb-2 text-2xl font-medium leading-[28px] text-[#000]">
                              Jane Doe
                            </h2>
                            <p className="text-2xl text-[#000] hidden">Michigan University</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 pt-16 hidden">
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
    </div>
  );
}
