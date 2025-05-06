import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { GuestSeatModel } from '@/types/model';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { storageUrl } from '@/lib/utils';
import { UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Places',
        href: '/guest-seat',
    },

    {
        title: 'En savoir plus sur une place',
        href: '',
    },
];

type ShowProps = { guestSeat: GuestSeatModel };

export default function Show() {
    const { guestSeat } = usePage<ShowProps>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Place #${guestSeat.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Carte principale du siège */}
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-2xl">{guestSeat.name}</CardTitle>
                                            <CardDescription>ID: {guestSeat.id}</CardDescription>
                                        </div>
                                        <Badge variant="secondary">{guestSeat.category}</Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 font-medium">Description</h3>
                                        <p className="rounded-lg border p-4 text-sm">{guestSeat.description}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 flex items-center gap-2 font-medium">
                                            <UsersIcon className="h-5 w-5" />
                                            Assignations ({guestSeat.assignments.length})
                                        </h3>

                                        {guestSeat.assignments.length > 0 ? (
                                            <div className="rounded-lg border">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Invité</TableHead>
                                                            <TableHead>Type</TableHead>
                                                            <TableHead>Disponibilité</TableHead>
                                                            <TableHead className="text-right">Actions</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {guestSeat.assignments.map((assignment) => (
                                                            <TableRow key={assignment.id}>
                                                                <TableCell>
                                                                    <div className="flex items-center gap-2">
                                                                        <Avatar className="h-8 w-8">
                                                                            <AvatarImage
                                                                                src={storageUrl(assignment.guest.avatar, 'avatar.png')}
                                                                                alt={`${assignment.guest.firstname} ${assignment.guest.name}`}
                                                                            />
                                                                            <AvatarFallback>
                                                                                {assignment.guest.firstname.charAt(0)}
                                                                                {assignment.guest.name.charAt(0)}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                        <span className="font-medium">
                                                                            {assignment.guest.firstname} {assignment.guest.name}
                                                                        </span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>{assignment.type}</TableCell>
                                                                <TableCell>
                                                                    <Badge variant="secondary">{assignment.availability}</Badge>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    <Button variant="outline" size="sm" asChild>
                                                                        <Link href={`/assignments/${assignment.id}`}>Détails</Link>
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ) : (
                                            <div className="flex h-24 items-center justify-center rounded-lg border">
                                                <p className="text-muted-foreground">Aucune assignation pour ce siège</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Carte d'informations et événement */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Informations</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Créé le:</span>
                                            <span className="text-sm font-medium">{formatDate(guestSeat.created_at)}</span>
                                        </div>
                                        <Separator />

                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Mis à jour le:</span>
                                            <span className="text-sm font-medium">{formatDate(guestSeat.updated_at)}</span>
                                        </div>
                                        <Separator />

                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground text-sm">Nombre d'assignations:</span>
                                            <span className="text-sm font-medium">{guestSeat.assignments.length}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Événement associé</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="aspect-video overflow-hidden rounded-md">
                                            <img
                                                src={storageUrl(guestSeat.event.image, '/event.png')}
                                                alt={guestSeat.event.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-medium">{guestSeat.event.title}</h3>
                                            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                                                <CalendarIcon className="h-4 w-4" />
                                                <span>{formatDate(guestSeat.event.start_at)}</span>
                                            </div>
                                            <Badge className="mt-2">{guestSeat.event.type}</Badge>
                                            <Badge variant="secondary" className="mt-2 ml-2">
                                                {guestSeat.event.status}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full">
                                            <Link href={`/events/${guestSeat.event_id}`}>Voir l'événement</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
