'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import { Card, Flex, Heading } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

interface Issue {
  createdAt: string;
  updatedAt: string;
}

const prepareChartData = (issues: Issue[]) => {
  const createdCounts: Record<string, number> = {};
  const updatedCounts: Record<string, number> = {};

  issues.forEach((issue) => {
    const createdDate = new Date(issue.createdAt).toISOString().split('T')[0];
    const updatedDate = new Date(issue.updatedAt).toISOString().split('T')[0];

    createdCounts[createdDate] = (createdCounts[createdDate] || 0) + 1;
    updatedCounts[updatedDate] = (updatedCounts[updatedDate] || 0) + 1;
  });

  const uniqueDates = Array.from(new Set([...Object.keys(createdCounts), ...Object.keys(updatedCounts)]));
  const dates = uniqueDates.sort();

  const createdData = dates.map(date => createdCounts[date] || 0);
  const updatedData = dates.map(date => updatedCounts[date] || 0);

  return {
    labels: dates,
    datasets: [
      {
        label: 'Issues Created',
        data: createdData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Issues Updated',
        data: updatedData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
};


const IssueLineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ReturnType<typeof prepareChartData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const issues: Issue[] = await response.json();
        const preparedData = prepareChartData(issues);
        setChartData(preparedData);
      } catch (err) {
        setError("Unable to load issue statistics. Please try again later.");
        console.error("Error fetching issues data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <Skeleton height="30rem" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card>
      <Heading size='4' mb='5'>Issues Statistics</Heading>
      <Line
        data={chartData!}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Issues Over Time' },
          },
          scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Number of Issues' }, beginAtZero: true }
          }
        }}
      />
    </Card>
  );
};

export default IssueLineChart;
