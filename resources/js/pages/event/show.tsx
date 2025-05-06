import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { storageUrl } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { EventModel } from '@/types/model';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evènements',
        href: '/event',
    },

    {
        title: 'En savoir plus sur un évènenement',
        href: '',
    },
];

type ShowProps = { event: EventModel };

export default function Show() {
    const { event } = usePage<ShowProps>().props;

    // Formater les dates
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Non défini';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Calculer la durée de l'événement
    const calculateDuration = () => {
        if (!event.end_at) return 'Durée non définie';

        const start = new Date(event.start_at);
        const end = new Date(event.end_at);
        const durationMs = end.getTime() - start.getTime();

        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Evènement #${event.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min">
                    <div>
                        {/* En-tête de l'événement */}
                        <div className="mb-8">
                            <div className="relative mb-6 aspect-[3/1] overflow-hidden rounded-xl">
                                <img src={event.image || '/placeholder.svg'} alt={event.title} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <Badge className="mb-2">{event.type}</Badge>
                                    <Badge variant={event.status === 'Confirmé' ? 'secondary' : 'outline'} className="mb-2 ml-2">
                                        {event.status}
                                    </Badge>
                                    <h1 className="text-3xl font-bold text-white">{event.title}</h1>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle>À propos de l'événement</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p>{event.description}</p>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="flex items-center gap-2 rounded-lg border p-3">
                                                <CalendarIcon className="text-muted-foreground h-5 w-5" />
                                                <div>
                                                    <p className="text-sm font-medium">Date de début</p>
                                                    <p className="text-muted-foreground text-sm">{formatDate(event.start_at)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 rounded-lg border p-3">
                                                <CalendarIcon className="text-muted-foreground h-5 w-5" />
                                                <div>
                                                    <p className="text-sm font-medium">Date de fin</p>
                                                    <p className="text-muted-foreground text-sm">{formatDate(event.end_at)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 rounded-lg border p-3">
                                                <ClockIcon className="text-muted-foreground h-5 w-5" />
                                                <div>
                                                    <p className="text-sm font-medium">Durée</p>
                                                    <p className="text-muted-foreground text-sm">{calculateDuration()}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 rounded-lg border p-3">
                                                <UsersIcon className="text-muted-foreground h-5 w-5" />
                                                <div>
                                                    <p className="text-sm font-medium">Invités</p>
                                                    <p className="text-muted-foreground text-sm">{event.guests.length} invités</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informations</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground text-sm">ID:</span>
                                                <span className="text-sm font-medium">{event.id}</span>
                                            </div>
                                            <Separator />

                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground text-sm">Créé le:</span>
                                                <span className="text-sm font-medium">{formatDate(event.created_at)}</span>
                                            </div>
                                            <Separator />

                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground text-sm">Mis à jour le:</span>
                                                <span className="text-sm font-medium">{formatDate(event.updated_at)}</span>
                                            </div>
                                            <Separator />

                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground text-sm">Sièges:</span>
                                                <span className="text-sm font-medium">{event.guest_seats.length} sièges</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Onglets pour les invités et les sièges */}
                        <Tabs defaultValue="guests" className="mt-6">
                            <TabsList className="mb-4">
                                <TabsTrigger value="guests">Invités ({event.guests.length})</TabsTrigger>
                                <TabsTrigger value="seats">Sièges ({event.guest_seats.length})</TabsTrigger>
                            </TabsList>

                            <TabsContent value="guests" className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {event.guests.map((guest) => (
                                        <Card key={guest.id}>
                                            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={storageUrl(guest.avatar, '/avatar.png')}
                                                        alt={`${guest.firstname} ${guest.name}`}
                                                    />
                                                    <AvatarFallback>{`${guest.firstname.charAt(0)}${guest.name.charAt(0)}`}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-base">{`${guest.firstname} ${guest.name}`}</CardTitle>
                                                    <CardDescription>{guest.phone}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0 pb-2">
                                                <p className="text-muted-foreground text-xs">ID: {guest.id}</p>
                                            </CardContent>
                                            <CardContent className="pt-0 pb-2">
                                                <Button variant="outline" size="sm" asChild className="w-full">
                                                    <Link href={route('guest.show', { id: guest.id })}>Voir détails</Link>
                                                </Button>
                                            </CardContent>
                                        </Carùd>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="seats" className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {event.guest_seats.map((seat) => (
                                        <Card key={seat.id}>
                                            <CardHeader>
                                                <CardTitle className="text-base">{seat.name}</CardTitle>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
