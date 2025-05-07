'use client';

import { AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Type pour les données du graphique
interface ChartDataItem {
    date: string;
    currentYear: number;
    previousYear: number;
}

// Type pour les totaux
interface TotalsData {
    currentYear: number;
    previousYear: number;
}

// Type pour la réponse de l'API
interface ApiResponse {
    chartData: ChartDataItem[];
    totals: TotalsData;
}

// Type pour le point de données détaillé
interface DetailedDataPoint extends ChartDataItem {
    formattedDate: string;
}

const chartConfig = {
    visitors: {
        label: 'Statistiques',
    },
    currentYear: {
        label: 'Année courante',
        color: 'hsl(215, 100%, 60%)',
    },
    previousYear: {
        label: 'Année précédente',
        color: 'hsl(280, 100%, 70%)',
    },
} satisfies ChartConfig;

export function ChartStat() {
    // Utiliser 7d comme valeur par défaut pour mettre l'accent sur les données récentes
    const [timeRange, setTimeRange] = React.useState('7d');
    const [chartData, setChartData] = React.useState<ChartDataItem[]>([]);
    const [totals, setTotals] = React.useState<TotalsData>({ currentYear: 0, previousYear: 0 });
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [selectedPoint, setSelectedPoint] = React.useState<DetailedDataPoint | null>(null);
    const [viewMode, setViewMode] = React.useState<'recent' | 'all'>('recent');

    // Charger les données depuis l'API
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                // Utilisez votre fonction route() pour générer l'URL
                const response = await fetch(route('^statistic.monthly'), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                const data: ApiResponse = await response.json();

                if (!response.ok) {
                    console.log(data);
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                setChartData(data.chartData);
                setTotals(data.totals);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                setError('Impossible de charger les données. Veuillez vous connecter ou réessayer plus tard.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filtrer les données en fonction de la plage de temps sélectionnée
    const filteredData = React.useMemo(() => {
        if (chartData.length === 0) return [];

        // Si on est en mode "recent", on filtre selon la plage de temps
        if (viewMode === 'recent') {
            return chartData.filter((item) => {
                const date = new Date(item.date);
                const lastDate = new Date(chartData[chartData.length - 1].date);
                let daysToSubtract = 90;

                if (timeRange === '30d') {
                    daysToSubtract = 30;
                } else if (timeRange === '7d') {
                    daysToSubtract = 7;
                }

                const startDate = new Date(lastDate);
                startDate.setDate(startDate.getDate() - daysToSubtract);
                return date >= startDate;
            });
        }

        // Sinon, on retourne toutes les données
        return chartData;
    }, [chartData, timeRange, viewMode]);

    // Calculer les totaux pour les données filtrées
    const filteredTotals = React.useMemo(() => {
        if (filteredData.length === 0) return { currentYear: 0, previousYear: 0 };

        return {
            currentYear: filteredData.reduce((sum, item) => sum + item.currentYear, 0),
            previousYear: filteredData.reduce((sum, item) => sum + item.previousYear, 0),
        };
    }, [filteredData]);

    // Obtenir les données les plus récentes (dernière semaine)
    const recentData = React.useMemo(() => {
        if (chartData.length === 0) return [];

        const lastDate = new Date(chartData[chartData.length - 1].date);
        const startDate = new Date(lastDate);
        startDate.setDate(startDate.getDate() - 7);

        return chartData.filter((item) => new Date(item.date) >= startDate);
    }, [chartData]);

    // Calculer les tendances récentes
    const recentTrends = React.useMemo(() => {
        if (recentData.length < 2) return { currentYear: 0, previousYear: 0 };

        const currentYearValues = recentData.map((item) => item.currentYear);
        const previousYearValues = recentData.map((item) => item.previousYear);

        const currentYearAvg = currentYearValues.reduce((sum, val) => sum + val, 0) / currentYearValues.length;
        const previousYearAvg = previousYearValues.reduce((sum, val) => sum + val, 0) / previousYearValues.length;

        // Calculer la tendance (pente) sur les derniers jours
        const currentYearTrend = (currentYearValues[currentYearValues.length - 1] - currentYearValues[0]) / currentYearValues.length;
        const previousYearTrend = (previousYearValues[previousYearValues.length - 1] - previousYearValues[0]) / previousYearValues.length;

        return {
            currentYear: currentYearTrend,
            previousYear: previousYearTrend,
            currentYearAvg,
            previousYearAvg,
        };
    }, [recentData]);

    // Gérer le clic sur un point du graphique
    const handlePointClick = (data: ChartDataItem) => {
        const date = new Date(data.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        setSelectedPoint({ ...data, formattedDate });
        setIsModalOpen(true);
    };

    // Calculer le pourcentage de changement
    const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous) * 100;
    };

    // Obtenir la date la plus récente
    const getMostRecentDate = () => {
        if (chartData.length === 0) return 'N/A';

        const lastDate = new Date(chartData[chartData.length - 1].date);
        return lastDate.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <Card>
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <div className="flex items-center gap-2">
                            <CardTitle>Statistiques des événements</CardTitle>
                            <Badge variant="outline" className="ml-2">
                                Dernière mise à jour: {getMostRecentDate()}
                            </Badge>
                        </div>
                        <CardDescription>Comparaison entre l'année courante et l'année précédente</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'recent' | 'all')} className="w-[200px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="recent">Récent</TabsTrigger>
                                <TabsTrigger value="all">Tout</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        {viewMode === 'recent' && (
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-[160px] rounded-lg" aria-label="Sélectionner une période">
                                    <SelectValue placeholder="Derniers 7 jours" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="7d" className="rounded-lg">
                                        Derniers 7 jours
                                    </SelectItem>
                                    <SelectItem value="30d" className="rounded-lg">
                                        Derniers 30 jours
                                    </SelectItem>
                                    <SelectItem value="90d" className="rounded-lg">
                                        Derniers 3 mois
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </CardHeader>

                {!loading && !error && chartData.length > 0 && (
                    <div className="border-b px-6 py-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">{chartConfig.currentYear.label}</p>
                                    {recentTrends.currentYear > 0 && <TrendingUp className="h-4 w-4 text-green-500" />}
                                </div>
                                <p className="text-2xl font-bold">{filteredTotals.currentYear.toLocaleString()}</p>
                                {recentTrends.currentYear !== 0 && (
                                    <p className={`text-xs ${recentTrends.currentYear > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {recentTrends.currentYear > 0 ? '+' : ''}
                                        {recentTrends.currentYear.toFixed(1)} tendance sur 7 jours
                                    </p>
                                )}
                            </div>

                            <div className="rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground text-sm">{chartConfig.previousYear.label}</p>
                                    {recentTrends.previousYear > 0 && <TrendingUp className="h-4 w-4 text-green-500" />}
                                </div>
                                <p className="text-2xl font-bold">{filteredTotals.previousYear.toLocaleString()}</p>
                                {recentTrends.previousYear !== 0 && (
                                    <p className={`text-xs ${recentTrends.previousYear > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {recentTrends.previousYear > 0 ? '+' : ''}
                                        {recentTrends.previousYear.toFixed(1)} tendance sur 7 jours
                                    </p>
                                )}
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-muted-foreground text-sm">Différence</p>
                                <p className="text-2xl font-bold">{(filteredTotals.currentYear - filteredTotals.previousYear).toLocaleString()}</p>
                                <p className="text-muted-foreground text-xs">Entre année courante et précédente</p>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-muted-foreground text-sm">Variation</p>
                                <p className="text-2xl font-bold">
                                    {calculateChange(filteredTotals.currentYear, filteredTotals.previousYear).toFixed(1)}%
                                </p>
                                <p className="text-muted-foreground text-xs">Par rapport à l'année précédente</p>
                            </div>
                        </div>
                    </div>
                )}

                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    {loading ? (
                        <div className="flex h-[250px] items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                                <p className="text-muted-foreground mt-4 text-sm">Chargement des données...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="flex h-[250px] items-center justify-center">
                            <div className="flex items-center text-red-500">
                                <AlertCircle className="mr-2 h-5 w-5" />
                                <p>{error}</p>
                            </div>
                        </div>
                    ) : chartData.length === 0 ? (
                        <div className="flex h-[250px] items-center justify-center">
                            <p>Aucune donnée disponible. Veuillez vous connecter pour voir vos statistiques.</p>
                        </div>
                    ) : (
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={filteredData}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    onClick={(data) => data && data.activePayload && handlePointClick(data.activePayload[0].payload)}
                                >
                                    <defs>
                                        <linearGradient id="fillCurrentYear" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={chartConfig.currentYear.color} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={chartConfig.currentYear.color} stopOpacity={0.1} />
                                        </linearGradient>
                                        <linearGradient id="fillPreviousYear" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={chartConfig.previousYear.color} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={chartConfig.previousYear.color} stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => {
                                            const date = new Date(value);
                                            return date.toLocaleDateString('fr-FR', {
                                                month: 'short',
                                                day: 'numeric',
                                            });
                                        }}
                                    />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent
                                                labelFormatter={(value) => {
                                                    return new Date(value).toLocaleDateString('fr-FR', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    });
                                                }}
                                                indicator="dot"
                                            />
                                        }
                                    />

                                    {/* Ligne de référence pour la moyenne de l'année courante */}
                                    {viewMode === 'recent' && (
                                        <ReferenceLine
                                            y={recentTrends.currentYearAvg}
                                            stroke={chartConfig.currentYear.color}
                                            strokeDasharray="3 3"
                                            label={{
                                                value: 'Moy. année courante',
                                                position: 'insideBottomRight',
                                                fill: chartConfig.currentYear.color,
                                                fontSize: 10,
                                            }}
                                        />
                                    )}

                                    {/* Ligne de référence pour la moyenne de l'année précédente */}
                                    {viewMode === 'recent' && (
                                        <ReferenceLine
                                            y={recentTrends.previousYearAvg}
                                            stroke={chartConfig.previousYear.color}
                                            strokeDasharray="3 3"
                                            label={{
                                                value: 'Moy. année précédente',
                                                position: 'insideTopRight',
                                                fill: chartConfig.previousYear.color,
                                                fontSize: 10,
                                            }}
                                        />
                                    )}

                                    <Area
                                        dataKey="previousYear"
                                        type="monotone"
                                        fill="url(#fillPreviousYear)"
                                        stroke={chartConfig.previousYear.color}
                                        strokeWidth={2}
                                        activeDot={{ r: 6, onClick: (_, event) => handlePointClick(event.payload) }}
                                    />
                                    <Area
                                        dataKey="currentYear"
                                        type="monotone"
                                        fill="url(#fillCurrentYear)"
                                        stroke={chartConfig.currentYear.color}
                                        strokeWidth={2}
                                        activeDot={{ r: 6, onClick: (_, event) => handlePointClick(event.payload) }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    )}
                </CardContent>

                <CardFooter className="border-t px-6 py-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-muted-foreground text-xs">Cliquez sur un point du graphique pour voir les détails</div>
                        {viewMode === 'recent' && (
                            <div className="flex items-center">
                                <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                                <span className="text-muted-foreground text-xs">
                                    {timeRange === '7d' ? 'Derniers 7 jours' : timeRange === '30d' ? 'Derniers 30 jours' : 'Derniers 3 mois'}
                                </span>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>

            {isModalOpen && selectedPoint && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Détails des statistiques</DialogTitle>
                            <DialogDescription>Informations détaillées pour la date sélectionnée</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="text-muted-foreground h-5 w-5" />
                                <span className="font-medium">{selectedPoint.formattedDate}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg border p-4">
                                    <p className="text-muted-foreground text-sm">{chartConfig.currentYear.label}</p>
                                    <p className="text-2xl font-bold">{selectedPoint.currentYear}</p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <p className="text-muted-foreground text-sm">{chartConfig.previousYear.label}</p>
                                    <p className="text-2xl font-bold">{selectedPoint.previousYear}</p>
                                </div>
                            </div>

                            <div className="rounded-lg border p-4">
                                <p className="text-muted-foreground text-sm">Comparaison</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="font-medium">Différence</p>
                                    <p className="font-bold">{selectedPoint.currentYear - selectedPoint.previousYear}</p>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="font-medium">Variation</p>
                                    {selectedPoint.previousYear > 0 ? (
                                        <div
                                            className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${selectedPoint.currentYear >= selectedPoint.previousYear ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {Math.abs(calculateChange(selectedPoint.currentYear, selectedPoint.previousYear)).toFixed(1)}%
                                        </div>
                                    ) : (
                                        <p>N/A</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <DialogClose asChild>
                                    <Button variant="outline">Fermer</Button>
                                </DialogClose>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
