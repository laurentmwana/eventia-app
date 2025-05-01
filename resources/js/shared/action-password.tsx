import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import React, { FormEventHandler, useRef } from 'react';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';

type ActionDeleteWithPasswordProps = { routeDestroy: string };

export const ActionDeleteWithPassword = ({ routeDestroy }: ActionDeleteWithPasswordProps) => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(routeDestroy, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                        <Trash size={15} />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Suppression</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir effectuer cette action ? Cette action est irréversible. Si oui, veuillez entrer le mot de passe de
                        votre compte pour confirmer.
                    </DialogDescription>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="sr-only">
                                Mot de passe
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Saisissez votre mot de passe"
                                autoComplete="current-password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Non
                                </Button>
                            </DialogClose>

                            <Button variant="destructive" asChild>
                                <button type="submit">{processing ? <Loader size={15} /> : 'Oui'}</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

type ActionWithPasswordProps = { routeAction: string; title?: string; description?: string; trigger: React.ReactNode; preserveScroll?: boolean };

export const ActionWithPassword = ({ routeAction, title, description, trigger, preserveScroll = true }: ActionWithPasswordProps) => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        post(routeAction, {
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogTitle>{title || 'Mot de passe requis'}</DialogTitle>
                    <DialogDescription>{description || 'Veuillez entrer le mot de passe pour effectuer cette action.'}</DialogDescription>
                    <form className="space-y-6" onSubmit={deleteUser}>
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="sr-only">
                                Mot de passe
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Mot de passe"
                                autoComplete="current-password"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Non
                                </Button>
                            </DialogClose>

                            <Button type="submit" variant="destructive" disabled={processing}>
                                {processing ? <Loader size={15} /> : 'Oui'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
