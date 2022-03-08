import { useRouter } from "next/router";

export default function Pricing() {
  const router = useRouter();
  return (
    <div className={"flex flex-col items-center py-0 text-center font-[fira-sans] text-[#272D67] md:py-24 "}>
      <div className={"font-[fira-sans] text-3xl font-bold md:text-4xl lg:text-5xl"}>
        You’re one step away from your dream school.
      </div>
      <div
        className={
          "mx-0 mt-5 flex w-full flex-col px-[20px] md:mt-10 md:flex-row md:px-[100px] lg:mt-24 lg:gap-x-2"
        }>
        <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
          <span className={"text-4xl"}>Astra</span>
          <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
            <div className={"flex flex-col items-center rounded-[20px] bg-[#FFEFED] p-4 text-center"}>
              <span className={"my-5 text-4xl font-bold"}>1 Expert Call</span>
              <span className={"my-5 text-2xl"}>This Month</span>
            </div>
            <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
              <span className={"mb-[80px] text-center text-5xl"}>$30.00</span>
              <button
                className={
                  "mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] font-bold text-white"
                }>
                Buy Now
              </button>
              <span className={"text-2xl italic"}>Billed Monthly</span>
            </div>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Introduce yourself to a coach</span>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Get a specific perspective</span>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Get a 101 on a professional track</span>
          </div>
        </div>
        <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
          <span className={"text-4xl"}>Sirius</span>
          <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
            <div className={"flex flex-col items-center rounded-[20px] bg-[#7C4DFF]/[0.16] p-4 text-center"}>
              <span className={"my-5 text-4xl font-bold"}>3 Expert Calls</span>
              <span className={"my-5 text-2xl"}>This Month</span>
            </div>
            <div className={"mt-[40px] mb-[30px] flex flex-col items-center  text-center"}>
              <span className={"mb-[80px] text-center text-5xl"}>$85.00</span>
              <button
                className={
                  "mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] font-bold text-white"
                }
                onClick={() => router.push("/payment/CollectPayment")}>
                Buy Now
              </button>
              <span className={"text-2xl italic"}>Billed Monthly</span>
            </div>
            <div className={"flex flex-col items-center rounded-[20px] bg-[#7C4DFF]/[0.16] p-0 text-center"}>
              <span className={"text-2xl"}>Best Value</span>
            </div>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Get feedback on your dream schools</span>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Get advice on an upcoming decision</span>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Get up to speed on a major</span>
          </div>
        </div>
        <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
          <span className={"text-4xl"}>Polaris</span>
          <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
            <div className={"flex flex-col items-center rounded-[20px] bg-[#FFEFED] p-4 text-center"}>
              <span className={"my-5 text-4xl font-bold"}>5 Expert Calls</span>
              <span className={"my-5 text-2xl"}>This Month</span>
            </div>
            <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
              <span className={"mb-[80px] text-center text-5xl"}>$140.00</span>
              <button
                className={
                  "mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] font-bold text-white"
                }>
                Buy Now
              </button>
              <span className={"text-2xl italic"}>Billed Monthly</span>
            </div>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Mix & match experts across schools</span>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Laser focus on 1-2 schools</span>
          </div>
          <div className={"flex flex-row items-center gap-x-[4px] px-2"}>
            <img src={"../image%2068.svg"} width={"40px"} height={"40px"} />
            <span className={"text-2xl"}>Get up to speed on a track</span>
          </div>
        </div>
      </div>
      <div className={"mt-24 mb-16 font-[fira-sans] text-3xl font-bold md:text-4xl lg:text-5xl"}>
        Want to see more from us? Let us know.
      </div>
      <div className={"mx-0 mb-8 flex w-full flex-col px-[20px] text-3xl lg:text-4xl "}>
        I’m interested in...(select all that apply)
      </div>
      <form className={"md:px-68 flex flex-col self-center px-0"}>
        <div className={"flex flex-row items-center gap-x-[8px] px-2"}>
          <input
            type="checkbox"
            id="feedback1"
            className={"h-[20px] w-[20px] md:h-[40px] md:w-[40px]"}
            value="Bike"
          />
          <span className={"text-2xl"}>Multi-month College 101 series</span>
        </div>

        <div className={"mt-5 flex flex-row items-center gap-x-[8px] px-2"}>
          <input
            type="checkbox"
            id="feedback1"
            className={"h-[20px] w-[20px] md:h-[40px] md:w-[40px]"}
            value="Bike"
          />
          <span className={"text-2xl"}>Multi-month Ivy League series</span>
        </div>
        <div className={"items-left mt-5 flex flex-row gap-x-[8px] px-2 md:items-center"}>
          <input
            type="checkbox"
            id="feedback1"
            className={"h-[20px] w-[20px] md:h-[40px] md:w-[40px]"}
            value="Bike"
          />
          <span className={"text-2xl"}>Multi-month College Application series </span>
        </div>
        <div className={" mt-5 flex flex-row items-center gap-x-[8px] px-2 text-left md:text-center"}>
          <input
            type="checkbox"
            id="feedback1"
            className={"h-[20px] w-[20px] md:h-[40px] md:w-[40px]"}
            value="Bike"
          />
          <span className={"text-2xl"}>Multi-month Around the Country series</span>
        </div>
        <div className={"mt-5 flex flex-row items-center gap-x-[8px] px-2 text-left md:text-center"}>
          <input
            type="checkbox"
            id="feedback1"
            className={"h-[20px] w-[20px] md:h-[40px] md:w-[40px]"}
            value="Bike"
          />
          <span className={"text-2xl"}>Multi-month Post-College-Decision series</span>
        </div>
        <div className={"mt-5 flex flex-row items-center gap-x-[8px] px-2"}>
          <input
            type="checkbox"
            id="feedback1"
            className={"h-[20px] w-[20px] md:h-[40px] md:w-[40px]"}
            value="Bike"
          />
          <span className={"text-2xl"}>AMA College Forums</span>
        </div>
        <div className={"mt-10 flex flex-col items-center text-center"}>
          <span className={"text-2xl"}>We’ll let you know when these launch.</span>
          <input type={"email"} className={"mt-5 min-w-[360px]"} placeholder={"Email"} />
          <input
            type={"submit"}
            className={
              "mt-5 mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] font-bold text-white"
            }
            value={"Submit"}
          />
        </div>
      </form>
    </div>
  );
}


