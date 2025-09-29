'use client';

import { type JSX } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const stats = [
  {
    title: 'Total Employee',
    value: 313,
    change: '+10%',
    note: 'Than Last Year',
  },
  {
    title: 'On Leave Employee',
    value: 55,
    change: '+2.15%',
    note: 'Than Last Month',
  },
  {
    title: 'Total Project',
    value: 313,
    change: '+5.15%',
    note: 'Than Last Month',
  },
  {
    title: 'Compleat Project',
    value: 150,
    change: '-5.5%',
    note: 'Than Last Month',
  },
  {
    title: 'Total Client',
    value: 151,
    change: '+2.15%',
    note: 'Than Last Month',
  },
  {
    title: 'Total Revenue',
    value: '$55',
    change: '+2.15%',
    note: 'Than Last Month',
  },
  {
    title: 'Total Jobs',
    value: 55,
    change: '+2.15%',
    note: 'Than Last Month',
  },
  {
    title: 'Total Ticket',
    value: 55,
    change: '+2.15%',
    note: 'Than Last Month',
  },
];
const meetings = [
  { title: 'Project Kickoff', date: 'June 1, 2024', time: '10:00 AM' },
  { title: 'Weekly Team Sync', date: 'June 5, 2024', time: '02:00 PM' },
  { title: 'Client Presentation', date: 'June 10, 2024', time: '11:00 AM' },
  { title: 'Monthly Review', date: 'June 15, 2024', time: '03:00 PM' },
  { title: 'Weekly Review', date: 'June 20, 2024', time: '11:00 AM' },
  { title: 'Yearly Meeting', date: 'June 22, 2024', time: '09:00 AM' },
  { title: 'Strategy Planning', date: 'June 28, 2024', time: '02:00 PM' },
];

const HrmDashboard = (): JSX.Element => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`text-sm ${
                  stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {stat.change} <span className="text-muted-foreground">{stat.note}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Meeting Schedule</h2>
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow className="text-left border-b">
                  <TableHead className="py-2">Meeting Title</TableHead>
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Meeting Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.map((meeting, index) => (
                  <TableRow key={index} className="border-b last:border-0 text-lg">
                    <TableHead className="py-2">{meeting.title}</TableHead>
                    <TableHead>{meeting.date}</TableHead>
                    <TableHead>{meeting.time}</TableHead>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HrmDashboard;
