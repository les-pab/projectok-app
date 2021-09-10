<?php

use App\Http\Controllers\PartnerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CounselorController;
use App\Http\Controllers\WebinarController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//ROUTE FOR AUTH
Route::post('login', [LoginController::class, 'login'])->name('login');
Route::post('logout', [LogoutController::class, 'logout'])->name('logout');

//ROUTE FOR PARTNER COLLEGES
Route::get('partner/colleges', [PartnerController::class, 'index'])->name('partner.colleges');

//ROUTE FOR STUDENT
Route::post('student/connect', [StudentController::class, 'connectWithCounselor'])->name('student.connect');
Route::get('student/appointment/{id}', [StudentController::class, 'showAppointments'])->name('student.appointment');
Route::put('student/appointment', [StudentController::class, 'updateAppointment'])->name('student.appointment.update');
Route::post('student/appointment', [StudentController::class, 'storeAppointment'])->name('student.store.appointment');
Route::get('student/counselor/available', [StudentController::class, 'showAvailableCounselor'])->name('student.counselor.available');
Route::get('student/counselor/availability', [StudentController::class, 'showCounselorSchedule'])->name('student.counselor.availability');
Route::get('student/diary/{id}', [StudentController::class, 'showDiary'])->name('student.diary');
Route::put('student/diary', [StudentController::class, 'updateEntry'])->name('student.update.entry');
Route::post('student/diary', [StudentController::class, 'storeEntry'])->name('student.store.entry');
Route::post('student/profile/{_id}', [StudentController::class, 'upsertPhoto'])->name('student.update.profile.photo');
Route::resource('student', StudentController::class);

//ROUTE FOR COUNSELORS
Route::put('counselor/connect', [CounselorController::class, 'updateConnect'])->name('student.update.connect');
Route::get('counselor/appointment/{id}', [CounselorController::class, 'showAppointments'])->name('counselor.appointment');
Route::put('counselor/appointment', [CounselorController::class, 'updateAppointment'])->name('counselor.appointment.update');
Route::get('counselor/availability/{id}', [CounselorController::class, 'showAvailability'])->name('counselor.show.availability');
Route::post('counselor/availability', [CounselorController::class, 'storeAvailability'])->name('counselor.store.availability');
Route::delete('counselor/availability/{id}', [CounselorController::class, 'destroyAvailability'])->name('counselor.destroy.availability');
Route::post('counselor/profile/{_id}', [CounselorController::class, 'upsertPhoto'])->name('counselor.update.profile.photo');
Route::resource('counselor', CounselorController::class);

Route::resource('webinar', WebinarController::class);
