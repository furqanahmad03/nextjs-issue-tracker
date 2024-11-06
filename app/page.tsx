import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import IssuePieChart from "./IssuePieChart";
import IssueLineChart from "./IssueLineChart";
import { Metadata } from "next";


export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  const issueCount = {
    open: open,
    inProgress: inProgress,
    closed: closed
  };

  return (
    <Flex direction='column' gap='5'>
      <Grid columns={{ initial: '1', md: '2' }} gap='5'>
        <Flex direction='column' gap='5'>
          <IssueSummary issueCount={issueCount} />
          <IssueChart issueCounts={issueCount} />
        </Flex>
        <LatestIssues />
      </Grid>
      <Grid columns={{ initial: '1', md: '2' }} gap='5'>
        <IssuePieChart issueCount={issueCount} />
        <IssueLineChart />
      </Grid>
    </Flex>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};
