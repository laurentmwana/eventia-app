import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notification',
        href: '/notification',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notification" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-5 md:min-h-min"></div>
            </div>
        </AppLayout>
    );
}

// "use client"

// import * as React from "react"
// import { Bell, Check, ChevronRight, Eye, Info, MessageSquare, X } from "lucide-react"
// import { format, formatDistanceToNow } from "date-fns"
// import { fr } from "date-fns/locale"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"

// // Type pour une notification
// interface Notification {
//   id: string
//   title: string
//   type: "info" | "success" | "warning" | "error" | "message"
//   message: string
//   read_at: string | null
//   created_at: string
// }

// // Props pour le composant de notifications
// interface NotificationsProps {
//   notifications: Notification[]
//   onMarkAsRead?: (id: string) => void
//   onMarkAllAsRead?: () => void
//   onDeleteNotification?: (id: string) => void
//   maxNotifications?: number
// }

// export function NotificationsComponent({
//   notifications,
//   onMarkAsRead,
//   onMarkAllAsRead,
//   onDeleteNotification,
//   maxNotifications = 5,
// }: NotificationsProps) {
//   const [selectedNotification, setSelectedNotification] = React.useState<Notification | null>(null)
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false)
//   const [displayedNotifications, setDisplayedNotifications] = React.useState<Notification[]>([])
//   const [showAll, setShowAll] = React.useState(false)

//   // Mettre à jour les notifications affichées lorsque les notifications ou showAll changent
//   React.useEffect(() => {
//     if (showAll) {
//       setDisplayedNotifications(notifications)
//     } else {
//       setDisplayedNotifications(notifications.slice(0, maxNotifications))
//     }
//   }, [notifications, showAll, maxNotifications])

//   // Obtenir le nombre de notifications non lues
//   const unreadCount = React.useMemo(() => {
//     return notifications.filter((notification) => !notification.read_at).length
//   }, [notifications])

//   // Gérer l'ouverture du modal de détails
//   const handleViewDetails = (notification: Notification) => {
//     setSelectedNotification(notification)
//     setIsDialogOpen(true)

//     // Marquer comme lu si la fonction est fournie
//     if (onMarkAsRead && !notification.read_at) {
//       onMarkAsRead(notification.id)
//     }
//   }

//   // Obtenir l'icône en fonction du type de notification
//   const getNotificationIcon = (type: Notification["type"]) => {
//     switch (type) {
//       case "info":
//         return <Info className="h-4 w-4 text-blue-500" />
//       case "success":
//         return <Check className="h-4 w-4 text-green-500" />
//       case "warning":
//         return <Info className="h-4 w-4 text-amber-500" />
//       case "error":
//         return <X className="h-4 w-4 text-red-500" />
//       case "message":
//         return <MessageSquare className="h-4 w-4 text-indigo-500" />
//       default:
//         return <Bell className="h-4 w-4 text-gray-500" />
//     }
//   }

//   // Formater la date relative (il y a X minutes/heures/jours)
//   const formatRelativeDate = (dateString: string) => {
//     return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: fr })
//   }

//   // Formater la date complète
//   const formatFullDate = (dateString: string | null) => {
//     if (!dateString) return "Non lu"
//     return format(new Date(dateString), "dd MMMM yyyy à HH:mm", { locale: fr })
//   }

//   return (
//     <>
//       <Card className="w-full max-w-md">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <div>
//             <CardTitle className="text-xl">Notifications</CardTitle>
//             <CardDescription>
//               {unreadCount > 0
//                 ? `Vous avez ${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
//                 : "Toutes les notifications ont été lues"}
//             </CardDescription>
//           </div>
//           {unreadCount > 0 && onMarkAllAsRead && (
//             <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
//               Tout marquer comme lu
//             </Button>
//           )}
//         </CardHeader>
//         <CardContent className="p-0">
//           {displayedNotifications.length === 0 ? (
//             <div className="flex h-32 items-center justify-center">
//               <p className="text-sm text-muted-foreground">Aucune notification</p>
//             </div>
//           ) : (
//             <ScrollArea className="h-[320px]">
//               <div className="space-y-1">
//                 {displayedNotifications.map((notification) => (
//                   <div key={notification.id} className="relative">
//                     <div
//                       className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50 ${
//                         !notification.read_at ? "bg-muted/20" : ""
//                       }`}
//                     >
//                       <div className="flex h-8 w-8 items-center justify-center rounded-full border">
//                         {getNotificationIcon(notification.type)}
//                       </div>
//                       <div className="flex-1 space-y-1">
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium leading-none">{notification.title}</p>
//                           <Badge variant={notification.read_at ? "outline" : "default"} className="ml-2">
//                             {notification.read_at ? "Lu" : "Non lu"}
//                           </Badge>
//                         </div>
//                         <p className="line-clamp-2 text-sm text-muted-foreground">{notification.message}</p>
//                         <div className="flex items-center justify-between pt-1">
//                           <p className="text-xs text-muted-foreground">{formatRelativeDate(notification.created_at)}</p>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="h-auto p-0 text-xs font-medium text-primary"
//                             onClick={() => handleViewDetails(notification)}
//                           >
//                             Voir plus <ChevronRight className="ml-1 h-3 w-3" />
//                           </Button>
//                         </div>
//                       </div>
//                       {onDeleteNotification && (
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-2 top-2 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
//                           onClick={() => onDeleteNotification(notification.id)}
//                         >
//                           <X className="h-3 w-3" />
//                           <span className="sr-only">Supprimer</span>
//                         </Button>
//                       )}
//                     </div>
//                     <Separator />
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           )}
//         </CardContent>
//         {notifications.length > maxNotifications && (
//           <CardFooter className="flex justify-center p-4">
//             <Button variant="outline" onClick={() => setShowAll(!showAll)}>
//               {showAll ? "Afficher moins" : `Voir toutes les notifications (${notifications.length})`}
//             </Button>
//           </CardFooter>
//         )}
//       </Card>

//       {/* Modal de détails */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         {selectedNotification && (
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle className="flex items-center gap-2">
//                 {getNotificationIcon(selectedNotification.type)}
//                 {selectedNotification.title}
//               </DialogTitle>
//               <DialogDescription>{formatRelativeDate(selectedNotification.created_at)}</DialogDescription>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="rounded-lg border p-4">
//                 <p className="whitespace-pre-wrap text-sm">{selectedNotification.message}</p>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-1 text-muted-foreground">
//                   <Eye className="h-4 w-4" />
//                   <span>
//                     {selectedNotification.read_at ? `Lu le ${formatFullDate(selectedNotification.read_at)}` : "Non lu"}
//                   </span>
//                 </div>
//                 <Badge>{selectedNotification.type}</Badge>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                 Fermer
//               </Button>
//               {onDeleteNotification && (
//                 <Button
//                   variant="destructive"
//                   onClick={() => {
//                     onDeleteNotification(selectedNotification.id)
//                     setIsDialogOpen(false)
//                   }}
//                 >
//                   Supprimer
//                 </Button>
//               )}
//             </DialogFooter>
//           </DialogContent>
//         )}
//       </Dialog>
//     </>
//   )
// }
