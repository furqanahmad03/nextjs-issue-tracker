'use client';

import { Card } from '@radix-ui/themes';
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface Props {
  issueCount: {
    open: number,
    inProgress: number,
    closed: number
  }
};

const IssuePieChart = ({ issueCount: { open, inProgress, closed } }: Props) => {
  const data = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        label: 'Issues Statuses',
        data: [open, inProgress, closed],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Issues by Status',
      },
    },
  };

  return (
    <Card>
      <Pie data={data} options={options} />
    </Card>
  )
};

export default IssuePieChart;
