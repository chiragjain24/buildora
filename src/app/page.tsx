"use client"
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [input, setInput] = useState("");
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onSuccess: (data) => {
      router.push(`/projects/${data.id}`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  }))

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4 justify-center">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <Button 
        disabled={createProject.isPending}
        onClick={() => createProject.mutate({ value: input })}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Page