<?php
// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return match ($user->role) {
                'manager' => redirect()->route('manager.dashboard'),
                'staff_ppic' => redirect()->route('ppic.dashboard'),
                'staff_production' => redirect()->route('production.dashboard'),
                default => redirect()->route('manager.dashboard'),
            };
        }
        return Inertia::render('auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ]);
        }

        $request->session()->regenerate();
        $user = Auth::user();

        return match ($user->role) {
            'manager' => redirect()->route('manager.dashboard'),
            'staff_ppic' => redirect()->route('ppic.dashboard'),
            'staff_production' => redirect()->route('production.dashboard'),
            default => redirect()->route('manager.dashboard'),
        };
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
