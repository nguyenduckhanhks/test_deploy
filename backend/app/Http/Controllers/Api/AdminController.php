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

class AdminController extends Controller {
    /**
     * @api {POST} /api/admin/add-links
     * @return \Illuminate\Http\Response
     */
    public function addLinks() {
        $user = Auth::user();

        $newLink = new Links([
            'user_id' => $user['id'],
        ]);

        try{
            $newLink->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Tạo link mới thành công !'
        ]);
    }

    /**
     * @api {GET} /api/admin/get-all-links
     * @return \Illuminate\Http\Response
     */
    public function getAllLinksByUserLogin() {
        $user = Auth::user();
        
        $listLinks = [];
        $listLinks = Links::where('user_id', $user['id'])
                            ->orderBy('id', 'desc')
                            ->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Get data successfully',
            'data' => $listLinks
        ]);
    }

    /**
     * @api {POST} /api/admin/get-links
     * @return \Illuminate\Http\Response
     */
    public function getAllLinksByUsername(Request $request) {
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
        $userId = $userData['id'];
        $listLinks = [];
        $listLinks = Links::where('user_id', $userId)
                            ->orderBy('id', 'desc')
                            ->where('is_delete', 0)
                            ->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Get data successfully',
            'data' => $listLinks
        ]);
    }

    /**
     * @api {POST} /api/admin/update-links
     * @return \Illuminate\Http\Response
     */
    public function updateLinks(Request $request) {
        $user = Auth::user();
        $link_id = $request->link_id ?? null;
        $title = $request->title ?? null;
        $value = $request->value ?? null;

        if(empty($link_id) || empty($title) || !isset($value)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        if($title == 'url') {
            $regex = "((https?|ftp)\:\/\/)?"; // SCHEME 
            $regex .= "([a-z0-9+!*(),;?&=\$_.-]+(\:[a-z0-9+!*(),;?&=\$_.-]+)?@)?"; // User and Pass 
            $regex .= "([a-z0-9-.]*)\.([a-z]{2,3})"; // Host or IP 
            $regex .= "(\:[0-9]{2,5})?"; // Port 
            $regex .= "(\/([a-z0-9+\$_-]\.?)+)*\/?"; // Path 
            $regex .= "(\?[a-z+&\$_.-][a-z0-9;:@&%=+\/\$_.-]*)?"; // GET Query 
            $regex .= "(#[a-z_.-][a-z0-9+\$_.-]*)?"; // Anchor 

            if(!preg_match("/^$regex$/i", $value)) // `i` flag for case-insensitive
            { 
                return response()->json([
                    'success' => false,
                    'message' => 'Đường dẫn nhập vào không hợp lệ!'
                ]);
            } 
        }

        $linkData = Links::where('id', $link_id)
                            ->first();
        if(empty($linkData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }

        if($linkData['user_id'] != $user['id']) {
            return response()->json([
                'success' => false,
                'message' => 'Permission denied!'
            ]);
        }

        if($title == 'icon' && $value == '#') {
            if (is_file($linkData['icon'])) {
                unlink($linkData['icon']);
            }
        }

        $linkData[$title] = $value;
        try{
            $linkData->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật link thành công !'
        ]);
    }

    /**
     * @api {POST} /api/admin/update-profile
     * @return \Illuminate\Http\Response
     */

    public function updateProfile(Request $request) {
        $user = Auth::user();
        $title = $request->title ?? null;
        $value = $request->value ?? null;

        if(empty($title) || empty($value)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        if(!in_array($title, ['username', 'profile_title', 'description', 'avatar'])) {
            return response()->json([
                'success' => false,
                'message' => 'Giá trị truyền lên không hợp lệ!'
            ]);
        }

        if($title == 'username') {
            $checkExist = Users::where('username', $request->value)
                                ->where('id', '!=', $user->id)->first();
            if($checkExist) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tên người dùng đã tồn tại!'
                ]);
            }
        }

        $userData = Users::where('id', $user['id'])
                            ->first();
        if(empty($userData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }
        $userData[$title] = $value;
        try{
            $userData->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật dữ liệu thành công !'
        ]);
    }
    /**
     * @api {POST} /api/admin/update-socials
     * @return \Illuminate\Http\Response
     */
    public function updateSocials(Request $request) {
        $user = Auth::user();
        $title = $request->title ?? null;
        $value = $request->value ?? null;

        if(empty($title) || empty($value)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        if(!in_array($title, Socials::ARR_SOCIALS)) {
            return response()->json([
                'success' => false,
                'message' => 'Giá trị truyền lên không hợp lệ!'
            ]);
        }

        $socialsData = Socials::where('user_id', $user['id'])
                            ->first();
        if(empty($socialsData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }
        $socialsData[$title] = $value;
        try{
            $socialsData->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật dữ liệu thành công !'
        ]);
    }
    /**
     * @api {GET} /api/admin/get-all-socials
     * @return \Illuminate\Http\Response
     */
    public function getAllSocials() {
        $user = Auth::user();
        $socials = Socials::where('user_id', $user->id)->first();

        if(empty($socials)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get data successfully',
            'data' => $socials
        ]);
    }

    /**
     * @api {GET} /api/admin/get-socials
     * @return \Illuminate\Http\Response
     */
    public function getSocials(Request $request) {
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
        $userId = $userData['id'];
        $socials = Socials::where('user_id', $userId)->first();

        if(empty($socials)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get data successfully',
            'data' => $socials
        ]);
    }

    /**
     * @api {POST} /api/admin/remove-links
     * @return \Illuminate\Http\Response
     */
    public function removeLinks(Request $request) {
        $user = Auth::user();
        $link_id = $request->link_id ?? null;

        if(empty($link_id)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        $linkData = Links::where('id', $link_id)
                            ->first();
        if(empty($linkData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }

        if($linkData['user_id'] != $user['id']) {
            return response()->json([
                'success' => false,
                'message' => 'Permission denied!'
            ]);
        }

        try{
            if (is_file($linkData['icon'])) {
                unlink($linkData['icon']);
            }
            $linkData->delete();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật link thành công !'
        ]);   
    }
    /**
     * @api {POST} /api/admin/update-thumbnail-links
     * @return \Illuminate\Http\Response
     */
    public function updateThumbnailLinks(Request $request) {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpg,png,jpeg |max:4096',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Định dạng file không hợp lệ!',
                'error' => $validator->errors()
            ]);
        }

        $user = Auth::user();
        $link_id = $request->link_id ?? null;
        $image = $request->file('image') ?? null;

        if(empty($link_id) || empty($image)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        $linkData = Links::where('id', $link_id)
                            ->first();
        if(empty($linkData)) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }

        if($linkData['user_id'] != $user['id']) {
            return response()->json([
                'success' => false,
                'message' => 'Permission denied!'
            ]);
        }

        try{
            if (is_file($linkData['icon'])) {
                unlink($linkData['icon']);
            }

            $destinationPath = 'upload/';
            $originalFile = $image->getClientOriginalName();
            $filename = $user['id'] . strtotime(date("Y-m-d H:i:s")).$originalFile;
            $image->move($destinationPath, $filename);

            $url = $destinationPath . $filename;
            $linkData['icon'] = $url;
            $linkData->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật link thành công !'
        ]);   
    }
     /**
     * @api {POST} /api/admin/update-avatar
     * @return \Illuminate\Http\Response
     */
    public function updateAvatar(Request $request) {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpg,png,jpeg |max:4096',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Định dạng file không hợp lệ!',
                'error' => $validator->errors()
            ]);
        }

        $user = Auth::user();
        $image = $request->file('image') ?? null;

        if(empty($image)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        try{
            if (is_file($user['avatar'])) {
                unlink($user['avatar']);
            }

            $destinationPath = 'upload/';
            $originalFile = $image->getClientOriginalName();
            $filename = $user['id'] . strtotime(date("Y-m-d H:i:s")).$originalFile;
            $image->move($destinationPath, $filename);

            $url = $destinationPath . $filename;
            $user['avatar'] = $url;
            $user->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật link thành công !'
        ]);   
    }

     /**
     * @api {POST} /api/admin/update-cover
     * @return \Illuminate\Http\Response
     */
    public function updateCoverImage(Request $request) {
        $validator = Validator::make($request->all(), [
            'image' => 'mimes:jpg,png,jpeg |max:4096',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Định dạng file không hợp lệ!',
                'error' => $validator->errors()
            ]);
        }

        $user = Auth::user();
        $image = $request->file('image') ?? null;

        if(empty($image)) {
            return response()->json([
                'success' => false,
                'message' => 'Truyền thiếu dữ liệu!'
            ]);
        }

        try{
            if (is_file($user['cover_image'])) {
                unlink($user['cover_image']);
            }

            $destinationPath = 'upload/';
            $originalFile = $image->getClientOriginalName();
            $filename = $user['id'] . strtotime(date("Y-m-d H:i:s")).$originalFile;
            $image->move($destinationPath, $filename);

            $url = $destinationPath . $filename;
            $user['cover_image'] = $url;
            $user->save();
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi hệ thống. Vui lòng thử lại sau !',
                'error' => $e
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => ' Cập nhật link thành công !'
        ]);   
    }
}
