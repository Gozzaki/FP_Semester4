<?php

namespace App\Http\Controllers;
use App\Models\Paslon;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function vote(Request $request, $paslonId)
    {
        // Pastikan pengguna terotentikasi
        $userauth = $request['user-auth'];
        if ($userauth) {
            // Dapatkan ID pengguna yang sedang terotentikasi
            $userId = $userauth['id'];
            // Cek apakah pengguna sudah pernah melakukan vote untuk paslon ini
            $existingVote = Vote::where('user_id', $userId)
                ->where('paslon_id', $paslonId)
                ->first();

            if ($existingVote) {
                // Jika pengguna sudah melakukan vote sebelumnya, berikan pesan error
                return response()->json(['message' => 'Anda sudah melakukan vote untuk paslon ini.'], 422);
            }

            // Jika pengguna belum melakukan vote sebelumnya, buat vote baru
            $vote = new Vote;
            $vote->user_id = $userId;
            $vote->paslon_id = $paslonId;
            $vote->save();

            return response()->json(['message' => 'Vote berhasil.'], 200);
        } else {
            // Jika pengguna tidak terotentikasi, berikan pesan error
            return response()->json(['message' => 'Anda harus login untuk melakukan vote.'], 401);
        }
    }

    public function getUserVotes(Request $request)
    {
        // Pastikan pengguna terotentikasi
        $userauth = $request['user-auth'];
        if ($userauth) {
            // Dapatkan ID pengguna yang sedang terotentikasi
            $userId = $userauth['id'];

            // Dapatkan semua vote yang dilakukan oleh pengguna ini
            $userVotes = Vote::where('user_id', $userId)->get();

            return response()->json(['votes' => $userVotes], 200);
        } else {
            // Jika pengguna tidak terotentikasi, berikan pesan error
            return response()->json(['message' => 'Anda harus login untuk melihat vote.'], 401);
        }
    }

    public function getTotalVotes(Request $request)
    {
        // Hitung total suara untuk setiap paslon
        $totalVotes = Vote::select('paslon_id', Vote::raw('count(*) as total_votes'))
            ->groupBy('paslon_id')
            ->get();

        return response()->json(['total_votes' => $totalVotes], 200);
    }
    
    

    public function get_all_vote(Request $request) {
        $paslon = Paslon::all();

        $total_vote = 0;
        foreach ($paslon as $k) {
            $vote = Vote::where("paslon_id", $k->id)->count();
            $k['total_vote'] = $vote;

            $total_vote += $vote;
        }

        return response()->json([
            "success" => true,
            "message" => "Berhasil mendapatkan semua vote",
            "data" => [
                "total_vote" => $total_vote,
                "kandidat" => $paslon,
            ],
        ]);
    }
}
