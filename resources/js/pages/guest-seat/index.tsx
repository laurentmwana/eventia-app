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
import { GuestSeatModelPaginated } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { Eye, Pen, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Place',
        href: '/guest-seat',
    },
];

type IndexProps = { guestSeats: GuestSeatModelPaginated };

export default function Index() {
    const { guestSeats } = usePage<IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste des places" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <div className="mb-4 flex items-center justify-between">
                        <SearchInput lenghtData={guestSeats.total} urlBack={route('guest-seat.index')} />
                        <ButtonLink href={route('guest-seat.create')} dimension="sm" variant="outline">
                            <Plus size={16} />
                        </ButtonLink>
                    </div>
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Categorie</TableHead>
                                <TableHead>Evènement</TableHead>
                                <TableHead>Assignments</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead className="lg:text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {guestSeats.data.map((seat) => {
                                return (
                                    <TableRow key={seat.id}>
                                        <TableCell>{excerpt(seat.name, 25)}</TableCell>
                                        <TableCell>{excerpt(seat.category, 25)}</TableCell>

                                        <TableCell>
                                            <TextLink href={route('event.show', { id: seat.event.id })}>{excerpt(seat.event.title, 50)}</TextLink>
                                        </TableCell>

                                        <TableCell>
                                            <Badge>{seat.assignments.length}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Ago date={seat.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4 lg:justify-end">
                                                <ButtonLink dimension="sm" variant="outline" href={route('guest-seat.edit', { id: seat.id })}>
                                                    <Pen size={15} />
                                                </ButtonLink>
                                                <ActionDeleteWithPassword routeDestroy={route('guest-seat.destroy', { id: seat.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('guest-seat.show', { id: seat.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <Pagination items={guestSeats} />
                </div>
            </div>
        </AppLayout>
    );
}
