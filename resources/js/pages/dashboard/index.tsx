import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ChartStat } from './chart-stat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];

type DashboardProps = { countEvents: number; countGuests: number; countGuestSeats: number };

export default function Dashboard() {
    const { countEvents, countGuests, countGuestSeats } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-md border p-5">
                        <h2>{countEvents}</h2>
                        <p>évènement(s)</p>
                    </div>
                    <div className="rounded-md border p-5">
                        <h2>{countGuestSeats}</h2>
                        <p>places(s)</p>
                    </div>
                    <div className="rounded-md border p-5">
                        <h2>{countGuests}</h2>
                        <p>invité(s)</p>
                    </div>
                </div>
                <ChartStat />
            </div>
        </AppLayout>
    );
}
