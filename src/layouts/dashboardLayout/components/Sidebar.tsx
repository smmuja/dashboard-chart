import { Button, IconLink } from "@/components/base";
import Link from "next/link";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoCubeOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { PiNotePencilLight } from "react-icons/pi";
import { RiHome6Line } from "react-icons/ri";
import { SlSettings } from "react-icons/sl";

export function Sidebar() {
  return (
    <>
      <div className="w-96 p-5 border rounded-xl bg-gradient-to-l from-violet-200 via-violet-100 to-gray-100 ">
        <Link className="text-3xl" href="/">
          Creativeans
        </Link>

        <div className="flex flex-col justify-evenly h-screen">
          <div>
            <h2>Overview</h2>
            <IconLink label="Dashboard">
              <RiHome6Line />
            </IconLink>

            <IconLink label="Cracker">
              <IoCubeOutline />
            </IconLink>

            <IconLink label="Tracker">
              <PiNotePencilLight />
            </IconLink>
          </div>

          <div>
            <h2>Others</h2>
            <IconLink label="Settings">
              <SlSettings />
            </IconLink>
            <IconLink label="Support">
              <AiOutlineQuestionCircle />
            </IconLink>
          </div>

          <div className="p-3 m-3 rounded-xl bg-white">
            <h2 className="text-3xl mb-5">
              Level up your <br />
              cracker to the <br /> next level
            </h2>
            <p className="text-gray-500">US $39/month ~</p>

            <div className="p-3">
              <Button width="full">
                Add Cracker <GoPlus />
              </Button>
              <Button width="full" color="indigo">
                Upgrade to Enterprise <MdArrowOutward />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
