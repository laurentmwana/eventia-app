import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetch } from '@/hooks/use-fetch';
import { AssignmentModel } from '@/types/model';
import { DataValueAssignmentsModel, DataValueEnumModel } from '@/types/util';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent, useState } from 'react';

type AssignmentFormFields = {
    type: string;
    availability: string;
    id: number | null;
    guest_id: number;
    guest_seat_id: number;
    event_id: number;
};

type AssignmentFormProps = {
    assignment: AssignmentModel | null;
};

export const AssignmentForm = ({ assignment }: AssignmentFormProps) => {
    const fetchUrl =
        assignment && assignment.guest_seat ? route('^guest-seat.guest', { event: assignment.guest_seat.event_id }) : route('^guest-seat.guest');

    const [dataValueUrl, setDataValueUrl] = useState<string>(fetchUrl);
    const assignments = useFetch<DataValueAssignmentsModel>(dataValueUrl);
    const enums = useFetch<DataValueEnumModel>(route('^enum'));

    const { post, data, setData, errors, processing, put } = useForm<AssignmentFormFields>({
        guest_id: assignment ? assignment.guest_id : 0,
        guest_seat_id: assignment ? assignment.guest_seat_id : 0,
        type: assignment ? assignment.type : '',
        event_id: assignment ? assignment.guest_seat.event_id : 0,
        availability: assignment ? assignment.availability : '',
        id: assignment ? assignment.id : null,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        !assignment
            ? post(route('assignment.store'), {
                  preserveState: true,
              })
            : put(route('assignment.update', { id: assignment.id }), {
                  preserveState: true,
              });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="max-w-2xl space-y-5">
                <div className="grid gap-2">
                    <Label htmlFor="guest_seat_id">Evènement</Label>
                    {assignments.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => {
                                setDataValueUrl(route('^guest-seat.guest', { event: v }));
                                setData('event_id', parseInt(v));
                            }}
                            value={data.event_id.toString()}
                            options={
                                assignments.fetchData?.events.map((event) => ({
                                    label: `${event.title} [${event.status}]`,
                                    value: event.id.toString(),
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.event_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="guest_seat_id">Place</Label>
                    {assignments.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => {
                                setData('guest_seat_id', parseInt(v));
                            }}
                            value={data.guest_seat_id.toString()}
                            options={
                                assignments.fetchData?.guestSeats.map((seat) => ({
                                    label: `${seat.name} [${seat.category}]`,
                                    value: seat.id.toString(),
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.guest_seat_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="guest_id">Invité</Label>
                    {assignments.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => setData('guest_id', parseInt(v))}
                            value={data.guest_id.toString()}
                            options={
                                assignments.fetchData?.guests.map((guest) => ({
                                    label: `${guest.name} [${guest.firstname}]`,
                                    value: guest.id.toString(),
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.guest_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    {enums.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => setData('type', v)}
                            value={data.type}
                            options={
                                enums.fetchData?.assignment_types.map((type) => ({
                                    label: type,
                                    value: type,
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.type} />
                </div>
            </div>

            <div>
                <Button variant="outline" size="sm" type="submit" disabled={processing}>
                    {processing ? (
                        <div className="flex gap-2">
                            <Loader size={16} />
                        </div>
                    ) : (
                        <Save size={15} />
                    )}
                </Button>
            </div>
        </form>
    );
};
