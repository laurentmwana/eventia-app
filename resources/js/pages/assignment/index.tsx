import { Ago } from '@/components/ago';
import TextLink from '@/components/text-link';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { excerpt } from '@/lib/utils';
import { ActionDeleteWithPassword } from '@/shared/action-password';
import { SearchInput } from '@/shared/search-input';
import { type BreadcrumbItem } from '@/types';
import { AssignmentModelPaginated } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { Eye, Pen, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assignement',
        href: '/assignment',
    },
];

type IndexProps = { assignments: AssignmentModelPaginated };

export default function Index() {
    const { assignments } = usePage<IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste d'invités" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <div className="mb-4 flex items-center justify-between">
                        <SearchInput lenghtData={assignments.total} urlBack={route('assignment.index')} />
                        <ButtonLink href={route('assignment.create')} dimension="sm" variant="outline">
                            <Plus size={16} />
                        </ButtonLink>
                    </div>
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Place</TableHead>
                                <TableHead>Invité</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Situation</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead className="lg:text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {assignments.data.map((assignment) => {
                                return (
                                    <TableRow key={assignment.id}>
                                        <TableCell>
                                            <TextLink href={route('guest-seat.show', { id: assignment.guest_seat_id })}>
                                                {excerpt(assignment.guest_seat.name, 25)}
                                            </TextLink>
                                        </TableCell>
                                        <TableCell>
                                            <TextLink href={route('guest.show', { id: assignment.guest_id })}>
                                                {excerpt(assignment.guest.name, 25)}
                                            </TextLink>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="secondary">{assignment.type}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{assignment.availability}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Ago date={assignment.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4 lg:justify-end">
                                                <ButtonLink dimension="sm" variant="outline" href={route('assignment.edit', { id: assignment.id })}>
                                                    <Pen size={15} />
                                                </ButtonLink>
                                                <ActionDeleteWithPassword routeDestroy={route('assignment.destroy', { id: assignment.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('assignment.show', { id: assignment.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <Pagination items={assignments} />
                </div>
            </div>
        </AppLayout>
    );
}
