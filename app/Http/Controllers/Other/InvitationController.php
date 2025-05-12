<?php

namespace App\Http\Controllers\Other;

use Inertia\Inertia;
use App\Models\Guest;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class InvitationController extends Controller
{
    public function index(int $guestId): Response
    {
        $guest = Guest::query()->findByInvitation($guestId);

        return Inertia::render('invitation/index', [
            'guest' => $guest,
        ]);
    }

    public function confirm(int $id): RedirectResponse
    {
        $guest = Guest::query()->findShow($id);

        return redirect()->route('invitation.index')
            ->with('success', "nous vous avons envoyé un message de confirmation dans votre boîte e-mail.");
    }
}
