import Image from "next/image";
import { Button } from "@/components";
import { formatDateDay } from "@/utils";
import { FaCrown } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { lemonImage, userDummyImage } from "@/assets";

export function DashboardHeader() {
  const currentDate = new Date();
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-indigo-400 text-xl font-semibold mb-5">
            Dashboard
          </h2>
          <div className="flex flex-row gap-3 my-10 items-center">
            <Image src={lemonImage} alt="Lemon image" className="w-20" />
            <div>
              <p className="text-sm text-gray-400">
                ABC Cracker &gt; Lemon Cracker
              </p>
              <p className="font-medium text-xl flex flex-row gap-3">
                Lemon Cracker <IoMdArrowDropdown />
              </p>
            </div>
          </div>
          {/* <div className="my-3">
            <p className="text-sm font-medium text-gray-700">
              Here will be some text
            </p>
          </div> */}
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <Button color="grayBlack" radius="roundedFull">
            <span className="text-xs">{formatDateDay(currentDate)}</span>
          </Button>
          <Button color="grayBlack" radius="roundedFull">
            <IoMdNotificationsOutline className="text-xl" />
          </Button>

          <div className="bg-white border border-gray-200 rounded-full flex flex-row items-center hover:bg-gray-200 hover:cursor-pointer">
            <Image
              src={userDummyImage}
              alt="user dummy"
              className="rounded-full size-10"
            />
            <div className="mx-3 px-1">
              <p className="text-sm">User</p>
              <p className="text-gray-400 text-sm">Username</p>
            </div>
          </div>

          <Button color="grayBlack" radius="roundedFull">
            <FaCrown /> Pro plan
          </Button>
        </div>
      </div>
    </>
  );
}
