"use client";
import { ArrowUpRightIcon, UserCircle2Icon } from "lucide-react";
import Link from "next/link";

import Discussion from "@/components/discussion";
import { EventCard } from "@/components/event-card";
import { PollFooter } from "@/components/poll/poll-footer";
import { PollHeader } from "@/components/poll/poll-header";
import { PollViewTracker } from "@/components/poll/poll-view-tracker";
import { ResponsiveResults } from "@/components/poll/responsive-results";
import { ScheduledEvent } from "@/components/poll/scheduled-event";
import { VotingForm } from "@/components/poll/voting-form";
import { Trans } from "@/components/trans";
import { useUser } from "@/components/user-provider";
import { usePoll } from "@/contexts/poll";

const GoToApp = () => {
  const poll = usePoll();
  const { ownsObject } = useUser();
  if (!ownsObject(poll)) {
    return null;
  }

  return (
    <div className="border-primary-200 bg-primary-50/75 rounded-lg border p-2.5 text-sm sm:p-1.5">
      <div className="flex items-start justify-between sm:items-center">
        <div className="flex gap-2.5 sm:items-center lg:px-2.5">
          <UserCircle2Icon className="text-primary-600 hidden size-4 sm:block" />
          <div className="flex grow flex-col gap-x-2.5 sm:flex-row">
            <h4 className="text-primary-600 font-medium">
              <Trans i18nKey="eventHostTitle" defaults="Manage Access" />
            </h4>
            <p className="text-primary-600/75">
              <Trans
                i18nKey="eventHostDescription"
                defaults="You are the creator of this poll"
              />
            </p>
          </div>
        </div>
        <Link
          className="text-primary-600 hover:bg-primary-200/50 active:bg-primary-200 inline-flex h-9 items-center gap-x-2.5 rounded-md px-3 font-medium"
          href={`/poll/${poll.id}`}
        >
          <Trans i18nKey="manage" />
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
};

export function InvitePage() {
  const poll = usePoll();

  return (
    <div>
      <PollViewTracker pollId={poll.id} />
      <PollHeader />
      <div className="p-3">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <GoToApp />
          <EventCard />
          <ScheduledEvent />
          <VotingForm>
            <ResponsiveResults />
          </VotingForm>
          <Discussion />
          <PollFooter />
        </div>
      </div>
    </div>
  );
}
