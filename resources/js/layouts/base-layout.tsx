import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import TextLink from '@/components/text-link';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export const BaseLayout = ({ children, title }: PropsWithChildren<{ title: string }>) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="container-welcome mb-16 text-sm">
                    <div className="flex items-center justify-between">
                        <Link href={route('home')} prefetch>
                            <AppLogo />
                        </Link>
                        <nav className="flex items-center justify-end gap-4">
                            <AppearanceToggleDropdown />
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
                    {children}
                </div>

                <footer className="text-muted-foreground mt-8 space-y-2 pb-4 text-center text-sm">
                    <p>
                        Cette application est développée dans le cadre{' '}
                        <TextLink href={route('course')}>d'un travail pratique de génie logiciel.</TextLink>
                    </p>
                    <p>
                        Application codée par <TextLink href={route('me')}>Labeya</TextLink>
                    </p>
                </footer>
            </div>
        </>
    );
};
