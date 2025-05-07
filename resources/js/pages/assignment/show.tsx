import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { AssignmentModel } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';

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

type ShowProps = { assignment: AssignmentModel };

export default function Show() {
    const { assignment } = usePage<ShowProps>().props;

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
            <Head title={`Affectation #${assignment.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Détails de l'affectation</h1>
                                <p className="text-muted-foreground">Affichage de l'affectation #{assignment.id}</p>
                            </div>
                            <Badge variant="secondary">{assignment.availability}</Badge>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations sur l'affectation</CardTitle>
                                    <CardDescription>Détails de base sur cette affectation</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-muted-foreground text-sm font-medium">ID</div>
                                        <div className="text-sm">{assignment.id}</div>

                                        <div className="text-muted-foreground text-sm font-medium">Type</div>
                                        <div className="text-sm">{assignment.type}</div>

                                        <div className="text-muted-foreground text-sm font-medium">Disponibilité</div>
                                        <div className="text-sm">
                                            <Badge variant="secondary">{assignment.availability}</Badge>
                                        </div>

                                        <div className="text-muted-foreground text-sm font-medium">Créé le</div>
                                        <div className="text-sm">{formatDate(assignment.created_at)}</div>

                                        <div className="text-muted-foreground text-sm font-medium">Mis à jour le</div>
                                        <div className="text-sm">{formatDate(assignment.updated_at)}</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations sur l'invité</CardTitle>
                                    <CardDescription>Détails sur l'invité assigné</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-muted-foreground text-sm font-medium">ID de l'invité</div>
                                        <div className="text-sm">{assignment.guest_id}</div>

                                        <div className="text-muted-foreground text-sm font-medium">Nom</div>
                                        <div className="text-sm">{assignment.guest.name}</div>

                                        {assignment.guest.phone && (
                                            <>
                                                <div className="text-muted-foreground text-sm font-medium">Téléphone</div>
                                                <div className="text-sm">{assignment.guest.phone}</div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Informations sur le siège</CardTitle>
                                    <CardDescription>Détails sur le siège assigné</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        <div>
                                            <div className="text-muted-foreground text-sm font-medium">ID du siège</div>
                                            <div className="text-sm">{assignment.guest_seat_id}</div>
                                        </div>

                                        <div>
                                            <div className="text-muted-foreground text-sm font-medium">Numéro de siège</div>
                                            <div className="text-sm">{assignment.guest_seat.seat_number}</div>
                                        </div>

                                        <div>
                                            <div className="text-muted-foreground text-sm font-medium">Section</div>
                                            <div className="text-sm">{assignment.guest_seat.section}</div>
                                        </div>

                                        {assignment.guest_seat.location && (
                                            <div>
                                                <div className="text-muted-foreground text-sm font-medium">Emplacement</div>
                                                <div className="text-sm">{assignment.guest_seat.location}</div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}