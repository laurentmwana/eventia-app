import TextLink from '@/components/text-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { excerpt } from '@/lib/utils';
import { ActionWithPassword } from '@/shared/action-password';
import { SearchInput } from '@/shared/search-input';
import { type BreadcrumbItem } from '@/types';
import { EventModelPaginated, GuestModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Envoi d'invitation",
        href: '/notification/send',
    },
];

type IndexProps = {
    events: EventModelPaginated;
};

const countGuestAssignments = (guests: GuestModel[]): number => {
    let guestReceiveMail = 0;

    guests.forEach((guest) => {
        if (guest.assignment && guest.assignment.is_send_email) {
            guestReceiveMail += 1;
        }
    });

    return guestReceiveMail;
};

export default function Index() {
    const { events } = usePage<IndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Liste d'évènements" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <div className="mb-4 flex items-center justify-between">
                        <SearchInput lenghtData={events.total} urlBack={route('event.index')} />
                    </div>
                    <Table className="mb-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Invités</TableHead>
                                <TableHead>Invitation</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="lg:text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {events.data.map((ev) => {
                                return (
                                    <TableRow key={ev.id}>
                                        <TableCell>
                                            <TextLink href="">{excerpt(ev.title, 40)}</TextLink>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{ev.guests.length}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{countGuestAssignments(ev.guests)}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant="outline">{ev.type}</Badge>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center justify-end">
                                                <ActionWithPassword
                                                    routeAction={route('notification.send.action', { id: ev.id })}
                                                    trigger={
                                                        <Button size="sm" variant="outline">
                                                            Envoyer
                                                        </Button>
                                                    }
                                                />
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
