<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/municipality/dashboard', function () {
    return Inertia::render('MunicipalityDashboard', [
        'initialMunicipality' => request('municipality', 'Pasig City'),
        'officialName' => request('name', 'Maria Santos'),
        'officialRole' => request('role', 'Legal Desk Officer'),
    ]);
})->name('municipality.dashboard');
