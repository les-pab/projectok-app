<?php

namespace App\Http\Controllers;

use App\Events\AppointmentEvent;
use App\Events\CounselorAppointmentEvent;
use App\Events\CounselorImmediateCounselingEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Diary;
use App\Models\Availability;
use App\Models\Student;
use App\Models\Slot;
use App\Models\Counselor;
use App\Models\Appointment;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class StudentController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function connectWithCounselor(Request $request)
    {
        $student = Student::find($request->student_id);
        $appointment = $student->appointment()->create([
            'counselor_id' => $request->counselor_id,
            'date' => $request->date,
            'time' => $request->date,
            'link' => "",
            'status' => "pending"
        ]);
        $appointment->load(['student']);

        CounselorImmediateCounselingEvent::dispatch($request->counselor_id, $request->student_id, $appointment->toJson());
        return response()->json([], 200);
    }

    public function storeAppointment(Request $request)
    {
        $student = Student::find($request->student_id);
        $appointment = $student->appointment()->create([
            'counselor_id' => $request->counselor_id,
            'date' => $request->date,
            'time' => $request->time,
            'slot_id' => $request->slot_id,
            'link' => "",
            'status' => "pending"
        ]);

        $slot = Slot::find($request->slot_id);
        $slot->available = false;
        $slot->save();

        $appointments = Student::find($request->student_id)->appointment()->with(['counselor', 'slot'])->orderBy('date', 'asc')->get();
        $availability = Counselor::with(['availability', 'availability.slot'])->get();

        $appointmentWithStudent = $appointment->load(['student', 'slot']);
        CounselorAppointmentEvent::dispatch($appointment->counselor_id, $appointmentWithStudent->toJson());

        return response()->json([$appointments, $availability], 200);
    }

    public function storeEntry(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required'],
        ]);

        Student::find($request->student_id)->diary()->create([
            'title' => $request->title,
            'content' => $request->content,
            'date' => $request->date
        ]);

        $diary = Student::find($request->student_id)->diary()->orderBy('date', 'desc')->get();

        return response()->json([$diary], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'last_name' => ['required'],
            'first_name' => ['required'],
            'middle_name' => ['required'],
            'age' => ['required'],
            'gender' => ['required'],
            'school' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', 'min:8'],
            'password_confirmation' => ['required', 'same:password', 'min:8']
        ]);

        $user = Student::create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'age' => $request->age,
            'gender' => $request->gender,
            'school' => $request->school,
            'email' => $request->email,
        ])->user()->create([
            'username' => $request->email,
            'password' => Hash::make($request->password),
            'type' => "student"
        ]);

        $credentials = ['username' =>  $request->email, 'password' => $request->password];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $type = $user->type;
            $user = Student::where('_id', $user->student_id)->first();

            return response()->json([
                'success' => true,
                '_id' => $user->_id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'type' => $type,
            ], 200);
        }
    }

    public function showAvailableCounselor()
    {
        $availability = Counselor::where('online', '=', true)->with(['appointment'])->get();
        return response()->json([$availability], 200);
    }

    public function showCounselorSchedule()
    {
        $availability = Counselor::with(['availability', 'availability.slot'])->get();
        return response()->json([$availability], 200);
    }

    public function showAppointments($_id)
    {
        $appointments = Student::find($_id)->appointment()->with(['counselor', 'slot'])->orderBy('date', 'asc')->get();
        return response()->json([$appointments], 200);
    }

    public function showDiary($_id)
    {
        $diary = Student::find($_id)->diary()->orderBy('date', 'desc')->get();
        return response()->json([$diary], 200);
    }

    public function show($_id)
    {
        // $counselor = Counselor::with('user')->where('_id', '=', $_id);
        $student = Student::find($_id);
        return response()->json([$student], 200);
    }

    public function edit($id)
    {
        //
    }

    public function updateAppointment(Request $request)
    {
        switch ($request->type) {
            case "accept":
                $request->validate([
                    'link' => ['required'],
                ]);

                $appointment = Appointment::find($request->appointment_id);
                $appointment->link = $request->link;
                $appointment->email = $request->email;
                $appointment->contact = $request->contact;
                $appointment->status = "accepted";
                $appointment->issued_by = "student";
                $appointment->save();

                $appointments = Student::find($request->student_id)->appointment()->with(['counselor', 'slot'])->orderBy('date', 'asc')->get();
                return response()->json([$appointments], 200);

                break;

            case "cancel":
                $request->validate([
                    'reason' => ['required'],
                ]);

                $appointment = Appointment::find($request->appointment_id);
                $appointment->reason = $request->reason;
                $appointment->status = "canceled";
                $appointment->issued_by = "student";
                $appointment->save();

                $slot = Slot::find($request->slot_id);
                $slot->available = true;
                $slot->save();

                $appointments = Student::find($request->student_id)->appointment()->with(['counselor', 'slot'])->orderBy('date', 'asc')->get();

                $appointmentWithStudent = $appointment->load(['student', 'slot']);
                CounselorAppointmentEvent::dispatch($appointment->counselor_id, $appointmentWithStudent->toJson());

                return response()->json([$appointments], 200);
                break;

            case "reschedule":
                $request->validate([
                    'reason' => ['required'],
                ]);

                $existing = Appointment::where([
                    ['date', '=', $request->date],
                    ['time', '=', $request->time],
                ])->get();

                $slot = Slot::updateOrCreate(
                    ['date' => $request->date, 'time' => $request->time],
                    ['available' => false]
                );

                if ($existing->count() !== 0) {
                    return response()->json([
                        'errors' => [
                            'mathching' => 'You have an appointment for the date and time you have selected.'
                        ]
                    ], 422);
                } else {
                    $appointment = Appointment::find($request->appointment_id);
                    $appointment->date = $request->date;
                    $appointment->time = $request->time;
                    $appointment->link = $request->link;
                    $appointment->email = $request->email;
                    $appointment->contact = $request->contact;
                    $appointment->status = "pending";
                    $appointment->issued_by = "student";
                    $appointment->save();

                    $slot = Slot::find($request->slot_id);
                    $slot->available = true;
                    $slot->save();

                    $appointments = Student::find($request->student_id)->appointment()->with(['counselor', 'slot'])->orderBy('date', 'asc')->get();

                    $appointmentWithStudent = $appointment->load(['student', 'slot']);
                    CounselorAppointmentEvent::dispatch($appointment->counselor_id, $appointmentWithStudent->toJson());

                    return response()->json([$appointments], 200);
                }
                break;
        }
    }

    public function updateEntry(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'content' => ['required'],
        ]);

        $entry = Diary::find($request->entry_id);
        $entry->title = $request->title;
        $entry->content = $request->content;
        $entry->save();

        $diary = Student::find($request->student_id)->diary()->orderBy('date', 'desc')->get();
        return response()->json([$diary], 200);
    }

    public function upsertPhoto(Request $request, $_id)
    {
        if ($request->hasFile('image')) {
            $path = Storage::putFile('public', $request->file('image'));
            $fileName = explode("/", $path);

            Student::where('_id', $_id)->update([
                'profile_picture' => $fileName[1]
            ]);

            return response()->json(["path" => $fileName[1]], 200);
        } else {
            return response()->json(["message" => "No image selected."], 422);
        }
    }

    public function update(Request $request, $_id)
    {
        Student::where('_id', $_id)->update([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'age' => $request->age,
            'gender' => $request->gender,
            'email' => $request->email,
        ]);

        $student = Student::find($_id);
        return response()->json([$student], 200);
    }

    public function destroy($id)
    {
        //
    }
}
