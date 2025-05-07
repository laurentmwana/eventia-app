import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/use-fetch';
import { GuestSeatModel } from '@/types/model';
import { DataValueEnumModel, EventUserModel } from '@/types/util';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent } from 'react';

type GuestSeatFormFields = {
    name: string;
    description: string;
    category: string;
    event_id: number;
    id: number | null;
};

type GuestSeatFormProps = {
    seat: GuestSeatModel | null;
};

export const GuestSeatForm = ({ seat }: GuestSeatFormProps) => {
    const events = useFetch<EventUserModel[]>(route('^event.user'));
    const enums = useFetch<DataValueEnumModel>(route('^enum'));

    const { post, data, setData, errors, processing } = useForm<GuestSeatFormFields>({
        name: seat ? seat.name : '',
        description: seat ? seat.description : '',
        category: seat ? seat.category : '',
        event_id: seat ? seat.event_id : 0,
        id: seat ? seat.id : null,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        !seat
            ? post(route('guest-seat.store'), {
                  preserveState: true,
                  forceFormData: true,
              })
            : post(route('guest-seat.update', { id: seat.id }), {
                  preserveState: true,
                  forceFormData: true,
              });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="max-w-2xl space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="event">Evènement</Label>
                    {events.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => setData('event_id', parseInt(v))}
                            value={data.event_id.toString()}
                            options={
                                events.fetchData?.map((event) => ({
                                    label: `${event.title} [${event.status}]`,
                                    value: event.id.toString(),
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.event_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Categorie</Label>
                    {enums.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => setData('category', v)}
                            value={data.category}
                            options={
                                enums.fetchData?.guest_seat_categories.map((category) => ({
                                    label: category,
                                    value: category,
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.category} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea value={data.description} id="description" onChange={(e) => setData('description', e.target.value)} />
                    <InputError message={errors.description} />
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
