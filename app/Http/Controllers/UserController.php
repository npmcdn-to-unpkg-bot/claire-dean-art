<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Session;
use Crypt;
use Validator;
use Auth;
use App\User;
use App\Artwork;

class UserController extends Controller
{

   public function home()
   {

      //dd("User controller is fucked...");
      //dd(Auth::user());

      if (Auth::check()) {
         $user = Auth::user();
         return view('admin.home')->with('user', $user);
      }

      //$first_name = $admin['first_name'];
      //$last_name = $admin['last_name'];

      // return view('admin.home')->with([
      //    'first_name'=>$first_name,
      //    'last_name'=>$last_name
      // ]);
      //return view('admin.home');
   }

   public function getLogin()
   {
      return view('admin.login');
   }

   public function postLogin(Request $request)
   {
      $email = $request->email;
      $password = $request->password;
      $remember = true; //always remember user session

      if (Auth::attempt(['email'=>$email, 'password'=>$password],  $remember)) {
         Auth::login(Auth::user());
         return redirect('admin/home');
      } else {
         dd('failure');
      }
   }

   public function getLogout()
   {
      if (Auth::check()) {
         Auth::logout();
      }
      return redirect('/');
   }

   public function getRegister()
   {
      return view('admin.auth.temp_register');
   }

   public function postRegister(Request $request)
   {

      $rules = [
         'first_name'=>'required|string|max:32',
         'last_name'=>'required|string|max:32',
         'email'=>'required|email|',
         'password'=>'required|min:6'
      ];

      $validator = Validator::make($request->all(), $rules);

      if ($validator->fails()) {
         return redirect('admin/register')
            ->withErrors($validator->messages())
            ->withInput();
      }

      $admin = new User();
      $admin->first_name = $request->first_name;
      $admin->last_name = $request->last_name;
      $admin->email = $request->email;
      $admin->password = bcrypt($request->password);

      $admin->save();

      return redirect('admin/login');
   }
}
