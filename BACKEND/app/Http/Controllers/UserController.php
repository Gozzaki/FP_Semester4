<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Firebase\JWT\JWT;
use App\Models\Paslon;

class UserController extends Controller
{

    // ==== register
    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            "nis" => "required|unique:users",
            "nama" => "required|string",
            "password" => "required|string",
            
            
        ]);

        $user = User::create([
            "nis" => $request->nis,
            "nama" => $request->nama,
            "password" => bcrypt($request->password),
            "role" => "user"
            
        ]);

        return response()->json([
            "message" => "Success",
            "data" => $user,
        ]);

    }

    // === login
    public function login(Request $request)
    {
        $credentials = $request->only(["nis", "password"]);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                "message" => "Unauthorized",
            ], 401);
        }

        $payload = [
            'id' => auth()->user()->id,
            'role' => auth()->user()->role,
            'iat' => time(),
            // 30 days
            'exp' => time() + (60 * 60 * 24 * 30),
        ];

        $token = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return response()->json([
            "message" => "Success",
            "data" => [
                "token" => $token,
                "user" => auth()->user(),
            ],
        ]);
    }

    
    // === liat paslon
    public function get_data_paslon(Request $request){

        $paslon = Paslon::all();

        return response()->json([
            "message" => "Success",
            "data" => $paslon,
        ]);

    
         
    }

    // ==== liat paslon by id
     public function get_paslon_by_id (Request $request,$id){
        $paslon = Paslon::find($id);

        if (!$paslon) return response()->json([
            "success" => false,
            "message" => "paslon tidak ditemukan",
        ], 404);

        return response()->json([
            "success" => true,
            "message" => "Berhasil mendapatkan paslon",
            "data" => $paslon,
        ]);
     }
    //  ==== adddd paslonnnnnn
     public function post_data_paslon (Request $request)
     {
        $v = Validator::make($request->all(), [
            "name" => "required|string",
            "photo" => "required|mimes:jpeg,png,jpg",
            "vision" => "required|string",
            "mission" => "required|string"          
        ]);

        if ($v->fails()) {
            $errs = $v->errors()->all();
            $err = join(", ", $errs);

            return response()->json([
                "success" => false,
                "message" => "Gagal membuat paslon",
                "errors" => $err,
            ], 400);
        }

        $photo_paslon = $request->file("photo");
        $photo_paslon_name = time() . "_" . $photo_paslon->getClientOriginalName();
        $photo_paslon->move('images/paslon', $photo_paslon_name);

        try {
            $paslon = Paslon::create([
                "name" => $request->name,
                "vision" => $request->vision,
                "mission" => $request->mission,
                "photo" => "images/paslon/". $photo_paslon_name,
            ]);
    
                return response()->json([
                "success" => true,
                "message" => "Berhasil membuat paslon",
                "data" => $paslon,
            ]);
        } catch (\Throwable $th) {
            if (file_exists("images/paslon/" . $photo_paslon_name)) {
                unlink("images/paslon/" . $photo_paslon_name)   ;
        }

            return response()->json([
                "success" => false,
                "message" => "Gagal membuat paslon",
                "data" => $th->getMessage(),
            ], 500);
        }
    }

    // ==== update paslon
    public function update_data_paslon_by_id (Request $request,$id)
    {
        $paslon = Paslon::find($id);

        if (!$paslon) return response()->json([
            "success" => false,
            "message" => "Kandidat tidak ditemukan",
        ], 404);


        $v = Validator::make($request->all(), [
            "name" => "required|string",
            "photo" => "required|file|mimes:jpeg,png,jpg",
            "vision" => "required|string",
            "mission" => "required|string"          
        ]);

        if ($v->fails()) {
            $errs = $v->errors()->all();
            $err = join(", ", $errs);

            return response()->json([
                "success" => false,
                "message" => "Gagal mengubah paslon",
                "errors" => $err,
            ], 400);
        }

        $photo_paslon = $request->file("photo");

        if ($photo_paslon) {
            $photo_paslon_name = time() . "_" . $photo_paslon->getClientOriginalName();
            $photo_paslon->move("images/paslon", $photo_paslon_name);

            if (file_exists($request->photo_paslon)) unlink($request->photo_paslon);

            $paslon->update([
                "photo" => 'images/paslon/' . $photo_paslon_name, // <-- add this line
            ]);
        }

        try {
            $paslon->update([
                "name" => $request->name,
                "vision" => $request->vision,
                "mission" => $request->mission 
            ]);
    
                return response()->json([
                "success" => true,
                "message" => "Berhasil mengubah kandidat",
                "data" => $paslon,
            ]);
        }catch (\Throwable $th) {
            if (file_exists($request->photo)) unlink($request->photo);

            return response()->json([
                "success" => false,
                "message" => "Gagal mengubah kandidat",
                "data" => $th->getMessage(),
            ], 500);
        }
    }

    // === delete paslon

    public function delete_paslon($id)
    {
        $paslon = Paslon::find($id);

        if (!$paslon) return response()->json([
            "success" => false,
            "message" => "paslon tidak ditemukan",
        ], 404);

        try {
            $paslon->delete();

            return response()->json([
                "success" => true,
                "message" => "Berhasil menghapus paslon",
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => "Gagal menghapus paslon",
                "data" => $th->getMessage(),
            ], 500);
        }
    }
    // === liat all user
    public function get_all_user(Request $request) {
        $user = User::all();

        return response()->json([
            "success" => true,
            "message" => "Berhasil mendapatkan semua user",
            "data" => $user,
        ]);
    }
    // === liat  user by id
    public function get_user_by_id($id) {
        $user = User::find($id);

        if (!$user) return response()->json([
            "success" => false,
            "message" => "User tidak ditemukan",
        ], 404);

        return response()->json([
            "success" => true,
            "message" => "Berhasil mendapatkan user",
            "data" => $user,
        ]);
    }

    //===== update user
    public function update_user(Request $request, $id) {
        $user = User::find($id);

        if (!$user) return response()->json([
            "success" => false,
            "message" => "User tidak ditemukan",
        ], 404);

        $v = Validator::make($request->all(), [
            "nis" => "required|unique:users",
            "nama" => "required|string",
            "password" => "required|string",
        ]);

        if ($v->fails()) {
            $errs = $v->errors()->all();
            $err = join(", ", $errs);

            return response()->json([
                "success" => false,
                "message" => "Gagal mengubah user",
                "errors" => $err,
            ], 400);
        }

        try {
            $user->update([
                "nama" => $request->nama,
                "nis" => $request->nis,
                "password" => bcrypt($request->password) ,
                "updated_at" => now(),
            ]);

            return response()->json([
                "success" => true,
                "message" => "Berhasil mengubah user",
                "data" => $user,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => "Gagal mengubah user",
                "data" => $th->getMessage(),
            ], 500);
        }
    }

    // ===== delete user

    public function delete_user($id) {
        $user = User::find($id);

        if (!$user) return response()->json([
            "success" => false,
            "message" => "User tidak ditemukan",
        ], 404);

        try {
            $user->delete();

            return response()->json([
                "success" => true,
                "message" => "Berhasil menghapus user",
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "message" => "Gagal menghapus user",
                "data" => $th->getMessage(),
            ], 500);
        }
    }
}