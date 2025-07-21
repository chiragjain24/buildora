import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async ()=>{
      const sandbox = await Sandbox.create("buildora-9417679910")
      return sandbox.sandboxId;
    })
     // Create a new agent with a system prompt (you can add optional tools, too)
     const summarizer = createAgent({
      name: "summarizer",
      system: "You are an expert summarizer.  You summarize in 2 words",
      model: openai({ model: "gpt-4o-mini" }),
    });
    const { output } = await summarizer.run(
      `Summarize the following text: ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async ()=>{
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000);
      return `https://${host}`
    })
      
    console.log(output);
    return { output, sandboxUrl };
  },
);