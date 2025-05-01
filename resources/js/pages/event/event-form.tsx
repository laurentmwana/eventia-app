import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { MarkdownTextarea } from '@/components/ui/markdown-textarea';
import { SelectSingle } from '@/components/ui/select-single';
import { useFetch } from '@/hooks/use-fetch';
import { EventModel } from '@/types/model';
import { EventStateModel } from '@/types/util';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent } from 'react';

type EventFormFields = {
    description: string;
    image: File | null;
    title: string;
    id: number | null;
    type: string;
    status: string;
    start_at: string;
    end_at: string | null;
    _method: 'PUT' | 'POST';
};

type EventFormProps = {
    event: EventModel | null;
};

export const EventForm = ({ event }: EventFormProps) => {
    const eventState = useFetch<EventStateModel>(route('^event.state'));

    const { post, data, setData, errors, processing } = useForm<EventFormFields>({
        title: event ? event.title : '',
        description: event ? event.description : '',
        status: event ? event.status : '',
        type: event ? event.type : '',
        start_at: event ? event.start_at : '',
        end_at: event ? event.end_at : null,
        image: null,
        id: event ? event.id : null,
        _method: event ? 'PUT' : 'POST',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        !event
            ? post(route('event.store'), {
                  preserveState: true,
                  forceFormData: true,
              })
            : post(route('event.update', { id: event.id }), {
                  preserveState: true,
                  forceFormData: true,
              });
    };

    const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] ?? null;
        if (file) {
            setData('image', file);
        }
    };

    return (
        <form onSubmit={onSubmit} className="grid items-center gap-4 py-4 lg:grid-cols-2" encType="multipart/form-data">
            <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" onChange={handleFilesSelected} />
                <InputError message={errors.image} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                <InputError message={errors.title} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <SelectSingle
                    onChange={(v) => setData('type', v)}
                    value={data.type}
                    options={
                        eventState.fetchData?.types.map((type) => ({
                            label: type,
                            value: type,
                        })) || []
                    }
                />
                <InputError message={errors.type} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <SelectSingle
                    onChange={(v) => setData('status', v)}
                    value={data.status}
                    options={
                        eventState.fetchData?.status.map((status) => ({
                            label: status,
                            value: status,
                        })) || []
                    }
                />
                <InputError message={errors.status} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="start_at">Début</Label>
                <DatePicker
                    date={data.start_at ? new Date(data.start_at) : undefined}
                    setDate={(d) => setData('start_at', d ? d.toISOString() : '')}
                />
                <InputError message={errors.start_at} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="end_at">Fin</Label>
                <DatePicker date={data.end_at ? new Date(data.end_at) : undefined} setDate={(d) => setData('end_at', d ? d.toISOString() : null)} />
                <InputError message={errors.end_at} />
            </div>

            <div className="lg:col-span-2">
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <MarkdownTextarea defaultValue={data.description} id="description" onChange={(v) => setData('description', v)} />
                    <InputError message={errors.end_at} />
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
