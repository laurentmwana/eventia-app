import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BaseLayout } from '@/layouts/base-layout';
import { BookOpen } from 'lucide-react';

export default function CourseInfo() {
    return (
        <BaseLayout title="Informations sur le cours">
            <main>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <BookOpen className="text-primary h-5 w-5" />
                            <CardTitle>Informations sur le cours</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Génie Logiciel</h3>
                                <p className="text-muted-foreground text-sm">
                                    Application d’une approche scientifique et d’ingénierie au développement de logiciels.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <h4 className="text-muted-foreground text-sm font-medium">Professeur</h4>
                                    <p>Dr. Justin NDUHURA MUNGA</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-muted-foreground text-sm font-medium">Mention</h4>
                                    <p>Informatique</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-muted-foreground text-sm font-medium">Année académique</h4>
                                    <p>2023-2024</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <div className="space-y-3">
                                <div className="bg-muted rounded-lg p-3 text-center">
                                    <div className="text-2xl font-bold">30</div>
                                    <div className="text-sm font-medium">heures</div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border p-4">
                            <h3 className="mb-2 font-medium">Objectifs du cours</h3>
                            <ul className="space-y-1 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="bg-primary/10 text-primary rounded-full p-1">✓</span>
                                    <span>Comprendre le processus et les enjeux du développement logiciel</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-primary/10 text-primary rounded-full p-1">✓</span>
                                    <span>oncevoir des logiciels robustes et évolutifs (code, sécurité, qualité)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-primary/10 text-primary rounded-full p-1">✓</span>
                                    <span>Gérer efficacement les projets logiciels</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-primary/10 text-primary rounded-full p-1">✓</span>
                                    <span>Comprendre les enjeux éthiques et professionnel</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </BaseLayout>
    );
}
