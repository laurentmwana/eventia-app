import { Ago } from '@/components/ago';
import TextLink from '@/components/text-link';
import { ButtonLink } from '@/components/ui/button-link';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { excerpt } from '@/lib/utils';
import { ActionDeleteWithPassword } from '@/shared/action-password';
import { SearchInput } from '@/shared/search-input';
import { type BreadcrumbItem } from '@/types';
import { GuestModelPaginated } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import { Eye, Pen, Plus } from 'lucide-react';
import { AssignmentDialog } from './assignment-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invités',
        href: '/guest',
    },
];

type IndexProps = { guests: GuestModelPaginated };

export default function Index() {
    const { guests } = usePage<IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste d'invités" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <div className="mb-4 flex items-center justify-between">
                        <SearchInput lenghtData={guests.total} urlBack={route('guest.index')} />
                        <ButtonLink href={route('guest.create')} dimension="sm" variant="outline">
                            <Plus size={16} />
                        </ButtonLink>
                    </div>
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Postnom</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Evènement</TableHead>
                                <TableHead>Assignation</TableHead>
                                <TableHead>Créer</TableHead>
                                <TableHead className="lg:text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {guests.data.map((guest) => {
                                return (
                                    <TableRow key={guest.id}>
                                        <TableCell>{excerpt(guest.name, 25)}</TableCell>
                                        <TableCell>{excerpt(guest.firstname, 25)}</TableCell>
                                        <TableCell>{guest.gender}</TableCell>

                                        <TableCell>
                                            <TextLink href={route('event.show', { id: guest.event.id })}>{excerpt(guest.event.title, 50)}</TextLink>
                                        </TableCell>

                                        <TableCell>
                                            <AssignmentDialog assignment={guest.assignment} />
                                        </TableCell>

                                        <TableCell>
                                            <Ago date={guest.created_at} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4 lg:justify-end">
                                                <ButtonLink dimension="sm" variant="outline" href={route('guest.edit', { id: guest.id })}>
                                                    <Pen size={15} />
                                                </ButtonLink>
                                                <ActionDeleteWithPassword routeDestroy={route('guest.destroy', { id: guest.id })} />

                                                <ButtonLink dimension="sm" variant="secondary" href={route('guest.show', { id: guest.id })}>
                                                    <Eye size={15} />
                                                </ButtonLink>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <Pagination items={guests} />
                </div>
            </div>
        </AppLayout>
    );
}
