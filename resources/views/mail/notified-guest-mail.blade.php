<x-mail::message>
Hey, {{ $assignment->guest->name  }}

{{  $assignment->guest->event->user->name  }} a le plaisir de vous inviter à l'événement « {{  $assignment->guest->event->title }} » qui aura lieu {{ $assignment->guest->event->start_at }}.

Pour en savoir plus et confirmer votre présence, veuillez cliquer sur le bouton ci-dessous :

<x-mail::button :url="''">
Voir l'invitation
</x-mail::button>

Nous espérons vous compter parmi nous lors de cet événement.

Merci,

{{ config('app.name') }}
</x-mail::message>
