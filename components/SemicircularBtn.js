"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname, useSearchParams } from "next/navigation";


export function SemicircularBtn({ btnLink, isActive, collapsed, label, Icon, onClick }) {

  const [ activeTab, setActiveTab ] = useState(isActive);
  // const options = menuOptions[role] || [];
  const pathname = usePathname(); // Get current path
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  // console.log("isActive", isActive)

    // console.log("collapsed", collapsed)
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full rounded-l-none rounded-r-full pl-6 justify-start gap-4  py-6",
        isActive && "bg-black hover:bg-black-700", collapsed ? " hover:bg-primary":"hover:bg-black hover:text-white pl-4",
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-6 w-6", isActive && "text-[#A0D195]")} />
      <Link href={`${btnLink}?tab=${currentTab}`} className={cn("font-medium text-md", isActive && "text-[#A0D195]")}>
        {label}
      </Link>
    </Button>
  )
}