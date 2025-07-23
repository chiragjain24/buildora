"use client"
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

type Props = {}

const Page = (props: Props) => {
  const trpc = useTRPC();
  const [input, setInput] = useState("");
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success('Job Invoked')
    },
    onError: () => {
      toast.error('Job Invoked')
    }
  }))

  return (
    <div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <Button onClick={() => invoke.mutate({ text: input })}>
        Invoke Job
      </Button>
    </div>
  )
}

export default Page