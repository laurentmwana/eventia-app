'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Link, useForm } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';

const KEY_SEARCH = 'search';

type SearchInputProps = { lenghtData: number; urlBack: string; urlAction?: string };

export const SearchInput = ({ lenghtData, urlBack, urlAction = '' }: SearchInputProps) => {
    console.log(lenghtData);

    const currentUrl = new URL(window.location.href);
    const queryData = currentUrl.searchParams.get(KEY_SEARCH);
    const defaultSeachState = queryData !== null && queryData.length > 0;
    const noData = !(lenghtData === 0);
    const [hasSearch, setHasSearch] = useState<boolean>(defaultSeachState);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const { get, processing, setData, data } = useForm({
        search: queryData || '',
    });

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get(urlAction, {
            onFinish: () => {
                setHasSearch(true);
                setIsDialogOpen(false);
            },
        });
    };

    const SearchForm = () => (
        <form method="get" action="" className="flex w-full items-center gap-2" onSubmit={onSubmit}>
            <Input placeholder="Recherche..." value={data.search} onChange={(e) => setData('search', e.target.value)} className="w-full" />
            <Button variant="secondary" size="sm" type="submit">
                {processing ? <Loader /> : <Search size={15} />}
            </Button>
        </form>
    );

    // Results component to reuse in both views
    const SearchResults = () =>
        hasSearch && (
            <div>
                <p className="text-muted-foreground flex items-center gap-3 text-xs">
                    <span>
                        {lenghtData} {lenghtData > 1 ? 'Résultats trouvés' : 'Résultat trouvé'} pour cette recherche.
                    </span>
                    <Link href={urlBack} className="hover:underline">
                        Réinitiliser la recherche
                    </Link>
                </p>
            </div>
        );

    // Mobile view (Dialog/Modal)
    if (isMobile) {
        return (
            <div className="space-y-3">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <Search size={15} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Recherche</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                            {noData ? (
                                <SearchForm />
                            ) : (
                                <p className="flex items-center gap-3 text-xs text-indigo-500 dark:text-indigo-300">Pas de données disponible</p>
                            )}
                            <SearchResults />
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Show search results outside the modal if there's a search */}
                <div className="mt-2">
                    <SearchResults />
                </div>
            </div>
        );
    }

    // Desktop view (original layout)
    return (
        <div className="space-y-3">
            {noData ? (
                <div className="flex items-center justify-between gap-3">
                    <SearchForm />
                </div>
            ) : (
                <p className="flex items-center gap-3 text-xs text-indigo-500 dark:text-indigo-300">Pas de données disponible</p>
            )}
            <SearchResults />
        </div>
    );
};
