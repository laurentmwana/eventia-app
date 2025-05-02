import TextLink from '@/components/text-link';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, CheckCircle, Mail, PlusCircle, UserPlus } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Accueil | Eventia">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="mb-16 container-welcome text-sm">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-indigo-400">eventia</div>
                        <nav className="flex items-center justify-end gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Tableau de bord
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        S'enregistrer
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex container-welcome flex-col">
                        <div className="mb-8 text-center">
                            <h1 className="mb-2 text-3xl font-bold">Organisez vos événements simplement</h1>
                            <p className="mx-auto max-w-2xl text-[#706f6c] dark:text-[#A1A09A]">
                                Eventia vous permet de créer, gérer et partager vos événements en quelques clics. Invitez vos amis, collègues ou
                                famille et suivez leurs confirmations en temps réel.
                            </p>
                        </div>

                        <div className="flex-1 rounded-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:p-10 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h2 className="mb-6 text-center text-xl font-medium">Comment ça marche</h2>

                            <ul className="mb-8 flex flex-col">
                                <li className="relative flex items-start gap-4 py-4 before:absolute before:top-[2.2rem] before:bottom-0 before:left-[0.9rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <PlusCircle className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
                                        </span>
                                    </span>
                                    <div>
                                        <h3 className="mb-1 text-base font-medium">Créez votre compte</h3>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                            Inscrivez-vous sur Eventia pour accéder à toutes les fonctionnalités. C'est rapide, simple et gratuit.
                                        </p>
                                    </div>
                                </li>

                                <li className="relative flex items-start gap-4 py-4 before:absolute before:top-0 before:bottom-0 before:left-[0.9rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <Calendar className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
                                        </span>
                                    </span>
                                    <div>
                                        <h3 className="mb-1 text-base font-medium">Créez un événement</h3>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                            Définissez le nom, la date, l'heure et le lieu de votre événement. Ajoutez une description et
                                            personnalisez les options selon vos besoins.
                                        </p>
                                    </div>
                                </li>

                                <li className="relative flex items-start gap-4 py-4 before:absolute before:top-0 before:bottom-0 before:left-[0.9rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <UserPlus className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
                                        </span>
                                    </span>
                                    <div>
                                        <h3 className="mb-1 text-base font-medium">Invitez vos participants</h3>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                            Ajoutez les informations de vos invités (nom, email, téléphone). Vous pouvez importer vos contacts ou les
                                            ajouter manuellement.
                                        </p>
                                    </div>
                                </li>

                                <li className="relative flex items-start gap-4 py-4 before:absolute before:top-0 before:bottom-0 before:left-[0.9rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <Mail className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
                                        </span>
                                    </span>
                                    <div>
                                        <h3 className="mb-1 text-base font-medium">Envoi automatique des invitations</h3>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                            Le système envoie automatiquement des invitations par email ou SMS à vos invités. Ils recevront toutes les
                                            informations nécessaires pour votre événement.
                                        </p>
                                    </div>
                                </li>

                                <li className="relative flex items-start gap-4 py-4 before:absolute before:top-0 before:bottom-1/2 before:left-[0.9rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                                    <span className="relative bg-white py-1 dark:bg-[#161615]">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                                            <CheckCircle className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
                                        </span>
                                    </span>
                                    <div>
                                        <h3 className="mb-1 text-base font-medium">Confirmation des participants</h3>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                            Les invités confirment leur présence en un clic via le lien reçu. Vous pouvez suivre en temps réel qui a
                                            confirmé et qui a décliné.
                                        </p>
                                    </div>
                                </li>
                            </ul>

                            <div className="flex justify-center">
                                <Link
                                    href={route('event.create')}
                                    className="inline-block rounded-sm border border-black bg-[#1b1b18] px-6 py-2 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                >
                                    Commencer maintenant
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="text-muted-foreground mt-8 space-y-2 pb-4 text-center text-xs">
                    <p>Cette application est développée dans le cadre d'un travail pratique de génie logiciel.</p>
                    <p>
                        Application codée par <TextLink href="">Labeya</TextLink>
                    </p>
                </footer>
            </div>
        </>
    );
}
