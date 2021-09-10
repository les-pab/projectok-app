<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Counselor;


class LogoutController extends Controller
{
    use AuthenticatesUsers;

    public function logout(Request $request)
    {
        switch ($request->type) {
            case "student":
                $user = Student::find($request->_id);
                $user->online = false;
                $user->save();

                Auth::logout();

                return response()->json([], 200);
                break;
            case "counselor":
                $user = Counselor::find($request->_id);
                $user->online = false;
                $user->save();

                Auth::logout();

                return response()->json([], 200);
                break;
        }
    }
}
