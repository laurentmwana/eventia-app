import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { EventModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { EventForm } from './event-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evènements',
        href: '/event',
    },

    {
        title: 'Editer un évènenement',
        href: '',
    },
];

type EditProps = { event: EventModel };

export default function Edit() {
    const { event } = usePage<EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Evènement #${event.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <EventForm event={event} />
                </div>
            </div>
        </AppLayout>
    );
}
