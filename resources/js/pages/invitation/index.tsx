import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BaseLayout } from '@/layouts/base-layout';
import { storageUrl } from '@/lib/utils';
import { GuestModel } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

type InvitationIndexProps = {
    guest: GuestModel;
};

export default function InvitationIndex() {
    const { guest } = usePage<InvitationIndexProps>().props;

    return (
        <BaseLayout title="Invitation">
            <div className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 overflow-hidden rounded-lg">
                        <img src={storageUrl(guest.event.image, '/event.png')} alt={guest.event.title} className="h-64 w-full object-cover" />
                    </div>

                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl md:text-3xl">{guest.event.title}</CardTitle>
                                    <CardDescription className="mt-2">
                                        <Badge className="mr-2">{guest.event.type}</Badge>
                                        <Badge variant={guest.event.status === 'à venir' ? 'default' : 'outline'}>
                                            {guest.event.status.charAt(0).toUpperCase() + guest.event.status.slice(1)}
                                        </Badge>
                                    </CardDescription>
                                </div>
                                <Button variant="outline" size="sm">
                                    Confirmation
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="text-muted-foreground h-5 w-5" />
                                    <span>{format(new Date(guest.event.start_at), 'EEEE d MMMM yyyy')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-muted-foreground h-5 w-5" />
                                    <span>
                                        {format(new Date(guest.event.start_at), 'HH:mm')} -
                                        {guest.event.end_at ? format(new Date(guest.event.end_at), ' HH:mm') : ' À déterminer'}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <h3 className="mb-2 font-medium">Description</h3>
                                <p className="text-muted-foreground">{guest.event.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Vos informations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={guest.avatar || '/placeholder.svg'} alt={`${guest.firstname} ${guest.name}`} />
                                        <AvatarFallback>
                                            {guest.firstname.charAt(0)}
                                            {guest.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {guest.firstname} {guest.name}
                                        </h3>
                                        <p className="text-muted-foreground">{guest.phone}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Votre attribution de siège
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {guest.assignment ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium">Siège:</span>
                                            <span>{guest.assignment.guest_seat.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Catégorie:</span>
                                            <span>{guest.assignment.guest_seat.category}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium">Détails:</span>
                                            <span>{guest.assignment.guest_seat.description}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4 text-center">
                                        <p className="text-muted-foreground">Aucun siège n'a encore été attribué.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
