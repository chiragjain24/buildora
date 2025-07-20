"use client"
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

type Props = {}

const Page = (props: Props) => {
  const trpc = useTRPC();
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
      page
      <Button onClick={() => invoke.mutate({ text: 'world' })}>
        Invole Job
      </Button>
    </div>
  )
}

export default Page