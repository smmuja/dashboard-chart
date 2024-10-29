import { Button, IconLink } from "@/components/base";
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
      <div className="w-96 p-5 border rounded-xl bg-blue-50 ">
        <h1 className="text-3xl">Creativeans</h1>

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
              <Button>
                Add Cracker <GoPlus />
              </Button>
              <Button color="indigo">
                Upgrade to Enterprise <MdArrowOutward />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
