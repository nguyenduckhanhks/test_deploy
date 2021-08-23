<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Links;
use App\Models\Socials;
use App\Models\Users;
use App\Models\Themes;

class ThemesController extends Controller {
    /**
     * @api {GET} /api/admin/get-themes
     * @return \Illuminate\Http\Response
     */
    public function getAllThemes() {
        $user = Auth::user();
        $themes = Themes::where('active', 1)
                        ->where(function($query) use ($user) {
                            $query->where('type', 'general')
                                  ->orWhere('type', $user->id);
                        })->get();
        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    /**
     * @api {GET} /api/admin/change-themes
     * @return \Illuminate\Http\Response
     */
    public function updateThemesForUser(Request $request) {
        $user = Auth::user();
        if(!$request->theme || empty($request->theme)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyen thieu du lieu!'
            ]);
        }

        $user['theme'] = $request->theme;
        $user->save();
        return response()->json([
            'success' => true,
            'message' => 'Cap nhat thanh cong!'
        ]);
    }
}