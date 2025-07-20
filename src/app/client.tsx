"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
    const trpc = useTRPC();

    const { data, isLoading } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'I am a very long text' }))

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}