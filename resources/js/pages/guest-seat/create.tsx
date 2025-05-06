import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { GuestSeatForm } from './guest-seat-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Place',
        href: '/guest-seat',
    },

    {
        title: 'Création',
        href: '',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'un invité" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <GuestSeatForm seat={null} />
                </div>
            </div>
        </AppLayout>
    );
}
