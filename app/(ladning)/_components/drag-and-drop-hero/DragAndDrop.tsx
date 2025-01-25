import { Gravity, MatterBody } from "@/components/ui/gravity";
import { cn } from "@/lib/utils";

function DragAndDrop({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "font-azeretMono relative z-[999] flex h-full min-h-screen w-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="font-calendas lg:text-12xl z-30 w-full pt-20 text-center text-6xl font-bold italic text-red-500 sm:text-7xl md:text-8xl">
        <h2>AMIO</h2>
      </div>
      <p className="z-30 w-full pt-4 text-center text-base font-bold text-zinc-50 sm:text-xl md:text-2xl lg:text-3xl">
        Your course adviser
      </p>
      <Gravity gravity={{ x: 0, y: 1 }} className="h-full w-full">
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="30%"
          y="10%"
          angle={10}
        >
          <div className="rounded-full bg-[#0015ff] px-8 py-4 text-xl text-white hover:cursor-pointer sm:text-2xl md:text-3xl">
            Flexible Study
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="50%"
          y="30%"
          angle={-5}
        >
          <div className="rounded-full bg-[#E794DA] px-8 py-4 text-xl text-white hover:cursor-grab sm:text-2xl md:text-3xl">
            Interactive Lessons
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="40%"
          y="20%"
          angle={20}
        >
          <div className="rounded-full bg-[#1f464d] px-8 py-4 text-xl text-white hover:cursor-grab sm:text-2xl md:text-3xl">
            Personalized Learning
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="75%"
          y="10%"
        >
          <div className="[#E794DA] rounded-full bg-[#ff5941] px-8 py-4 text-xl text-white hover:cursor-grab sm:text-2xl md:text-3xl">
            Progress Tracking
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="80%"
          y="20%"
          angle={45}
        >
          <div className="[#E794DA] rounded-full bg-orange-500 px-8 py-4 text-xl text-white hover:cursor-grab sm:text-2xl md:text-3xl">
            Community Engagement
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="50%"
          y="10%"
          angle={-30}
        >
          <div className="[#E794DA] rounded-full bg-[#ffd726] px-8 py-4 text-xl text-white hover:cursor-grab sm:text-2xl md:text-3xl">
            All Age Groups
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
}

export default DragAndDrop;
