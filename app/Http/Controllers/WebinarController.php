<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Counselor;
use App\Models\Webinar;

class WebinarController extends Controller
{
    public function index()
    {
        $webinars = Webinar::orderBy('date', 'desc')->get();
        return response()->json([$webinars], 200);
    }
    public function create()
    {
        //
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'date' => ['required'],
            'time' => ['required'],
            'link' => ['required'],
        ]);

        $counsellor = Counselor::find($request->counselor_id);
        $webinar = $counsellor->webinar()->updateOrCreate([
            '_id' => $request->webinar_id,
        ], [
            'title' => $request->title,
            'date' => $request->date,
            'time' => $request->time,
            'link' => $request->link,
        ]);

        $webinars = $counsellor->webinar()->orderBy('date', 'desc')->get();
        return response()->json([$webinars], 200);
    }

    public function show($_id)
    {
        $counsellor = Counselor::find($_id);
        $webinars = $counsellor->webinar()->orderBy('date', 'desc')->get();
        return response()->json([$webinars], 200);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($_id)
    {
        $webinar = Webinar::find($_id);
        $webinar->delete();

        return response()->json([], 200);
    }
}
