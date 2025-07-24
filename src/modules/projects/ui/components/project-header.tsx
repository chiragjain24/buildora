import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ChevronDownIcon, ChevronLeftIcon, SunIcon, MoonIcon, SunMoonIcon, MonitorIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface Props {
    projectId: string;
}

export const ProjectHeader = ({ projectId }: Props) => {
    const trpc = useTRPC();
    const { data: project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({
        id: projectId,
    }));

    const { setTheme, theme } = useTheme();

    return (
        <header className="flex items-center justify-between p-2 border-b">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm"
                    className = "focus-visible:ring-0 hover:bg-transparent hover:opactiy-75 transition-opacity pl-2!"
                    >
                        <Image src="/next.svg" alt="Buildora" width={18} height={18} />
                        <span className="text-sm font-medium">{project.name}</span>
                        <ChevronDownIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start" side="bottom">
                    <DropdownMenuItem asChild>
                        <Link href={`/`}>
                            <ChevronLeftIcon />
                            <span>
                                Go to Dashboard
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <SunMoonIcon className="size-4 text-muted-foreground" />
                            <span>Appearance</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value)}>
                                    <DropdownMenuRadioItem value="light">
                                        <SunIcon className="size-4 text-muted-foreground" />
                                        <span>Light</span>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="dark">
                                        <MoonIcon className="size-4 text-muted-foreground" />
                                        <span>Dark</span>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="system">
                                        <MonitorIcon className="size-4 text-muted-foreground" />
                                        <span>System</span>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>

                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}