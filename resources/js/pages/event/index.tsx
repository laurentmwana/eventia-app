import { Ago } from '@/components/ago';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { excerpt } from '@/lib/utils';
import { ActionDeleteWithPassword } from '@/shared/action-password';
import { SearchInput } from '@/shared/search-input';
import { type BreadcrumbItem } from '@/types';
import { EventModelPaginated } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { Eye, Pen, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evènements',
        href: '/event',
    },
];

type IndexProps = { events: EventModelPaginated };

export default function Index() {
    const { events } = usePage<IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste d'évènements" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <div className="mb-4 flex items-center justify-between">
                        <SearchInput lenghtData={events.total} urlBack={route('event.index')} />
                        <ButtonLink href={route('event.create')} dimension="sm" variant="outline">
                            <Plus size={16} />
                        </ButtonLink>
                    </div>
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Début</TableHead>
                                <TableHead>Fin</TableHead>
                                <TableHead>Invités</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead  className="lg:text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {events.data.map((event) => {
                                return (
                                    <TableRow key={event.id}>
                                        <TableCell>{excerpt(event.title, 50)}</TableCell>
                                        <TableCell>{event.start_at}</TableCell>

                                        <TableCell>{event.end_at}</TableCell>

                                        <TableCell>
                                            <Badge variant="outline">
                                                {event.guests.length}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{event.status}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{event.type}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Ago date={event.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4 lg:justify-end">
                                                <ButtonLink dimension="sm" variant="outline" href={route('event.edit', { id: event.id })}>
                                                    <Pen size={15} />
                                                </ButtonLink>
                                                <ActionDeleteWithPassword routeDestroy={route('event.destroy', { id: event.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('event.show', { id: event.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <Pagination items={events} />
                </div>
            </div>
        </AppLayout>
    );
}
