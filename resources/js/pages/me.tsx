import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BaseLayout } from '@/layouts/base-layout';
import { Link } from '@inertiajs/react';
import { Calendar, Code, GraduationCap, MapPin, Option, User } from 'lucide-react';

export default function Me() {
    return (
        <BaseLayout title="Moi">
            <main>
                <Card className="mx-auto max-w-2xl">
                    <CardHeader className="text-center">
                        <div className="mb-4 flex justify-center">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary/10 text-primary text-xl">LM</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-xl">Développeur Fullstack</CardTitle>
                        <CardDescription>Université de Kinshasa</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <User className="text-muted-foreground h-4 w-4" />
                                <span className="text-muted-foreground">Noms : </span>
                                <span>Mwanamputu Laurent</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Option className="text-muted-foreground h-4 w-4" />
                                <span className="text-muted-foreground">Sexe : </span>
                                <span>Masculin</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="text-muted-foreground h-4 w-4" />
                                <span className="text-muted-foreground">Âge : </span>
                                <span>25 ans</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="text-muted-foreground h-4 w-4" />
                                <span className="text-muted-foreground">Localisation : </span>
                                <span>Kinshasa, RDC</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <GraduationCap className="text-muted-foreground h-4 w-4" />
                                <span className="text-muted-foreground">Promotion : </span>
                                <span>M1 Informatique</span>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="mb-2 flex items-center gap-2 font-medium">
                                <Code className="h-4 w-4" /> Compétences techniques
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Next.js</Badge>
                                <Badge variant="secondary">React</Badge>
                                <Badge variant="secondary">PHP</Badge>
                                <Badge variant="secondary">Laravel</Badge>
                                <Badge variant="secondary">JavaScript</Badge>
                                <Badge variant="secondary">TypeScript</Badge>
                                <Badge variant="secondary">HTML/CSS</Badge>
                                <Badge variant="secondary">Tailwind CSS</Badge>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button asChild>
                                <Link href={route('course')}>Plus d'information sur le cours</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </BaseLayout>
    );
}
