import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import type { AssignmentModel } from '@/types/model';
import { CalendarIcon, InfoIcon, UserIcon, X } from 'lucide-react';

type AssignmentDialogProps = { assignment?: AssignmentModel };

export const AssignmentDialog = ({ assignment }: AssignmentDialogProps) => {
    if (!assignment) {
        return (
            <Badge variant="destructive">
                <X size={15} />
            </Badge>
        );
    }

    // Format date to be more readable
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className="text-primary text-sm font-medium underline-offset-4 hover:underline">Voir détails</AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <InfoIcon className="h-5 w-5" />
                        Détails de l'assignation #{assignment.id}
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="mt-4 space-y-4 text-left">
                            {/* Informations générales */}
                            <div className="rounded-lg border p-3">
                                <h3 className="mb-2 font-medium">Informations générales</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">Catégorie:</span>
                                    <span>{assignment.category}</span>

                                    <span className="text-muted-foreground">Type:</span>
                                    <span>{assignment.type}</span>

                                    <span className="text-muted-foreground">Disponibilité:</span>
                                    <span>{assignment.availability}</span>
                                </div>
                            </div>

                            {/* Informations invité */}
                            <div className="rounded-lg border p-3">
                                <h3 className="mb-2 flex items-center gap-2 font-medium">
                                    <UserIcon className="h-4 w-4" />
                                    Informations invité
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">ID invité:</span>
                                    <span>{assignment.guest_id}</span>

                                    {assignment.guest && (
                                        <>
                                            <span className="text-muted-foreground">Nom:</span>
                                            <span>{assignment.guest.name || 'Non spécifié'}</span>
                                        </>
                                    )}

                                    <span className="text-muted-foreground">ID siège:</span>
                                    <span>{assignment.guest_seat_id}</span>

                                    {assignment.guest_seat && (
                                        <>
                                            <span className="text-muted-foreground">Siège:</span>
                                            <span>{assignment.guest_seat.name || 'Non spécifié'}</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="rounded-lg border p-3">
                                <h3 className="mb-2 flex items-center gap-2 font-medium">
                                    <CalendarIcon className="h-4 w-4" />
                                    Dates
                                </h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">Créé le:</span>
                                    <span>{formatDate(assignment.created_at)}</span>

                                    <span className="text-muted-foreground">Mis à jour le:</span>
                                    <span>{formatDate(assignment.updated_at)}</span>
                                </div>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Fermer</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
