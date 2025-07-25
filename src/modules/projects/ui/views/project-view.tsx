"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
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

interface Props {
    projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
    const trpc = useTRPC();
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);

    const { data: project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({
        id: projectId,
    }));

    return (
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
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

                <ResizableHandle withHandle />

                <ResizablePanel 
                    defaultSize={65}
                    minSize={50}
                    className="flex flex-col min-h-0"
                >
                    {!!activeFragment && <FragmentWeb data={activeFragment} />}
                    <ResizableHandle />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}