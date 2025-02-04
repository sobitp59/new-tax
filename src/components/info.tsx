import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

export default function Info({content} : {content: string}) {
    return (
        <TooltipProvider>
        <Tooltip >
          <TooltipTrigger asChild className="cursor-pointer">
            {/* <Button variant="outline">i</Button> */}
        <InfoIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent sideOffset={4} className="z-50 overflow-hidden w-[300px] rounded-md border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      )
}