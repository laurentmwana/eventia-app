import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { GuestSeatModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { GuestSeatForm } from './guest-seat-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Places',
        href: '/guest-seat',
    },

    {
        title: 'Editer une place',
        href: '',
    },
];

type EditProps = { guestSeat: GuestSeatModel };

export default function Edit() {
    const { guestSeat } = usePage<EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Place #${guestSeat.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <GuestSeatForm seat={guestSeat} />
                </div>
            </div>
        </AppLayout>
    );
}
