<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Socials;
use App\Models\Users;

class AuthController extends Controller {
    /**
     * @api {POST} /api/admin/login
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @apiParam {String} email Email
     * @apiParam {String} password Mật khẩu
     * @apiParam {Bool} remember Nhớ người dùng
     */
    public function authenticate(Request $request) {

        $credentials = [
            'email' => $request->email,
            'password' => $request->password,
            'is_delete' => 0
        ];

        $remember = $request->remember ?? false;

        if(!$token = Auth::attempt($credentials, $remember)) {
            return response()->json([
                'success' => false,
                'message' => 'Email hoặc mật khẩu nhập vào không chính xác!'
            ]);
        }

        $user = Auth::user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công!',
            'data' => $user,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Log the user out of the application.
     * @api {POST} /api/admin/users/logout
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request) {
        $request->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công'
        ]);
    }

    /**
     * Get the current user login
     * @api {GET} /api/admin/users/user-login
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function getUserLogin(Request $request) {
        $user = Auth::user();

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu thành công',
            'data' => $user
        ]);
    }

    /**
     * api signup
     * @api {POST} /api/admin/signup
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function signup(Request $request) {
        // Validate input
        $validator = Validator::make($request->all(), [
            'username' => 'bail|required|string|unique:users',
            'email' => 'bail|required|email|unique:users',
            'password' => 'bail|required|string',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Thông tin nhập vào không hợp lệ hoặc tài khoản đã tồn tài trước đó!',
                'error' => $validator->errors()
            ]);
        }

        try {
            DB::beginTransaction();
            $newUser = new Users([
                'username' => $request->username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'type' => Users::COMMON,
                'is_delete' => 0
            ]);
            $newUser->save();

            $newSocial = new Socials([
                'user_id' => $newUser->id,
            ]);
            $newSocial->save();

            $credentials = [
                'email' => $request->email,
                'password' => $request->password,
                'is_delete' => 0
            ];

            $remember = $request->remember ?? false;

            if(!$token = Auth::attempt($credentials, $remember)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email hoặc mật khẩu nhập vào không chính xác!'
                ]);
            }

            $user = Auth::user();

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            if ($request->remember_me)
                $token->expires_at = Carbon::now()->addWeeks(1);
            $token->save();
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Đăng ký thành công!',
                'data' => $user,
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
            ]);
        } catch (\Exception $e) {
            DB::rollback(); // database query error
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
    }

    /**
     * api signup
     * @api {GET} /api/admin/get-profile
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function getProfile(Request $request)  {
        $user = Auth::user();
        if(!$user) {
            return response()->json([
                'success' => false,
                'message' => 'USER.NOT_LOGIN'
            ]);
        }

        $result = [
            'username' => $user['username'],
            'description' => $user['description'],
            'profile_title' => $user['profile_title'],
            'avatar' => $user['avatar'],
            'cover_image' => $user['cover_image'],
            'theme' => $user['theme'],
        ];

        return response()->json([
            'success' => 'true',
            'message' => 'Get data successfully',
            'data' => $result
        ]);
    }
    /**
     * api get profile by username
     * @api {Post} /api/admin/get-user
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function getUserDataByUsername(Request $request) {
        $username = $request->username ?? null;
        if(empty($username)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu'
            ]);
        }

        $userData = Users::where('username', $username)
                        ->first();
        if(empty($userData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu !'
            ]);
        }
        $result = [
            'username' => $userData['username'],
            'description' => $userData['description'],
            'profile_title' => $userData['profile_title'],
            'avatar' => $userData['avatar'],
            'cover_image' => $userData['cover_image'],
            'theme' => $userData['theme'],
        ];

        return response()->json([
            'success' => 'true',
            'message' => 'Get data successfully',
            'data' => $result
        ]);
    }
}
