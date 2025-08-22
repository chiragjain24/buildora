"use client";

// import { useTRPC } from "@/trpc/client";
// import { useSuspenseQuery } from "@tanstack/react-query";
import { 
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessagesContainer } from "../components/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@prisma/client";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";

interface Props {
    projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
    // const trpc = useTRPC();
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");

    // const { data: project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({
    //     id: projectId,
    // }));

    return (
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={30}
                    minSize={20}
                    className="flex flex-col min-h-0"
                >
                    <Suspense fallback={<div>Loading project...</div>}>
                        <ProjectHeader projectId={projectId} />
                    </Suspense>
                    <Suspense fallback={<div>Loading messages...</div>}>
                        <MessagesContainer 
                            projectId={projectId} 
                            activeFragment={activeFragment}
                            setActiveFragment={setActiveFragment}
                        />
                    </Suspense>
                </ResizablePanel>

                <ResizableHandle className="hover:bg-primary transition-colors"/>

                <ResizablePanel 
                    defaultSize={70}
                    minSize={50}
                    className="flex flex-col min-h-0"
                >
                    <Tabs
                        className="h-full gap-y-0"
                        defaultValue="preview"
                        value={tabState}
                        onValueChange={(value) => setTabState(value as "preview" | "code")}
                    >
                        <div className="w-full flex items-center p-2 border-b gap-x-2">
                            <TabsList className="h-8 p-0 border rounded-md">
                                <TabsTrigger value="preview" className="rounded-md">
                                    <EyeIcon className="size-4" />
                                    Preview
                                </TabsTrigger>
                                <TabsTrigger value="code">
                                    <CodeIcon className="size-4" />
                                    Code
                                </TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-x-2">
                                <Button asChild size="sm" variant="tertiary">
                                    <Link href={`/pricing`}>
                                        <CrownIcon className="size-4" />
                                        Upgrade
                                    </Link>
                                </Button>
                                <UserControl />
                            </div>
                        </div>
                        <TabsContent value="preview">
                            {!!activeFragment && <FragmentWeb data={activeFragment} />}
                        </TabsContent>
                        <TabsContent value="code" className="min-h-0">
                            {!!activeFragment && (
                                <FileExplorer
                                     files={activeFragment.files as { [path: string]: string }}
                                 />
                            )}
                        </TabsContent>
                    </Tabs>
                    <ResizableHandle />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}