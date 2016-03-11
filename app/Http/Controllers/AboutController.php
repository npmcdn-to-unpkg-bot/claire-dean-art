<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Purifier;
use App\User;
use Auth;

class AboutController extends Controller
{

   public function index()
   {
      return view('guest.about');
   }


   public function displayEdit()
   {
      if (Auth::check()) {
         $user = Auth::user();
         // dd($user);
         return view('admin.edit.about_edit')->with('user', $user);
      }
   }

   public function savePageEdits(Request $request)
   {
      $content = $request->content;
      $decoded = urldecode($content);
      dd($decoded);
      // $content = Purifier::clean($decoded);

      $currentUser = Auth::user();
      $currentUser->about_html = $decoded;
      $currentUser->save();

      return response()->json([
         'status'=>'success',
      ]);
   }




}
