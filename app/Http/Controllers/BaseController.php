<?php

namespace App\Http\Controllers;

use App\Traits\HasDataTable;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    use HasDataTable;

    public function successWithToast($message, $title = 'Success')
    {
        return redirect()->back()->with([
            'toast' => [
                'type' => 'success',
                'title' => $title,
                'message' => $message
            ]
        ]);
    }

    public function errorWithToast($message, $title = 'Error')
    {
        return redirect()->back()->with([
            'toast' => [
                'type' => 'error',
                'title' => $title,
                'message' => $message
            ]
        ]);
    }
}
