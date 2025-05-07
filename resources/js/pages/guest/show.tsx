import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { storageUrl } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { GuestModel } from '@/types/model';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarIcon, PhoneIcon, UserIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invités',
        href: '/guest',
    },

    {
        title: 'En savoir plus sur un invité',
        href: '',
    },
];

type ShowProps = { guest: GuestModel };

export default function Show() {
    const { guest } = usePage<ShowProps>().props;

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
            <Head title={`Evènement #${guest.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Carte principale de l'invité */}
                            <Card className="md:col-span-2">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={storageUrl(guest.avatar, '/avatar.png')} alt={`${guest.firstname} ${guest.name}`} />
                                        <AvatarFallback>{`${guest.firstname.charAt(0)}${guest.name.charAt(0)}`}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-2xl">{`${guest.firstname} ${guest.name}`}</CardTitle>
                                        <CardDescription className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4" />
                                            <span>{guest.gender}</span>
                                            <PhoneIcon className="ml-2 h-4 w-4" />
                                            <span>{guest.phone}</span>
                                        </CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="mb-2 font-medium">Informations de l'invité</h3>
                                        <div className="grid grid-cols-2 gap-y-2 rounded-lg border p-4 text-sm">
                                            <span className="text-muted-foreground">ID:</span>
                                            <span>{guest.id}</span>

                                            <span className="text-muted-foreground">Créé le:</span>
                                            <span>{formatDate(guest.created_at)}</span>

                                            <span className="text-muted-foreground">Mis à jour le:</span>
                                            <span>{formatDate(guest.updated_at)}</span>
                                        </div>
                                    </div>

                                    {guest.assignment && (
                                        <div>
                                            <h3 className="mb-2 font-medium">Assignation</h3>
                                            <div className="rounded-lg border p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Badge variant={guest.assignment.availability === 'Confirmé' ? 'secondary' : 'outline'}>
                                                        {guest.assignment.availability}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-sm">ID: {guest.assignment.id}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                    <span className="text-muted-foreground">Type:</span>
                                                    <span>{guest.assignment.type}</span>

                                                    <span className="text-muted-foreground">Siège:</span>
                                                    <span>{guest.assignment.guest_seat.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Carte de l'événement */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Événement associé</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="aspect-video overflow-hidden rounded-md">
                                        <img
                                            src={storageUrl(guest.event.image, '/event.png')}
                                            alt={guest.event.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-medium">{guest.event.title}</h3>
                                        <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>{formatDate(guest.event.start_at)}</span>
                                        </div>
                                        <Badge className="mt-2">{guest.event.type}</Badge>
                                        <Badge variant={guest.event.status === 'Confirmé' ? 'secondary' : 'outline'} className="mt-2 ml-2">
                                            {guest.event.status}
                                        </Badge>
                                        <p className="mt-3 text-sm">{guest.event.description}</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={route('event.show', { id: guest.event_id })}>Voir l'événement</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
