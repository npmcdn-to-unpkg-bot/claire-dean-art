<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
   protected $fillable = [
      'title', 'description', 'is_published'
   ];

   public function resize($img, $path) {

      $file_path = $path.'/'.$img;

      $img = \Image::make($file_path);

      //resize the image to a width of 300
      // and constrain aspect ratio (auto height)
      $img->resize(300, null, function ($constraint) {
          $constraint->aspectRatio();
      })->save();

      return $img;
   }

   public static function getImagesByOrder() {
      $unindexedImages = Artwork::where('order', -1)->get();
      $numIndexedImages = Artwork::where('order', '>', -1)->count();

      $correctOrder = array();

      if (count($unindexedImages) > 0) {
         //keep unordered images (newest images) at top of array
         foreach($unindexedImages as $image) {
            array_unshift($correctOrder, $image);
         }
      }
      //add rest to array, based on the order +
      for ($index = 1; $index < $numIndexedImages + 1; $index++) {
         array_push($correctOrder, Artwork::where('order', $index)->first());
      }

      return $correctOrder;
   }

   public static function getPublicImages() {
      $images = Artwork::getImagesByOrder();
      $public = array();
      foreach($images as $image) {
         if ($image->is_published)
            array_push($public, $image);
      }
      return $public;
   }

   public static function removeImageFromDir() {

   }
}
