import { z } from "zod";
import { MeetingGetOne } from "@/modules/meetings/types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSucess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSucess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();
  // const router = useRouter();
  const queryClient = useQueryClient();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        // invalidate free tier usage todo
        onSucess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message); //todo check if error code is forbidden redirect to upgrade
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSucess?.();
      },
      onError: (error) => {
        toast.error(error.message); //todo check if error code is forbidden redirect to upgrade
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agent_id ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
        className="[&_.dialog-content]:bg-gradient-to-br [&_.dialog-content]:from-amber-50/95 [&_.dialog-content]:to-orange-50/95 [&_.dialog-content]:border-2 [&_.dialog-content]:border-amber-200 [&_.dialog-content]:shadow-2xl [&_.dialog-content]:backdrop-blur-sm [&_.dialog-overlay]:bg-amber-900/20 [&_.dialog-title]:text-amber-900 [&_.dialog-description]:text-amber-700 [&_input]:border-2 [&_input]:border-amber-200 [&_input]:bg-amber-50/30 [&_input]:text-amber-900 [&_input]:placeholder:text-amber-600/70 [&_input:focus]:border-amber-400 [&_input:focus]:ring-amber-300/50 [&_button[type=submit]]:bg-gradient-to-r [&_button[type=submit]]:from-amber-400 [&_button[type=submit]]:to-orange-400 [&_button[type=submit]]:border-2 [&_button[type=submit]]:border-amber-400 [&_button[type=submit]]:text-white [&_button[type=submit]]:font-semibold [&_button[type=submit]:hover]:from-amber-500 [&_button[type=submit]:hover]:to-orange-500 [&_button[type=submit]:hover]:border-amber-500 [&_button[type=submit]:hover]:shadow-lg [&_button[type=submit]:hover]:scale-[1.02] [&_button[type=submit]]:transition-all [&_button[type=submit]]:duration-300 [&_button[type=submit]]:shadow-md [&_button[type=submit]]:rounded-xl [&_button[variant=ghost]]:bg-amber-50/50 [&_button[variant=ghost]]:border-2 [&_button[variant=ghost]]:border-amber-200 [&_button[variant=ghost]]:text-amber-800 [&_button[variant=ghost]:hover]:bg-amber-100 [&_button[variant=ghost]:hover]:border-amber-300 [&_button[variant=ghost]:hover]:shadow-lg [&_button[variant=ghost]:hover]:scale-[1.02] [&_button[variant=ghost]]:transition-all [&_button[variant=ghost]]:duration-300 [&_button[variant=ghost]]:shadow-md [&_button[variant=ghost]]:rounded-xl [&_label]:text-amber-900 [&_label]:font-semibold [&_label]:tracking-tight [&_.form-message]:text-red-600"
      />
      <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-6 rounded-xl border-2 border-amber-200 shadow-lg backdrop-blur-sm">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                      placeholder="e.g. Physics Consultations"
                      className="border-2 border-amber-200 bg-amber-50/30 text-amber-900 placeholder:text-amber-600/70 focus:border-amber-400 focus:ring-amber-300/50 transition-all duration-300 rounded-lg h-11 shadow-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              name="agentId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-amber-900 font-semibold tracking-tight">
                    Agent
                  </FormLabel>
                  <FormControl>
                    <CommandSelect
                      options={(agents.data?.items ?? []).map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-x-2">
                            <GeneratedAvatar
                              seed={agent.name}
                              variant="botttsNeutral"
                              className="border size-6"
                            />
                            <span>{agent.name}</span>
                          </div>
                        ),
                      }))}
                      onSelect={field.onChange}
                      onSearch={setAgentSearch}
                      value={field.value}
                      placeholder="Select an agent"
                    />
                  </FormControl>
                  <FormDescription>
                    Not found what you&apos;re looking for?{" "}
                    <button
                      type="button"
                      className="text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-200 font-medium"
                      onClick={() => setOpenNewAgentDialog(true)}
                    >
                      Create new agent
                    </button>
                  </FormDescription>
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
    </>
  );
};
