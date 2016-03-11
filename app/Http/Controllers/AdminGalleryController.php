<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Artwork;

class AdminGalleryController extends Controller
{

   public function gallery()
   {
      return view('guest.gallery');
   }

   public function upload()
   {
      return view('admin.upload');
   }

   public function storeArtwork(Request $request)
   {

      //TODO: File Validation for Image File Type (jpg, jpeg, etc.)
      //TODO: Check if File Upload Successful - Includes lack of file

      $image = new Artwork();

      //Form "name" for the file input field
      $fileName = 'artwork_file';
         $file = $request->file($fileName);
      $destinationPath = '../public/images';

      if ($request->input('title') !== '') {
         $image->slug = str_slug($request->input('title'), "-");
      } else {
         $fileWOext = str_replace($file->getClientOriginalExtension(), '', $file->getClientOriginalName());
         $image->slug = str_slug($fileWOext, "-");
      }

      $image->order = -1; //set initial to -1, will validate before view
      $image->title = $request->input('title');
      $image->description = "Hard Coded Test Description";
      $image->is_published = true;

      //FIXME: Must be unique file names
      $image->file_name = $file->getClientOriginalName();
      $image->file_ext = $file->getClientOriginalExtension();
      $image->file_size = $file->getClientSize();

      //save initial file
      $file->move($destinationPath, $file->getClientOriginalName());
      //get file and perform resize & save file
      $resizedImg = $image->resize($file->getClientOriginalName(), $destinationPath);

      $image->save();

      return redirect('admin/gallery/edit');
   }

   //FIXME: Try to use scope to handle what view is available

   public function displayAll()
   {
      $images = Artwork::getImagesByOrder();
      $imgArr = array();
      foreach ($images as $image) {
         array_push($imgArr, $image);
      }
      return view('admin.gallery')->with('data', $imgArr);
   }

   public function displayEdit()
   {
      $images = Artwork::getImagesByOrder();
      $imgArr = array();
      foreach ($images as $image) {
         array_push($imgArr, $image);
      }
      return view('admin.edit.gallery_edit')->with('images', $imgArr);
   }

   public function displayPublic()
   {
      $images = Artwork::getPublicImages();
      $imgArr = array();
      foreach ($images as $image) {
         array_push($imgArr, $image->file_name);
      }
      return view('admin.gallery')->with('images', $imgArr);
   }

   public function setOrder(Request $request)
   {
      $images = $request->orderArray;

      foreach ($images as $image) {
         Artwork::where('slug', $image['elem'])
            ->update(['order'=>$image['pos'] + 1]);
      }

      return response()->json([
         'status' => 'success',
         'message' => 'Layout saved successfully.'
      ]);
   }

   public function removeImage(Request $request)
   {
      $image = $request->image;

      Artwork::where('slug', $image)->first()->delete();

      return response()->json([
         'status'=>'success',
         'message'=>'Image removed successfully.'
      ]);
   }

   public function getImageTitle(Request $request) {
      $image = $request->image;
      $title = Artwork::where('slug', $image)->value('title');
      return response()->json([
         'imageTitle'=>$title
      ]);
   }

}
