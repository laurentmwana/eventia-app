import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { GuestModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { GuestForm } from './guest-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invités',
        href: '/guest',
    },

    {
        title: 'Editer un invité',
        href: '',
    },
];

type EditProps = { guest: GuestModel };

export default function Edit() {
    const { guest } = usePage<EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Evènement #${guest.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <GuestForm guest={guest} />
                </div>
            </div>
        </AppLayout>
    );
}
