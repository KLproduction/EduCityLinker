import { Gravity, MatterBody } from "@/components/ui/gravity";
import { cn } from "@/lib/utils";

function DragAndDrop({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "font-azeretMono relative z-0 flex h-full min-h-screen w-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="lg:text-12xl z-30 w-full pt-20 text-center text-6xl font-bold text-rose-500 sm:text-7xl md:text-8xl">
        <h4>AMIO</h4>
      </div>
      <p className="z-30 w-full pt-4 text-center text-base font-bold text-zinc-800 sm:text-xl md:text-2xl lg:text-3xl">
        Your course adviser
      </p>
      <Gravity gravity={{ x: 0, y: 1 }} className="h-full w-full">
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="30%"
          y="10%"
          angle={10}
        >
          <div className="text-md rounded-full bg-[#0015ff] px-4 py-2 text-white hover:cursor-pointer">
            FLEXIBLE STUDY
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="50%"
          y="30%"
          angle={-5}
        >
          <div className="text-md rounded-full bg-[#E794DA] px-4 py-2 text-white hover:cursor-grab">
            SUMMER EXCHANGE
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="40%"
          y="20%"
          angle={20}
        >
          <div className="text-md rounded-full bg-[#1f464d] px-4 py-2 text-white hover:cursor-grab">
            ENGLISH COURSE
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="75%"
          y="10%"
        >
          <div className="text-md rounded-full bg-[#ff5941] px-4 py-2 text-white hover:cursor-grab">
            SKILLED TEACHERS
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="80%"
          y="20%"
          angle={45}
        >
          <div className="text-md rounded-full bg-orange-500 px-4 py-2 text-white hover:cursor-grab">
            DISCOVER UK
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="50%"
          y="10%"
          angle={-30}
        >
          <div className="text-md rounded-full bg-[#ffd726] px-4 py-2 text-white hover:cursor-grab">
            ALL AGE GROUPS
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
}

export default DragAndDrop;
