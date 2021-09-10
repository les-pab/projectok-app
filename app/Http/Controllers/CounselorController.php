<?php

namespace App\Http\Controllers;

use App\Events\AppointmentEvent;
use App\Events\StudentAppointmentEvent;
use App\Events\StudentImmediateCounselingEvent;
use App\Models\Appointment;
use App\Models\Counselor;
use App\Models\User;
use App\Models\Slot;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class CounselorController extends Controller
{
    public function index()
    {
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
    }

    public function storeAvailability(Request $request)
    {
        $counselor = Counselor::find($request->counselor_id);
        $availability = $counselor->availability()->create([
            'date' => $request->date,
            'time' => $request->time,
        ]);
        foreach ($request->slots as $slot) {
            $availability->slot()->create([
                'date' => $slot["date"],
                'time' => $slot["time"],
                'available' => $slot["available"]
            ]);
        }

        $availability = Counselor::find($request->counselor_id)->availability()->get();

        return response()->json([$availability], 200);
    }

    public function showAppointments($_id)
    {
        $appointments = Counselor::find($_id)->appointment()->with(['student', 'slot'])->get();
        return response()->json([$appointments], 200);
    }

    public function showAvailability($_id)
    {
        $availability = Counselor::find($_id)->availability()->get();
        return response()->json([$availability], 200);
    }

    public function show($_id)
    {
        $counselor = Counselor::find($_id);
        return response()->json([$counselor], 200);
    }

    public function edit($id)
    {
        //
    }

    public function updateConnect(Request $request)
    {
        switch ($request->type) {

            case "accept":
                $request->validate([
                    'link' => ['required'],
                ]);

                $appointment = Appointment::find($request->appointment_id);
                $appointment->link = $request->link;
                $appointment->status = "accepted";
                $appointment->issued_by = "counselor";
                $appointment->save();

                $appointmentWithCounselor = $appointment->load(['counselor']);
                StudentImmediateCounselingEvent::dispatch($appointment->student_id, $appointmentWithCounselor->toJson());

                $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                return response()->json([$appointmentsWithStudent], 200);
                break;

            case "cancel":
                $appointment = Appointment::find($request->appointment_id);
                $appointment->status = "canceled";
                $appointment->issued_by = "counselor";
                $appointment->save();

                // CounselorAppointmentEvent::dispatch($appointment);

                // $appointmentWithCounselor = Appointment::find($request->appointment_id)->with(['counselor', 'slot']);
                // event(new StudentAppointmentEvent($appointment->student_id, $appointmentWithCounselor->toJson()));
                $appointmentWithCounselor = $appointment->load(['counselor']);
                StudentImmediateCounselingEvent::dispatch($appointment->student_id, $appointmentWithCounselor->toJson());

                $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                return response()->json([$appointmentsWithStudent], 200);
                break;
        }
    }

    public function updateAppointment(Request $request)
    {
        switch ($request->type) {
            case "completed":
                $appointment = Appointment::find($request->appointment_id);
                $appointment->status = "completed";
                $appointment->issued_by = "counselor";
                $appointment->save();

                $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                return response()->json([$appointmentsWithStudent], 200);
                break;

            case "accept":
                $request->validate([
                    'link' => ['required'],
                ]);

                $appointment = Appointment::find($request->appointment_id);
                $appointment->link = $request->link;
                $appointment->email = $request->email;
                $appointment->contact = $request->contact;
                $appointment->status = "accepted";
                $appointment->issued_by = "counselor";
                $appointment->save();

                // CounselorAppointmentEvent::dispatch($appointment);
                // $appointmentWithCounselor = Appointment::find($request->appointment_id)->with(['counselor', 'slot']);
                // event(new StudentAppointmentEvent($appointment->student_id, $appointmentWithCounselor->toJson()));
                $appointmentWithCounselor = $appointment->load(['counselor', 'slot']);
                StudentAppointmentEvent::dispatch($appointment->student_id, $appointmentWithCounselor->toJson());

                $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                return response()->json([$appointmentsWithStudent], 200);
                break;

            case "cancel":
                $request->validate([
                    'reason' => ['required'],
                ]);

                $appointment = Appointment::find($request->appointment_id);
                $appointment->reason = $request->reason;
                $appointment->status = "canceled";
                $appointment->issued_by = "counselor";
                $appointment->save();

                $slot = Slot::find($request->slot_id);
                $slot->available = true;
                $slot->save();

                // CounselorAppointmentEvent::dispatch($appointment);

                // $appointmentWithCounselor = Appointment::find($request->appointment_id)->with(['counselor', 'slot']);
                // event(new StudentAppointmentEvent($appointment->student_id, $appointmentWithCounselor->toJson()));
                $appointmentWithCounselor = $appointment->load(['counselor', 'slot']);
                StudentAppointmentEvent::dispatch($appointment->student_id, $appointmentWithCounselor->toJson());

                $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                return response()->json([$appointmentsWithStudent], 200);
                break;

            case "reschedule":
                $request->validate([
                    'reason' => ['required'],
                    'link' => ['required']
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
                    $appointment->slot_id = $slot->_id;
                    $appointment->date = $request->date;
                    $appointment->time = $request->time;
                    $appointment->link = $request->link;
                    $appointment->email = $request->email;
                    $appointment->contact = $request->contact;
                    $appointment->status = "rescheduled";
                    $appointment->issued_by = "counselor";
                    $appointment->reason = $request->reason;
                    $appointment->save();

                    $slot = Slot::find($request->slot_id);
                    $slot->available = true;
                    $slot->save();

                    // CounselorAppointmentEvent::dispatch($appointment);

                    // $appointmentWithCounselor = Appointment::find($request->appointment_id)->with(['counselor', 'slot']);
                    $appointmentWithCounselor = $appointment->load(['counselor', 'slot']);
                    // event(new StudentAppointmentEvent($appointment->student_id, $appointmentWithCounselor->toJson()));
                    StudentAppointmentEvent::dispatch($appointment->student_id, $appointmentWithCounselor->toJson());

                    $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                    return response()->json([$appointmentsWithStudent], 200);
                }
                break;

            case "note":
                $appointment = Appointment::find($request->appointment_id);
                $appointment->note = $request->note;
                $appointment->issued_by = "counselor";
                $appointment->save();

                $appointmentsWithStudent = Counselor::find($request->counselor_id)->appointment()->with(['student', 'slot'])->get();
                return response()->json([$appointmentsWithStudent], 200);
                break;
        }
    }

    public function upsertPhoto(Request $request, $_id)
    {
        if ($request->hasFile('image')) {
            $path = Storage::putFile('public', $request->file('image'));
            $fileName = explode("/", $path);

            Counselor::where('_id', $_id)->update([
                'profile_picture' => $fileName[1]
            ]);

            return response()->json(["path" => $fileName[1]], 200);
        } else {
            return response()->json(["message" => "No image selected."], 422);
        }
    }

    public function update(Request $request, $_id)
    {
        Counselor::where('_id', $_id)->update([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'contact' => $request->contact,
            'email' => $request->email,
            'designation' => $request->designation,
            'hei' => $request->hei,
            'address' => $request->address,
        ]);

        $counselor = Counselor::find($_id);
        return response()->json([$counselor], 200);
    }

    public function destroyAvailability($_id)
    {
        Availability::destroy($_id);
    }

    public function destroy($_id)
    {
    }
}
