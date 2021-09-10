<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\Student;
use App\Models\Counselor;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required'],
            'password' => ['required', 'min:8']
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $type = $user->type;

            switch ($type) {
                case "student":
                    $user = Student::find($user->student_id);
                    $user->online = true;
                    $user->save();

                    return response()->json([
                        'success' => true,
                        '_id' => $user->_id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'type' => $type,
                    ], 200);
                    break;

                case "counselor":
                    $user = Counselor::find($user->counselor_id);
                    $user->online = true;
                    $user->save();

                    return response()->json([
                        'success' => true,
                        '_id' => $user->_id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'type' => $type,
                    ], 200);
                    break;
            }
        }

        return response()->json([], 401);
    }
}
