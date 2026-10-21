<?php

namespace Database\Seeders;

use App\Models\Incident;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@justiceph.gov'],
            [
                'name' => 'JusticePH Administrator',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'designation' => 'Super Administrator',
                'phone' => '+63 900 000 0001',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 2. Municipality User
        $municipalityUser = User::updateOrCreate(
            ['email' => 'pasig.desk@justiceph.gov'],
            [
                'name' => 'Atty. Maria Santos',
                'password' => Hash::make('password'),
                'role' => 'municipality',
                'municipality' => 'Pasig City',
                'designation' => 'City Legal Desk Officer',
                'phone' => '+63 917 555 0100',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // Secondary Municipality User (Quezon City)
        User::updateOrCreate(
            ['email' => 'qc.desk@justiceph.gov'],
            [
                'name' => 'Officer Ramon Reyes',
                'password' => Hash::make('password'),
                'role' => 'municipality',
                'municipality' => 'Quezon City',
                'designation' => 'Barangay Justice Coordinator',
                'phone' => '+63 918 555 0200',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 3. Regular Citizen User
        $citizenUser = User::updateOrCreate(
            ['email' => 'citizen@justiceph.gov'],
            [
                'name' => 'Juan Dela Cruz',
                'password' => Hash::make('password'),
                'role' => 'user',
                'municipality' => 'Pasig City',
                'designation' => null,
                'phone' => '+63 918 123 4567',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // Seed Sample Incidents
        Incident::updateOrCreate(
            ['case_number' => 'MN-2026-088'],
            [
                'user_id' => $citizenUser->id,
                'citizen_name' => 'Eduardo Ramos',
                'phone' => '+63 917 555 0192',
                'municipality' => 'Pasig City',
                'barangay' => 'Brgy. Kapasigan',
                'category' => 'Legal Assistance / Consultation',
                'urgency' => 'urgent',
                'title' => 'Wrongful eviction notice served without 30-day barangay conciliation',
                'description' => 'Tenant received immediate notice to vacate with threats of padlock. Requesting emergency PAO injunction and barangay mediation support before 5:00 PM.',
                'status' => 'pending',
                'coordinates' => '14.5583, 121.0833',
            ]
        );

        Incident::updateOrCreate(
            ['case_number' => 'MN-2026-085'],
            [
                'user_id' => null,
                'citizen_name' => 'Anonymous Citizen',
                'phone' => '+63 920 444 8812',
                'municipality' => 'Pasig City',
                'barangay' => 'Brgy. San Antonio',
                'category' => 'Domestic & Family Safety',
                'urgency' => 'urgent',
                'title' => 'Urgent VAWC protective order filing request (RA 9262)',
                'description' => 'Citizen requires immediate legal escort and temporary protection order (BPO) assistance from the local barangay desk and CSWD.',
                'status' => 'assigned',
                'assigned_to' => 'Brgy. San Antonio VAWC Desk & CSWD',
                'coordinates' => '14.5826, 121.0617',
            ]
        );

        Incident::updateOrCreate(
            ['case_number' => 'MN-2026-079'],
            [
                'user_id' => null,
                'citizen_name' => 'Marites Alonzo',
                'phone' => '+63 918 222 7109',
                'municipality' => 'Pasig City',
                'barangay' => 'Brgy. Ugong',
                'category' => 'Labor & Wage Dispute',
                'urgency' => 'routine',
                'title' => 'Unpaid final pay and withholding of 13th month salary',
                'description' => 'Security guard terminated without due process hearing. Needs preparation for SEnA (Single Entry Approach) mediation conference.',
                'status' => 'under_review',
                'coordinates' => '14.5889, 121.0772',
            ]
        );

        Incident::updateOrCreate(
            ['case_number' => 'MN-2026-074'],
            [
                'user_id' => null,
                'citizen_name' => 'Roberto Valerio',
                'phone' => '+63 927 888 3401',
                'municipality' => 'Pasig City',
                'barangay' => 'Brgy. Rosario',
                'category' => 'Civil & Human Rights',
                'urgency' => 'high',
                'title' => 'Warrantless detention inquiry and custody rights assistance',
                'description' => 'Family member detained beyond 36-hour inquest period under Art. 125 RPC without formal charges. Legal counsel required for inquest.',
                'status' => 'assigned',
                'assigned_to' => 'PAO District Office Pasig',
                'coordinates' => '14.5891, 121.0898',
            ]
        );

        Incident::updateOrCreate(
            ['case_number' => 'MN-2026-068'],
            [
                'user_id' => null,
                'citizen_name' => 'Luzviminda Santos',
                'phone' => '+63 905 111 6398',
                'municipality' => 'Pasig City',
                'barangay' => 'Brgy. Pinagbuhatan',
                'category' => 'Barangay Dispute & Mediation',
                'urgency' => 'routine',
                'title' => 'Boundary encroachment and easement conciliation resolved',
                'description' => 'Amicable settlement reached through Lupon Tagapamayapa. Formal Kasunduan signed by both parties.',
                'status' => 'resolved',
                'assigned_to' => 'Lupon Tagapamayapa Brgy. Pinagbuhatan',
                'coordinates' => '14.5492, 121.0964',
                'resolution_notes' => 'Amicable settlement signed on Oct 19, 2026.',
            ]
        );
    }
}
