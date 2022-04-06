import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import Avatar from "@components/Avatar";
export default function IndexPage() {
  return (
    <div className="container mx-auto">
      <div className="my-0 mx-[auto] h-[auto] items-center overflow-hidden rounded-[20px] bg-[#FFEFED] text-center md:mx-16">
        <h3
          role="heading"
          className="mt-12 mb-6 px-4 font-[Raleway] text-2xl font-bold leading-6 text-[#272D67] xl:text-4xl xl:leading-10">
          What Mentors Are Saying About Northstarre
        </h3>
        <div className="flex items-center justify-center">
          <div className="relative w-full">
            <CarouselProvider
              naturalSlideWidth={0}
              naturalSlideHeight={125}
              totalSlides={3}
              infinite={true}
              interval={3000}
              isPlaying={true}
              playDirection={"forward"}
              isIntrinsicHeight={true}>
              <Slider>
                <Slide index={0}>
                  <div className="flex w-[100%] justify-center">
                    <div className="pt-18 relative w-[100%] items-center bg-[url('/assets/Group%20129.svg')] bg-contain bg-center bg-no-repeat px-8 pb-4">
                      <div className="relative z-10 mt-6 flex items-center justify-center ">
                        <div className="mx-auto flex max-w-[633px] flex-col items-center justify-center">
                          <div>
                            <p className=" rounded-[12px] bg-white p-6 text-center font-[Raleway] text-xl font-normal leading-6 text-[#272D67]">
                              “I knew I wanted to be a pre-med student in high school but was unsure of so
                              many things. What should I major in: engineering or a traditional science?
                              <br />I wish I had Northstarre in high school. I had to navigate these questions
                              without a structured support system. I’m the first doctor in our family, and my
                              parents tried their best to help me figure it all out. It would have been
                              helpful to talk someone who had been in my shoes.”
                            </p>
                            <span className="inline-block border-t-[50px] border-r-[30px] border-l-[30px] border-solid border-l-[transparent] border-r-[transparent] border-t-[#fff]"></span>
                            <div className="flex flex-col items-center">
                              <img
                                className={"h-[136px] w-[140px] rounded-full object-cover"}
                                src={`/assets/monica.jpg`}
                                alt={"monica"}
                              />
                              <h2 className="mt-2 pb-2 text-2xl font-medium leading-[28px] text-[#000]">
                                Monica
                              </h2>
                              <p className="hidden text-2xl text-[#000]">Michigan University</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex hidden justify-center gap-2 pt-16">
                        <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                        <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                        <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </Slide>
                <Slide index={1}>
                  <div className="flex w-[100%] justify-center 2xl:container">
                    <div className="pt-18 relative w-[100%] items-center bg-[url('/assets/Group%20129.svg')] bg-contain bg-center bg-no-repeat px-8 pb-4">
                      <div className="relative z-10 mt-6 flex items-center justify-center ">
                        <div className="mx-auto flex max-w-[633px] flex-col items-center justify-center">
                          <div>
                            <p className=" rounded-[12px] bg-white p-6 text-center font-[Raleway] text-xl font-normal leading-6 text-[#272D67]">
                              I was determined to pursue a degree in marketing and finance, but I had no idea
                              what school to do it at. What campus would I enjoy the most? What city suits me
                              the best? Do I want a small school or a big school?
                              <br></br>
                              <br></br> Having Northstarre in high school would have helped me with these
                              questions. I would have been able to talk to successful students from different
                              universities countrywide who have each experienced what life is like at their
                              campus.
                            </p>
                            <span className="inline-block border-t-[50px] border-r-[30px] border-l-[30px] border-solid border-l-[transparent] border-r-[transparent] border-t-[#fff]"></span>
                            <div className="flex flex-col items-center">
                              <img
                                className={"h-[136px] w-[140px] rounded-full object-cover"}
                                src={`/assets/kenaiD.png`}
                                alt={"Kenai"}
                              />
                              <h2 className="mt-2 pb-2 text-2xl font-medium leading-[28px] text-[#000]">
                                Kenai
                              </h2>
                              <p className="hidden text-2xl text-[#000]">University of Washington</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex hidden justify-center gap-2 pt-16">
                        <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                        <div className=" h-4 w-4 rounded-full border-2 border-gray-300 bg-indigo-700"></div>
                        <div className=" h-4 w-4 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </Slide>
                <Slide index={2}>
                  <div className="flex w-[100%] justify-center 2xl:container">
                    <div className="pt-18 relative w-[100%] items-center bg-[url('/assets/Group%20129.svg')] bg-contain bg-center bg-no-repeat px-8 pb-4">
                      <div className="relative z-10 mt-6 flex items-center justify-center ">
                        <div className="mx-auto flex max-w-[633px] flex-col items-center justify-center">
                          <div>
                            <p className=" rounded-[12px] bg-white p-6 text-center font-[Raleway] text-xl font-normal leading-6 text-[#272D67]">
                              "I didn&#39;t know a lot of things in high school and even in the early years of
                              college. I tripped into information by joining clubs somewhat blindly and I
                              wished there was a more structured way to absorb this information.I think
                              that&#39;s what we hope to do as mentors on Northstarre -- give back to high
                              schoolers that are just like us."
                              <br></br>
                              <br></br>
                            </p>
                            <span className="inline-block border-t-[50px] border-r-[30px] border-l-[30px] border-solid border-l-[transparent] border-r-[transparent] border-t-[#fff]"></span>
                            <div className="flex flex-col items-center">
                              <div className={"h-[136px] w-[140px] rounded-full"}>
                                <img
                                  className={"h-[136px] w-[140px] rounded-full object-cover"}
                                  src={`/assets/IshaD.png`}
                                  alt={"Isha"}
                                />
                              </div>
                              <h2 className="mt-2 pb-2 text-2xl font-medium leading-[28px] text-[#000]">
                                Isha
                              </h2>
                              <p className="hidden text-2xl text-[#000]">University of Illinois</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex hidden justify-center gap-2 pt-16">
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
