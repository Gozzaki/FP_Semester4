<?php

namespace App\Http\Controllers;

use App\Models\Paslon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PaslonController extends Controller
{
    public function index()
    {
        $paslons = Paslon::all();

        return response()->json($paslons);
    }

    public function show($id)
    {
        $paslon = Paslon::findOrFail($id);

        return response()->json($paslon);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'vision' => 'required|string',
            'mission' => 'required|string',
        ]);

        $user = Auth::user();

        // Menambahkan otorisasi untuk hanya pengguna dengan peran 'admin' yang dapat membuat paslon
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $paslon = new Paslon();
        $paslon->name = $request->name;
        $paslon->vision = $request->vision;
        $paslon->mission = $request->mission;

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('photos'), $photoName);
            $paslon->photo = url('photos/' . $photoName);
        }

        $paslon->save();

        return response()->json($paslon, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'vision' => 'required|string',
            'mission' => 'required|string',
        ]);

        $user = Auth::user();

        // Menambahkan otorisasi untuk hanya pengguna dengan peran 'admin' yang dapat memperbarui paslon
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $paslon = Paslon::findOrFail($id);
        $paslon->name = $request->name;
        $paslon->vision = $request->vision;
        $paslon->mission = $request->mission;

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('photos'), $photoName);
            $paslon->photo = url('photos/' . $photoName);
        }

        $paslon->save();

        return response()->json($paslon);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $paslon = Paslon::findOrFail($id);

        // Menambahkan otorisasi untuk hanya pengguna dengan peran 'admin' yang dapat menghapus paslon
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Menghapus file foto jika ada sebelum menghapus paslon
        if (!empty($paslon->photo)) {
            $photoPath = public_path(str_replace(url('/'), '', $paslon->photo));
            if (file_exists($photoPath)) {
                unlink($photoPath);
            }
        }

        $paslon->delete();

        return response()->json(null, 204);
    }
}
