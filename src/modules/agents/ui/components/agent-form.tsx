import { z } from "zod";
import { AgentGetOne } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentInsertSchema } from "@/modules/agents/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AgentFormProps {
  onSucess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSucess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  // const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        // invalidate free tier usage todo
        onSucess?.();
      },
      onError: (error) => {
        toast.error(error.message); //todo check if error code is forbidden redirect to upgrade
      },
    })
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSucess?.();
      },
      onError: (error) => {
        toast.error(error.message); //todo check if error code is forbidden redirect to upgrade
      },
    })
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({ ...values, id: initialValues.id });
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-xl border-2 border-amber-200 shadow-lg backdrop-blur-sm">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <GeneratedAvatar
              seed={form.watch("name")}
              variant="botttsNeutral"
              className="border-2 border-amber-300 size-16 rounded-full shadow-md ring-2 ring-amber-200/50"
            />
          </div>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900 font-semibold tracking-tight">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Physicist"
                    className="border-2 border-amber-200 bg-amber-50/30 text-amber-900 placeholder:text-amber-600/70 focus:border-amber-400 focus:ring-amber-300/50 transition-all duration-300 rounded-lg h-11 shadow-sm"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-900 font-semibold tracking-tight">
                  Instructions
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="You are a helpful physicist that can help with late night research work."
                    className="border-2 border-amber-200 bg-amber-50/30 text-amber-900 placeholder:text-amber-600/70 focus:border-amber-400 focus:ring-amber-300/50 transition-all duration-300 rounded-lg min-h-[100px] shadow-sm resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-3 pt-4">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}
                className="bg-amber-50/50 border-2 border-amber-200 text-amber-800 hover:bg-amber-100 hover:border-amber-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 font-medium tracking-tight"
              >
                Cancel
              </Button>
            )}
            <Button
              disabled={isPending}
              type="submit"
              className="bg-gradient-to-r from-amber-400 to-orange-400 border-2 border-amber-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 hover:border-amber-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md rounded-xl h-11 px-6 tracking-tight ml-auto"
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
