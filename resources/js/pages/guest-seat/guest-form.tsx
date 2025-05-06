import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { SelectSingle } from '@/components/ui/select-single';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetch } from '@/hooks/use-fetch';
import { GuestModel } from '@/types/model';
import { DataValueEnumModel, EventUserModel } from '@/types/util';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent } from 'react';

type GuestFormFields = {
    name: string;
    firstname: string;
    gender: string;
    phone: string;
    avatar: File | null;
    id: number | null;
    event_id: number;
    _method: 'PUT' | 'POST';
};

type GuestFormProps = {
    guest: GuestModel | null;
};

export const GuestForm = ({ guest }: GuestFormProps) => {
    const events = useFetch<EventUserModel[]>(route('^event.user'));
    const enums = useFetch<DataValueEnumModel>(route('^enum'));

    const { post, data, setData, errors, processing } = useForm<GuestFormFields>({
        name: guest ? guest.name : '',
        firstname: guest ? guest.firstname : '',
        gender: guest ? guest.gender : '',
        phone: guest ? guest.phone : '',
        avatar: null,
        event_id: guest ? guest.event_id : 0,
        id: guest ? guest.id : null,
        _method: guest ? 'PUT' : 'POST',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        !guest
            ? post(route('guest.store'), {
                  preserveState: true,
                  forceFormData: true,
              })
            : post(route('guest.update', { id: guest.id }), {
                  preserveState: true,
                  forceFormData: true,
              });
    };

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] ?? null;
        if (file) {
            setData('avatar', file);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="grid items-center gap-4 py-4 lg:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="avatar">Image</Label>
                    <Input id="avatar" type="file" onChange={handleFilesSelected} />
                    <InputError message={errors.avatar} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="firstname">Postnom</Label>
                    <Input id="firstname" value={data.firstname} onChange={(e) => setData('firstname', e.target.value)} />
                    <InputError message={errors.firstname} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                    <InputError message={errors.phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="type">Genre</Label>
                    {enums.isPending ? (
                        <Skeleton className="h-10 w-full rounded-xl"></Skeleton>
                    ) : (
                        <SelectSingle
                            onChange={(v) => setData('gender', v)}
                            value={data.gender}
                            options={
                                enums.fetchData?.genders.map((gender) => ({
                                    label: gender,
                                    value: gender,
                                })) || []
                            }
                        />
                    )}

                    <InputError message={errors.event_id} />
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
