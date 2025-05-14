import { BaseLayout } from '@/layouts/base-layout';
import { Link } from '@inertiajs/react';
import { Calendar, CheckCircle, Mail, PlusCircle, UserPlus } from 'lucide-react';

export default function Welcome() {
    return (
        <BaseLayout title="Accueil">
            <main className="container-welcome flex flex-col">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold">Organisez vos événements simplement</h1>
                    <p className="mx-auto max-w-2xl text-[#706f6c] dark:text-[#A1A09A]">
                        Eventia vous permet de créer, gérer et partager vos événements en quelques clics. Invitez vos amis, collègues ou famille et
                        suivez leurs confirmations en temps réel.
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
                                    Définissez le nom, la date, l'heure et le lieu de votre événement. Ajoutez une description et personnalisez les
                                    options selon vos besoins.
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
                                    Ajoutez les informations de vos invités (nom, email, téléphone). Vous pouvez importer vos contacts ou les ajouter
                                    manuellement.
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
                                    Les invités confirment leur présence en un clic via le lien reçu. Vous pouvez suivre en temps réel qui a confirmé
                                    et qui a décliné.
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
        </BaseLayout>
    );
}
