import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { AssignmentModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { AssignmentForm } from './assignment-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Affectation',
        href: '/assignment',
    },

    {
        title: 'Editer une affictation',
        href: '',
    },
];

type EditProps = { assignment: AssignmentModel };

export default function Edit() {
    const { assignment } = usePage<EditProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Affectation #${assignment.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <AssignmentForm assignment={assignment} />
                </div>
            </div>
        </AppLayout>
    );
}
