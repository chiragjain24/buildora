"use client"
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

type Props = {}

const Page = (props: Props) => {
  const trpc = useTRPC();
  const [input, setInput] = useState("");
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success('Message Created')
    },
    onError: () => {
      toast.error('Message Creation Failed')
    }
  }))

  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions())

  return (
    <div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <Button onClick={() => createMessage.mutate({ value: input })}>
        Create Message
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  )
}

export default Page